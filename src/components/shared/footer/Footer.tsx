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
    <footer className="relative z-20 bg-opacity-80 py-8 w-full flex justify-between px-50 ">
      <div className="flex flex-col  py-10 gap-10">
        <Image
          src={logo}
          alt="Logo"
          width={180}
          height={70}
          className="h-10 w-auto "
        />
        <div className="flex flex-col gap-2 items-center">
          <p className="py-10 w-25 h-18 text-[#808080] text-center">INFO</p>
          <div className="w-49 h-9 text-center align-left">
            <p>Precing</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="py-10 w-25 h-18 text-[#808080] text-center">
            LANGUAGES
          </p>
          <div className="w-49 h-9 text-center align-left">
            <p>ENG</p>
            <p>ESP</p>
            <p>SVE</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 py-10 items-center">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={twitericon} alt="" width={24} height={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={facebookicon} alt="" width={24} height={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={instagramicon} alt="" width={24} height={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={githubicon} alt="" width={24} height={24} />
          </a>
        </div>
      </div>

      <div className="flex items-start gap-10">
        <Image
          src={footerlogo}
          alt=""
          width={141}
          height={198}
          className="h-141 w-40"
        />
      </div>
      <div className="flex flex-col justify-center px-8 ">
        <NewsLetter />
      </div>
    </footer>
  );
};

export default Footer;
