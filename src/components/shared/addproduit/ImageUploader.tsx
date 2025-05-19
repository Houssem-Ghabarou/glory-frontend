import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { PreviewImage } from "../../../lib/types";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  previewImages: PreviewImage[];
  setPreviewImages: React.Dispatch<React.SetStateAction<PreviewImage[]>>;
}

export default function ImageUploader({
  previewImages,
  setPreviewImages,
}: ImageUploaderProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles: File[]) => {
      if (previewImages.length + acceptedFiles.length > 5) {
        toast.error("Vous ne pouvez uploader que 5 images maximum.", {
          duration: 4000,
          position: "top-right",
        });
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as PreviewImage[];
      setPreviewImages([...previewImages, ...newFiles]);
    },
  });

  const removeImage = (index: number) => {
    const newImages = [...previewImages];
    if (newImages[index].preview) {
      URL.revokeObjectURL(newImages[index].preview!);
    }
    newImages.splice(index, 1);
    setPreviewImages(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-slate-50 cursor-pointer transition-colors"
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 mx-auto mb-2 text-slate-400" />
        <p className="text-sm text-slate-600">
          Glissez et déposez des images ici, ou cliquez pour sélectionner des
          fichiers
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Formats acceptés: JPG, PNG, WEBP (maximum 5 images)
        </p>
      </div>

      {previewImages.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">
            Aperçu des images ({previewImages.length}/5)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {previewImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={file.preview || file.url || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
