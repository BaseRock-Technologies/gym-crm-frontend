import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onFileSelected: (file: File) => void;
}

export function FileUpload({
  accept,
  maxSize,
  onFileSelected,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (maxSize && file.size > maxSize) {
        setError(
          `File size exceeds the maximum limit of ${maxSize / 1024 / 1024}MB`
        );
        return;
      }
      setFileName(file.name);
      setError(null);
      onFileSelected(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button type="button" onClick={handleButtonClick}>
        Choose File
      </Button>
      {fileName && <Label>{fileName}</Label>}
      {error && <Label className="text-red-500">{error}</Label>}
    </div>
  );
}
