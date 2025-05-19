import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import ImageUploader from "./ImageUploader";
import { PreviewImage } from "../../../lib/types";

interface ImagesTabProps {
  previewImages: PreviewImage[];
  setPreviewImages: React.Dispatch<React.SetStateAction<PreviewImage[]>>;
  prevTab: () => void;
  isSubmitting: boolean;
  isEdit: boolean;
  errorMessage?: string | null; // Add errorMessage prop
}

export default function ImagesTab({
  previewImages,
  setPreviewImages,
  prevTab,
  isSubmitting,
  isEdit,
  errorMessage,
}: ImagesTabProps) {
  return (
    <div className="space-y-6 py-4">
      <h2 className="text-xl font-bold">Images du produit</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ImageUploader
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="hover:bg-black hover:text-white"
          onClick={prevTab}
        >
          Précédent
        </Button>
        <Button
          className="hover:bg-black hover:text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            <span className="flex items-center">
              <Save className="w-4 h-4 mr-2" />
              {isEdit ? "Enregistrer les modifications" : "Publier le produit"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
