"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { navLinkClass, pagesMargin } from "@/lib/tailwind/classNames";
import logo from "@/assets/logo/blacklogo.svg";
import favoriteIcon from "@/assets/icons/favorite.svg";
import shopIcon from "@/assets/icons/shop.svg";
import profileIcon from "@/assets/icons/profile.svg";
import phoneNav from "@/assets/icons/phonenav.svg";
import { useIsMobile } from "@/hooks/useMobile";
import useCart from "../cart/useCart";

const Header = () => {
  const { toggleCart, cartOpen, cartItems } = useCart();
  const itemsLength = cartItems?.length || 0;
  const prevItemsLength = useRef(itemsLength);
  const [animate, setAnimate] = useState(false);

  const isMobile = useIsMobile();
  const t = useTranslations("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Animation effect when cart items change
  useEffect(() => {
    if (itemsLength > 0 && itemsLength !== prevItemsLength.current) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
    prevItemsLength.current = itemsLength;
  }, [itemsLength]);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Run it once on mount to sync initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
    <header
      className={`z-20 ${
        isScrolled ? "py-3" : "py-8"
      } w-full transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 backdrop-blur-md shadow-sm"
          : "relative bg-opacity-80"
      }`}
    >
      <div className={`flex items-center justify-between ${pagesMargin}`}>
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="flex gap-2 cursor-pointer items-center lg:hidden"
          aria-label="Toggle Menu"
        >
          <Image
            src={phoneNav || "/placeholder.svg"}
            alt="Menu"
            width={24}
            height={24}
          />
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
            src={logo || "/placeholder.svg"}
            alt="Logo"
            width={100}
            height={50}
            className="h-10 w-auto"
          />
        </div>

        {/* Action Icons */}
        <div className="flex space-x-4 lg:space-x-8 items-center">
          {/* <button aria-label="Favorite" className="cursor-pointer">
            <Image
              src={favoriteIcon || "/placeholder.svg"}
              alt="Favorite"
              width={24}
              height={24}
            />
          </button> */}
          <button
            onClick={toggleCart}
            aria-label="Cart"
            className="flex items-center gap-2 cursor-pointer relative"
          >
            <Image
              src={shopIcon || "/placeholder.svg"}
              alt="Cart"
              width={24}
              height={24}
              className={animate ? "animate-wiggle" : ""}
            />
            {itemsLength > 0 && (
              <div
                className={`absolute -top-2 -right-2 flex items-center justify-center
                  ${animate ? "animate-bounce-badge bg-red-500" : "bg-black"}
                  text-white text-xs font-bold rounded-full h-5 w-5
                  transition-all duration-300 ease-in-out
                  ${animate ? "scale-125" : "scale-100"}
                  ${animate ? "shadow-glow" : ""}
                `}
              >
                {itemsLength}
              </div>
            )}
          </button>
          {/* <button
            aria-label="Profile"
            className="hidden lg:inline cursor-pointer"
          >
            <Image
              src={profileIcon || "/placeholder.svg"}
              alt="Profile"
              width={24}
              height={24}
            />
          </button> */}
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <div
        className={`fixed inset-0 h-screen z-30 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-3/4 h-screen bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out mobile-menu ${
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
