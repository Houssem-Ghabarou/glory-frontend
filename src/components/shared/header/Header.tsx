"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { navLinkClass, pagesMargin } from "@/lib/tailwind/classNames";
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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector(".mobile-menu");
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
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="flex gap-2 cursor-pointer items-center lg:hidden"
          aria-label="Toggle Menu"
        >
          <Image src={phoneNav} alt="Menu" width={24} height={24} />
        </button>

        {/* Desktop Navigation */}
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

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={50}
            className="h-10 w-auto"
          />
        </div>

        {/* Action Icons */}
        <div className="flex space-x-4 lg:space-x-8 items-center">
          <button aria-label="Favorite">
            <Image src={favoriteIcon} alt="Favorite" width={24} height={24} />
          </button>
          <button aria-label="Cart" className="flex items-center gap-2">
            <Image src={shopIcon} alt="Cart" width={24} height={24} />
            <span className={`hidden lg:inline ${navLinkClass}`}>
              {t("cart")}
            </span>
          </button>
          <button aria-label="Profile" className="hidden lg:inline">
            <Image src={profileIcon} alt="Profile" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out mobile-menu ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={toggleMenu}
            className="text-black text-lg font-bold mb-4"
            aria-label="Close Menu"
          >
            Close
          </button>
          <nav className="flex flex-col space-y-4">
            <a
              href="/"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </a>
            <a
              href="/collections"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("collections")}
            </a>
            <a
              href="/new"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("new")}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
