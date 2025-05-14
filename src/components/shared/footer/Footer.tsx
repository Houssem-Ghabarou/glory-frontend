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
    <footer className="relative z-20 bg-opacity-80 py-8 w-full flex flex-col ">
      <div className="flex flex-col md:flex-row w-full px-30 gap-15 ">
        {/* First column */}
        <div className="flex flex-col py-10 gap-6 items-center  flex-1  ">
          <Image
            src={logo || "/placeholder.svg"}
            alt="Logo"
            width={180}
            height={70}
            className="h-10 w-auto"
          />
          <div className="flex flex-col gap-2 items-center ">
            <p className="py-4 text-[#808080] text-center md:text-left">INFO</p>
            <div className="text-center md:text-left">
              <p>Pricing</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center ">
            <p className="py-4 text-[#808080] text-center md:text-left">
              LANGUAGES
            </p>
            <div className="text-center md:text-left">
              <p>ENG</p>
              <p>ESP</p>
              <p>SVE</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 py-6 items-center ">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={twitericon || "/placeholder.svg"}
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={facebookicon || "/placeholder.svg"}
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={instagramicon || "/placeholder.svg"}
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
              <Image
                src={githubicon || "/placeholder.svg"}
                alt="GitHub"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        {/* Second column */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1">
          <Image
            src={footerlogo || "/placeholder.svg"}
            alt="Footer Logo"
            width={141}
            height={198}
            className="h-auto w-40"
          />
        </div>

        {/* Third column */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1">
          <NewsLetter />
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <p className="text-[#808080] text-center">
          © 2025 All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
