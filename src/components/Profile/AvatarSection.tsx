import {
  type ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useQueryClient } from "@tanstack/react-query";
import Cropper from "react-easy-crop";

import type { UpdateUploadedAvatarRequestBody } from "@/gen/director";
import {
  useDeleteUploadedAvatarMutation,
  useGetPresignedUrlForUploadingAvatarMutation,
  useListAvatarsQuery,
  useUpdateUploadedAvatarMutation,
  useUpdateUserAvatarMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import Avatar from "@/shared/components/Avatar";
import { useUserStore } from "@/shared/stores/useUserStore";

import { toAvatarContentType, validateAvatarFile } from "./avatarUpload";
import getCroppedImg from "./cropImage";

type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const getReadableErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

const buildUploadErrorMessage = (
  stepLabel: string,
  error: unknown,
  fallbackMessage: string,
) => `${stepLabel}: ${getReadableErrorMessage(error, fallbackMessage)}`;

const withUploadStepError = async <T,>(
  stepLabel: string,
  action: () => Promise<T>,
  fallbackMessage: string,
) => {
  try {
    return await action();
  } catch (error) {
    throw new Error(buildUploadErrorMessage(stepLabel, error, fallbackMessage));
  }
};

export const AvatarSection = () => {
  const { setAvatarUrl, avatarUrl, username } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(avatarUrl ?? "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null,
  );
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (imageToCrop) URL.revokeObjectURL(imageToCrop);
    };
  }, [imageToCrop]);

  const { data: avatars = [], isLoading: isLoadingAvatars } =
    useListAvatarsQuery();
  const { mutateAsync: updateUserAvatar } = useUpdateUserAvatarMutation();
  const { mutateAsync: getPresignedUrlForUploadingAvatar } =
    useGetPresignedUrlForUploadingAvatarMutation();
  const { mutateAsync: updateUploadedAvatar } =
    useUpdateUploadedAvatarMutation();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteUploadedAvatar, isPending: isDeletingAvatar } =
    useDeleteUploadedAvatarMutation();

  const handleUpdateAvatar = async () => {
    setErrorMessage(null);

    const selectedAvatar = avatars.find(
      (avatar) => avatar.url === selectedAvatarUrl,
    );

    if (selectedAvatar) {
      try {
        await updateUserAvatar({ avatarId: selectedAvatar.id });
        setAvatarUrl(selectedAvatarUrl);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to apply avatar. Please try again.",
        );
      }
    } else {
      setErrorMessage("Could not identify avatar to apply.");
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedFile = event.target.files?.[0];
    event.target.value = "";

    if (!selectedFile) {
      return;
    }

    const validationError = validateAvatarFile(selectedFile);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage(null);
    setOriginalFile(selectedFile);
    setImageToCrop(URL.createObjectURL(selectedFile));
  };

  const onCropComplete = useCallback(
    (_croppedArea: PixelCrop, croppedPixels: PixelCrop) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  const handleConfirmCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels || !originalFile) return;

    setIsUploadingAvatar(true);
    setErrorMessage(null);

    let uploadIdToFail = "";

    const markUploadAsFailed = async () => {
      if (!uploadIdToFail) return;

      await updateUploadedAvatar({
        uploadId: uploadIdToFail,
        status: "Failed" as UpdateUploadedAvatarRequestBody.status,
        url: "",
      }).catch(() => {});
    };

    try {
      const croppedBlob = await withUploadStepError(
        "Failed to process image",
        () => getCroppedImg(imageToCrop, croppedAreaPixels),
        "Unknown error",
      );

      const fileToUpload = new File(
        [croppedBlob],
        originalFile.name || "avatar.jpg",
        { type: "image/jpeg" },
      );

      const contentType = toAvatarContentType(fileToUpload.type);
      if (!contentType) {
        setErrorMessage("Only jpg, png, and webp files are allowed.");
        return;
      }

      const uploadStatus = await withUploadStepError(
        "Failed to get upload credentials",
        () =>
          getPresignedUrlForUploadingAvatar({
            filename: fileToUpload.name,
            contentType,
            fileSize: fileToUpload.size,
          }),
        "Unknown error",
      );

      const presignedUrl = uploadStatus.presignedUrl;

      if (!presignedUrl) {
        throw new Error("Server error: No upload credentials provided");
      }

      uploadIdToFail = uploadStatus.id;

      const uploadResponse = await withUploadStepError(
        "Failed to upload image",
        () =>
          fetch(presignedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": contentType,
            },
            body: fileToUpload,
          }),
        "Network error",
      );

      if (!uploadResponse.ok) {
        throw new Error(
          `Upload failed. S3-related error: (${uploadResponse.status}): ${uploadResponse.statusText}`,
        );
      }

      const publicUrl = presignedUrl.split("?")[0];
      await withUploadStepError(
        "Failed to finalize upload",
        () =>
          updateUploadedAvatar({
            uploadId: uploadStatus.id,
            status: "Success" as UpdateUploadedAvatarRequestBody.status,
            url: publicUrl,
          }),
        "Unknown error",
      );

      uploadIdToFail = "";

      try {
        await queryClient.invalidateQueries({ queryKey: ["avatars"] });
      } catch (error) {
        console.error("Failed to refresh avatars list", error);
      }

      setSelectedAvatarUrl(publicUrl);
      setImageToCrop(null);
    } catch (error) {
      await markUploadAsFailed();
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUploadClick = (avatarUrl: string) => {
    setSelectedAvatarUrl(avatarUrl);
    setErrorMessage(null);
  };

  const handleDeleteClick = async () => {
    if (!selectedAvatarUrl) return;
    try {
      await deleteUploadedAvatar();
      setErrorMessage(null);

      if (selectedAvatarUrl === avatarUrl) {
        setAvatarUrl("");
        setSelectedAvatarUrl("");
      } else {
        setSelectedAvatarUrl(avatarUrl ?? "");
      }
    } catch {
      setErrorMessage("Failed to delete avatar. Please try again.");
    }
  };
  return (
    <section
      className={`rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 text-rave-white flex flex-col space-y-4`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="mb-4 items-center">
        <Avatar
          src={selectedAvatarUrl}
          shape="square"
          alt={username}
          wrapperClassName="aspect-square overflow-hidden bg-rave-black border-2 border-rave-white/20 h-full w-full object-cover"
        />
      </div>
      <p className="mb-2 text-xs tracking-wide text-rave-white/75">
        Avatar (click to select)
      </p>
      {isLoadingAvatars ? (
        <div className="text-xs text-rave-white/60">Loading avatars...</div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {avatars.map((avatar) => {
            const selected = avatar.url === selectedAvatarUrl;
            return (
              <div key={avatar.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUploadClick(avatar.url)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${
                    selected
                      ? "border-rave-red"
                      : "border-rave-white/15 hover:border-rave-white/40"
                  }`}
                  title={avatar.id}
                >
                  <img
                    src={avatar.url}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {errorMessage && (
        <p className="text-xs text-rave-red" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="flex flex-row gap-3 justify-center">
        <Button
          variant="inverse"
          emphasis="low"
          size="medium"
          onClick={handleOpenFilePicker}
          disabled={isUploadingAvatar || isDeletingAvatar}
        >
          {isUploadingAvatar ? "Uploading..." : "Upload"}
        </Button>

        <Button
          variant="inverse"
          emphasis="low"
          size="medium"
          onClick={() => {
            void handleDeleteClick();
          }}
          disabled={
            isUploadingAvatar ||
            isDeletingAvatar ||
            (!selectedAvatarUrl.includes(username) &&
              !selectedAvatarUrl.includes(encodeURIComponent(username)))
          }
        >
          {isDeletingAvatar ? "Deleting..." : "Delete"}
        </Button>
        <Button
          variant="primary"
          emphasis="high"
          size="medium"
          onClick={() => {
            void handleUpdateAvatar();
          }}
          disabled={
            !selectedAvatarUrl ||
            selectedAvatarUrl === avatarUrl ||
            isUploadingAvatar ||
            isDeletingAvatar
          }
        >
          Apply
        </Button>
      </div>

      {imageToCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-rave-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl border border-rave-white/20 bg-rave-black p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-semibold text-rave-white">
              Crop Avatar
            </h3>
            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-rave-black/50">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs text-rave-white/70">Zoom:</span>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1"
              />
            </div>
            {errorMessage && (
              <p className="mt-3 text-xs text-rave-red" role="alert">
                {errorMessage}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                size="small"
                onClick={() => {
                  setImageToCrop(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                disabled={isUploadingAvatar}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => {
                  void handleConfirmCrop();
                }}
                disabled={isUploadingAvatar}
              >
                {isUploadingAvatar ? "Uploading..." : "Confirm & Upload"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
