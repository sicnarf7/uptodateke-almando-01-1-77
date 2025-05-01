
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Trash2, Send } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ArticleActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onSaveDraft: (e: React.FormEvent) => void;
  onPublish: (e: React.FormEvent) => void;
  onDelete?: () => void;
}

export const ArticleActions = ({
  isEditing,
  isLoading,
  onSaveDraft,
  onPublish,
  onDelete
}: ArticleActionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setDeleteDialogOpen(false);
    }
  };
  
  return (
    <div className="flex gap-4">
      {isEditing && onDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button 
              type="button" 
              variant="destructive"
              size="icon"
              className="mr-auto"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the article.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      
      <Button 
        type="submit" 
        variant="outline"
        className="flex-1"
        onClick={onSaveDraft}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? 'Update Draft' : 'Save as Draft'}
          </>
        )}
      </Button>
      <Button 
        type="submit"
        className="flex-1"
        onClick={onPublish}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {isEditing ? 'Update & Publish' : 'Publish'}
          </>
        )}
      </Button>
    </div>
  );
};
