"use client";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Props {
  onChange: (file: File[] | null) => void;
  placeholder?: string;
  disabled?: boolean;
  photoLimit: number;
}

export function ImageUpload({
  onChange,
  placeholder,
  disabled,
  photoLimit,
}: Props) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Limita o número de arquivos com base em `photoLimit`
      const imagesArray = Array.from(files).slice(0, photoLimit);
      setSelectedImages(imagesArray);
      onChange(imagesArray);
    }
  };

  useEffect(() => {
    // Atualiza onChange sempre que as imagens mudam
    onChange(selectedImages);
  }, [selectedImages, onChange]);

  return (
    <>
      <Label
        htmlFor="images"
        className="font-bold py-3 px-4 rounded-lg gap-2 bg-primary flex
       text-white justify-center cursor-pointer"
      >
        {"Adicionar Fotos (máx: " + photoLimit + ")"}
      </Label>
      <Input
        id="images"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        disabled={disabled}
        className="hidden"
      />
    </>
  );
}
