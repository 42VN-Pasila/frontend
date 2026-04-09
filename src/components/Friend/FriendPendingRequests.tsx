import { FriendPendingRequestsView } from "./FriendPendingRequestsView";
import { useFriendPendingRequests } from "./useFriendPendingRequests";

export const FriendPendingRequests = () => {
  const {
    pendingRequestItems,
    isFetching,
    isError,
    error,
    isRespondingRequest,
    pendingActionError,
    handleRespondPendingRequest,
    handleCancelPendingRequest,
  } = useFriendPendingRequests();

  return (
    <FriendPendingRequestsView
      activeTab="pending"
      onTabChange={() => {}}
      pendingRequestItems={pendingRequestItems}
      isFetching={isFetching}
      isError={isError}
      error={error}
      isRespondingRequest={isRespondingRequest}
      pendingActionError={pendingActionError}
      onRespondRequest={handleRespondPendingRequest}
      onCancelRequest={handleCancelPendingRequest}
    />
  );
};
