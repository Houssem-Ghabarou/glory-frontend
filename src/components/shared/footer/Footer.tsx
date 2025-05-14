import React from "react";
import Image from "next/image";
import logo from "@/assets/logo/blacklogo.svg";
import footerlogo from "@/assets/logo/footerlogo.svg";
import twitericon from "@/assets/icons/twitter-icon.svg";
import facebookicon from "@/assets/icons/facebook-icon.svg";
import instagramicon from "@/assets/icons/instagram-icon.svg";
import githubicon from "@/assets/icons/github-icon.svg";
import NewsLetter from "@/components/shared/newsLetter/NewsLetter";

const Footer = () => {
  return (
    <footer className="relative z-20 bg-opacity-80 py-8 w-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-50">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col py-10 gap-6 items-center md:items-start">
          <Image
            src={logo}
            alt="Logo"
            width={180}
            height={70}
            className="h-10 w-auto"
          />
          <div className="flex flex-col gap-2 items-center">
            <p className="py-4 text-[#808080] text-center">INFO</p>
            <div className="text-center md:text-left">
              <p>Pricing</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="py-4 text-[#808080] text-center">LANGUAGES</p>
            <div className="text-center md:text-left">
              <p>ENG</p>
              <p>ESP</p>
              <p>SVE</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 py-6 items-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={twitericon} alt="Twitter" width={24} height={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={facebookicon} alt="Facebook" width={24} height={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={instagramicon}
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={githubicon} alt="GitHub" width={24} height={24} />
            </a>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-10">
          <Image
            src={footerlogo}
            alt="Footer Logo"
            width={141}
            height={198}
            className="h-141 w-40"
          />
        </div>

        <div className="hidden md:flex flex-col justify-center px-8">
          <NewsLetter />
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <p className="text-[#808080] text-center">© 2025All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
