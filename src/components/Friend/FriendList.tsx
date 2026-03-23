import { useState } from "react";

import { FriendListView } from "./FriendListView";
import { FriendPendingRequestsView } from "./FriendPendingRequestsView";
import { useFriendList } from "./useFriendList";
import { useFriendPendingRequests } from "./useFriendPendingRequests";

export const FriendList = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "pending">("friends");
  const {
    friends,
    isFetching,
    isError,
    error,
    isRemovingFriend,
    removingFriendId,
    handleRemoveFriend,
    STATUS_CLASSES
  } = useFriendList();
  const {
    pendingRequestItems,
    isFetching: isFetchingPending,
    isError: isPendingError,
    error: pendingError,
    isRespondingRequest,
    pendingActionError,
    handleRespondPendingRequest,
    handleCancelPendingRequest,
  } = useFriendPendingRequests();

  return activeTab === "friends" ? (
    <FriendListView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      friends={friends}
      isFetching={isFetching}
      isError={isError}
      error={error}
      isRemovingFriend={isRemovingFriend}
      removingFriendId={removingFriendId}
      onRemoveFriend={handleRemoveFriend}
      statusClasses={STATUS_CLASSES}
    />
  ) : (
    <FriendPendingRequestsView
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pendingRequestItems={pendingRequestItems}
      isFetching={isFetchingPending}
      isError={isPendingError}
      error={pendingError}
      isRespondingRequest={isRespondingRequest}
      pendingActionError={pendingActionError}
      onRespondRequest={handleRespondPendingRequest}
      onCancelRequest={handleCancelPendingRequest}
    />
  );
};
