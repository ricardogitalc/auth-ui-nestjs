"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  className?: string;
  maxSize?: number;
  onFileSelect: (file: File) => void;
}

export function FileUpload({
  className,
  maxSize = 5 * 1024 * 1024, //5MB
  onFileSelect,
}: FileUploadProps) {
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > maxSize) {
          setError("Arquivo muito grande. Máximo 5MB.");
          return;
        }

        if (!file.type.startsWith("image/")) {
          setError("Por favor selecione apenas imagens.");
          return;
        }

        setError("");
        onFileSelect(file);
      }
    },
    [maxSize, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-md cursor-pointer border-muted-foreground/25 hover:border-muted-foreground/50",
        isDragActive && "border-primary",
        className
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadCloud className="w-6 h-6 text-muted-foreground mb-2" />
        <p className="mb-2 text-sm text-muted-foreground">
          {isDragActive
            ? "Solte para carregar"
            : "Arraste e solte uma imagem aqui ou clique para selecionar"}
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPEG até {Math.floor(maxSize / (1024 * 1024))}MB
        </p>
      </div>

      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}
