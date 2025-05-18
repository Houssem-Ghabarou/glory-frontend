import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES as DEFAULT_CATEGORIES } from "../../../lib/constants";
import { FormData } from "../../../lib/types";
import { UseFormReturn } from "react-hook-form";
import { Plus, X, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface BasicInfoTabProps {
  form: UseFormReturn<FormData>;
  nextTab: () => void;
}

export default function BasicInfoTab({ form, nextTab }: BasicInfoTabProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [watch("description")]);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }
    if (categories.includes(trimmed)) {
      toast({
        title: "Erreur",
        description: "Cette catégorie existe déjà.",
        variant: "destructive",
      });
      return;
    }
    setCategories([...categories, trimmed]);
    setValue("category", trimmed);
    setNewCategory("");
    toast({
      title: "Succès",
      description: `Catégorie "${trimmed}" ajoutée.`,
    });
    categoryInputRef.current?.focus();
  };

  const handleRemoveCategory = (category: string) => {
    if (watch("category") === category) {
      setValue("category", "");
    }
    setCategories(categories.filter((c) => c !== category));
    toast({
      title: "Succès",
      description: `Catégorie "${category}" supprimée.`,
    });
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        🛍️ Informations du produit
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nom du produit *
          </Label>
          <Input
            id="name"
            placeholder="Entrez le nom du produit"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name", { required: "Le nom est requis" })}
            className={`
              w-full px-4 py-2 rounded-lg border-2
              bg-white text-gray-900 placeholder-gray-400
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200
              ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }
            `}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500 animate-fade-in">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Collection */}
        <div className="space-y-2">
          <Label
            htmlFor="collection"
            className="text-sm font-medium text-gray-700"
          >
            Collection *
          </Label>
          <Input
            id="collection"
            placeholder="Entrez la collection"
            aria-invalid={errors.collection ? "true" : "false"}
            aria-describedby={
              errors.collection ? "collection-error" : undefined
            }
            {...register("collection", {
              required: "La collection est requise",
            })}
            className={`
              w-full px-4 py-2 rounded-lg border-2
              bg-white text-gray-900 placeholder-gray-400
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200
              ${
                errors.collection
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }
            `}
          />
          {errors.collection && (
            <p
              id="collection-error"
              className="text-sm text-red-500 animate-fade-in"
            >
              {errors.collection.message}
            </p>
          )}
        </div>

        {/* Prix */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium text-gray-700">
            Prix *
          </Label>
          <div className="relative">
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              aria-invalid={errors.price ? "true" : "false"}
              aria-describedby={errors.price ? "price-error" : undefined}
              {...register("price", {
                required: "Le prix est requis",
                min: {
                  value: 0.01,
                  message: "Le prix doit être supérieur à 0",
                },
              })}
              className={`
                w-full pl-10 pr-4 py-2 rounded-lg border-2
                bg-white text-gray-900 placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-200
                ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }
              `}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              €
            </span>
          </div>
          {errors.price && (
            <p
              id="price-error"
              className="text-sm text-red-500 animate-fade-in"
            >
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Catégorie */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Catégorie</Label>
          <Select
            value={watch("category") || ""}
            onValueChange={(value) => setValue("category", value)}
          >
            <SelectTrigger
              className={`
                w-full px-4 py-2 rounded-lg border-2
                bg-white text-gray-900
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-200
                ${
                  watch("category")
                    ? "border-gray-300"
                    : "border-gray-300 text-gray-400"
                }
              `}
              aria-label="Sélectionner une catégorie"
            >
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
              <div className="p-2 sticky top-0 bg-white border-b">
                <div className="relative">
                  <Input
                    placeholder="Rechercher une catégorie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                  >
                    {category}
                  </SelectItem>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  Aucune catégorie trouvée
                </div>
              )}
            </SelectContent>
          </Select>

          {/* Added Categories Chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`
                    flex items-center gap-1 px-3 py-1 rounded-full text-sm
                    transition-all duration-200 animate-chip-in
                    ${
                      watch("category") === category
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  `}
                >
                  <span>{category}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="p-0.5 hover:text-red-500"
                    aria-label={`Supprimer la catégorie ${category}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Category */}
          <div className="flex items-end gap-2 mt-3">
            <div className="flex-1">
              <Label
                htmlFor="newCategory"
                className="text-sm font-medium text-gray-700"
              >
                Nouvelle catégorie
              </Label>
              <Input
                id="newCategory"
                ref={categoryInputRef}
                placeholder="Ajouter une catégorie"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <Button
              type="button"
              onClick={handleAddCategory}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Décris ton produit..."
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          {...register("description")}
          className={`
            w-full px-4 py-2 rounded-lg border-2
            bg-white text-gray-900 placeholder-gray-400
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-200 resize-none
            ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }
          `}
        />
      </div>

      {/* Bouton suivant */}
      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={nextTab}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
