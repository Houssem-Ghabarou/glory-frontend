// import { useTheme } from "@/hooks/useTheme";
import { useTranslations } from "next-intl";
import Search from "@/components/pages/home/search/Search";
import { pagesMargin } from "@/lib/tailwind/classNames";
import DynamicCollection from "@/components/pages/home/dynamicCollection/DynamicCollection";
export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div
      className={` bg-theme text-theme min-h-screen transition-colors duration-500 ${pagesMargin} py-5 flex flex-col  gap-25`}
    >
      <Search />
      <DynamicCollection />
    </div>
  );
}
