"use client";
import React from "react";
import { Video } from "./Video";
import cloth1 from "@/assets/images/cloth1.png";
const VideoModal = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      {isOpen && (
        <Video
          videoThumbnail={cloth1.src}
          onClose={() => {
            setIsOpen(false);
          }}
          productDescription="Our premium linen blazer combines timeless elegance with modern comfort. Perfect for summer evenings or business casual settings."
          productName="Signature Linen Blazer"
          productPrice="$249.99"
          key={"Signature Linen Blazer"}
        />
      )}
    </>
  );
};

export default VideoModal;
