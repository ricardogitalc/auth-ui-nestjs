import { Button } from "@/_components/ui/button";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { HiUser } from "react-icons/hi2";
import { useRef } from "react";
import { compressImage } from "@/lib/helpers/image-helper";
import NullAvatar from "./null-avatar";

interface ProfilePhotoUploadProps {
  profileUrl: string;
  onPhotoChange: (base64: string) => void;
}

export function ProfilePhotoUpload({
  profileUrl,
  onPhotoChange,
}: ProfilePhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    try {
      const compressedBase64 = await compressImage(file);
      onPhotoChange(compressedBase64);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = () => {
    onPhotoChange("");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        {profileUrl ? (
          <Image
            src={profileUrl}
            width={80}
            height={80}
            alt="Profile Image"
            className="object-cover rounded-full"
          />
        ) : (
          <div className="w-20 h-20">
            <NullAvatar />
          </div>
        )}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            Foto de perfil
          </h1>
          <p className="text-sm text-muted-foreground">
            PNG, JPEG abaixo de 5MB
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4">
        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={handleUploadClick}
        >
          <CloudUpload className="w-4 h-4" />
          Atualizar foto
        </Button>
        <Button
          size="sm"
          className="w-full sm:w-auto"
          variant={"secondary"}
          onClick={handleDelete}
          disabled={!profileUrl}
        >
          Deletar
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
