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
    sentRequestIds,
    setSearchText,
    handleSearch,
    handleSendRequest
  } = useFriendSearchAdd();

  return (
    <FriendSearchAddView
      searchText={searchText}
      normalizedInput={normalizedInput}
      hasQuery={hasQuery}
      isFetching={isFetching}
      isSendingRequest={isSendingRequest}
      searchedUsers={searchedUsers}
      sentRequestIds={sentRequestIds}
      onSearchTextChange={setSearchText}
      onSearch={handleSearch}
      onSendRequest={handleSendRequest}
    />
  );
};
