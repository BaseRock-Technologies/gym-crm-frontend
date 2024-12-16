import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { NoteFormData } from "../types/schedule"

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void;
  initialData?: NoteFormData;
}

export function NoteForm({ onSubmit, initialData }: NoteFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      primaryField: formData.get('primaryField') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" onClick={e => e.stopPropagation()}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          name="title" 
          defaultValue={initialData?.title}
          required 
          onClick={e => e.stopPropagation()}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="primaryField">Primary Field</Label>
        <Input 
          id="primaryField" 
          name="primaryField" 
          defaultValue={initialData?.primaryField}
          required 
          onClick={e => e.stopPropagation()}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content" 
          name="content" 
          defaultValue={initialData?.content}
          required 
          onClick={e => e.stopPropagation()}
        />
      </div>
      <Button type="submit" onClick={e => e.stopPropagation()}>Save Note</Button>
    </form>
  );
}

