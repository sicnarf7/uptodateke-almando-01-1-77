
import { useState } from "react";

export function useTagSelection(initialTags: string[] = []) {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tagId]);
      return true;
    } else {
      setSelectedTags(prev => prev.filter(id => id !== tagId));
      return false;
    }
  };

  return { selectedTags, setSelectedTags, handleTagChange };
}
