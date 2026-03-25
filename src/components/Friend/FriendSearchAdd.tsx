import { FriendSearchAddView } from "./FriendSearchAddView";
import { useFriendSearchAdd } from "./useFriendSearchAdd";

export const FriendSearchAdd = () => {
  const {
    searchText,
    normalizedInput,
    hasQuery,
    isFetching,
    isSendingRequest,
    searchedUsers,
    searchTargetId,
    setSearchText,
    handleSearch,
    handleSendRequest,
    currentUserId
  } = useFriendSearchAdd();

  return (
    <FriendSearchAddView
      searchText={searchText}
      normalizedInput={normalizedInput}
      hasQuery={hasQuery}
      isFetching={isFetching}
      isSendingRequest={isSendingRequest}
      searchedUsers={searchedUsers}
      searchTargetId={searchTargetId}
      onSearchTextChange={setSearchText}
      onSearch={handleSearch}
      onSendRequest={handleSendRequest}
      currentUserId={currentUserId}
    />
  );
};
