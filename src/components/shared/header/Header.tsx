"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { navLinkClass } from "@/lib/tailwind/classNames";
import { pagesMargin } from "@/lib/tailwind/classNames";
import logo from "@/assets/logo/blacklogo.svg";
import favoriteIcon from "@/assets/icons/favorite.svg";
import shopIcon from "@/assets/icons/shop.svg";
import profileIcon from "@/assets/icons/profile.svg";
import phoneNav from "@/assets/icons/phonenav.svg";
import { useIsMobile } from "@/hooks/useMobile";
const Header = () => {
  const isMobile = useIsMobile();
  const t = useTranslations("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector(".absolute.top-0.left-0");
      if (menu && !menu.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-20 bg-opacity-80 py-8 w-full">
      <div className={`flex items-center justify-between ${pagesMargin}`}>
        <button
          onClick={toggleMenu}
          className="flex gap-2 cursor-pointer items-center lg:hidden"
        >
          <Image
            src={phoneNav}
            alt="Menu"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
        <nav className="hidden lg:flex space-x-8">
          <a href="/" className={navLinkClass}>
            {t("home")}
          </a>
          <a href="/collections" className={navLinkClass}>
            {t("collections")}
          </a>
          <a href="/new" className={navLinkClass}>
            {t("new")}
          </a>
        </nav>
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={50}
            className="h-10 w-auto"
          />
        </div>
        <div className="flex space-x-4 lg:space-x-8 items-center">
          <button className="flex gap-2 cursor-pointer items-center">
            <Image
              src={favoriteIcon}
              alt="Favorite"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
          <button className="flex gap-2 cursor-pointer items-center">
            <Image
              src={shopIcon}
              alt="Cart"
              width={24}
              height={24}
              className="h-6 w-6 cursor-pointer"
            />
            <div className={`hidden lg:inline ${navLinkClass}`}>
              {t("cart")}
            </div>
          </button>
          <button className="flex gap-2 cursor-pointer items-center hidden lg:inline">
            <Image
              src={profileIcon}
              alt="Profile"
              width={24}
              height={24}
              className="h-6 w-6 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Modal Slider */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-30">
          <div className="absolute top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6">
            <button
              onClick={toggleMenu}
              className="text-black text-lg font-bold mb-4"
            >
              {t("close")}
            </button>
            <nav className="flex flex-col space-y-4">
              <a href="/" className={navLinkClass}>
                {t("home")}
              </a>
              <a href="/collections" className={navLinkClass}>
                {t("collections")}
              </a>
              <a href="/new" className={navLinkClass}>
                {t("new")}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
