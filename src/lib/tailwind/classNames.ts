import { clsx } from "clsx";

export const navLinkClass =
  "text-theme font-medium text-[16px] hover:underline hover:underline-offset-4 hover:underline-thickness-[2px]";
export const navLink = (isActive: boolean) =>
  clsx("text-gray-700", {
    "font-bold text-black": isActive,
    "hover:text-gray-900": !isActive,
  });

export const iconClass = "h-6 w-6 cursor-pointer";
export const containerClass =
  "container mx-auto flex items-center justify-between";

export const pagesMargin = "mx-6 sm:mx-10 md:mx-16 lg:mx-25";

export const titleClass = "text-[48px] font-bold text-theme leading-[40px] ";
export const subtitleClass = "text-[16px] font-[400] text-theme text-theme";
export const imagesize = "h-[450px] ";
export const heroSectionsImagesSize = "h-[500px] ";
