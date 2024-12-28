export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const SIZE = 800;
        canvas.width = SIZE;
        canvas.height = SIZE;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, SIZE, SIZE);

        const minDimension = Math.min(img.width, img.height);
        const sourceX = (img.width - minDimension) / 2;
        const sourceY = (img.height - minDimension) / 2;

        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          minDimension,
          minDimension,
          0,
          0,
          SIZE,
          SIZE
        );

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        resolve(compressedBase64);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
