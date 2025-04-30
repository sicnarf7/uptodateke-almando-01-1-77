
export function useTagSelection() {
  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      return true;
    }
    return false;
  };

  return { handleTagChange };
}
