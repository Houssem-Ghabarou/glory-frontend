import { useTranslations } from "next-intl";
import Search from "@/components/pages/home/search/Search";
import { pagesMargin } from "@/lib/tailwind/classNames";
import DynamicCollection from "@/components/pages/home/dynamicCollection/DynamicCollection";
import NewThisWeek from "@/components/pages/home/newthisweek/NewThisWeek";
import AdvancedCollection from "@/components/pages/home/advancedCollection/AdvancedCollection";
import Appraoch from "@/components/pages/home/approach/Appraoch";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div
      className={` bg-theme text-theme min-h-screen transition-colors duration-500 ${pagesMargin} py-5 flex flex-col  gap-12`}
    >
      <Search />
      <DynamicCollection />
      <NewThisWeek />
      <AdvancedCollection />
      <Appraoch />
    </div>
  );
}
