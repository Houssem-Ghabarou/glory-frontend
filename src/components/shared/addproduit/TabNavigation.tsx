import { Button } from "@/components/ui/button";

interface TabNavigationProps {
  activeTab: "basic" | "variations" | "images";
  prevTab: () => void;
  nextTab: () => void;
  isSubmitting: boolean;
}

export default function TabNavigation({
  activeTab,
  prevTab,
  nextTab,
}: TabNavigationProps) {
  return (
    <div className="flex justify-between">
      {activeTab !== "basic" && (
        <Button type="button" onClick={prevTab}>
          Précédent
        </Button>
      )}
      {activeTab !== "images" && (
        <Button
          type="button"
          onClick={nextTab}
          className={`hover:bg-black hover:text-white ${
            activeTab === "basic" ? "ml-auto" : ""
          }`}
        >
          Suivant
        </Button>
      )}
    </div>
  );
}
