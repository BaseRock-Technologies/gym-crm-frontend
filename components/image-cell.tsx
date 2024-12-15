import { User2 } from "lucide-react";
import Image from "next/image";

interface ImageCellProps {
  src?: string | null;
  alt?: string;
}

export function ImageCell({ src, alt }: ImageCellProps) {
  return (
    <div className="relative sm:w-16 w-10 sm:h-16 h-10 rounded-md bg-helper-primary">
      {src ? (
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover rounded-sm"
        />
      ) : (
        <User2 className="w-full h-full p-2 text-white" />
      )}
    </div>
  );
}
