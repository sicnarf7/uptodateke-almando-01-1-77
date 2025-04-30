
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ArticleFormHeaderProps {
  isEditing: boolean;
}

export const ArticleFormHeader = ({ isEditing }: ArticleFormHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle>{isEditing ? 'Edit Article' : 'Create New Article'}</CardTitle>
      <CardDescription>
        {isEditing ? 'Update the article details' : 'Fill out the form to create a new article'}
      </CardDescription>
    </CardHeader>
  );
};
