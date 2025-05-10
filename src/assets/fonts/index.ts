// app/fonts.ts
import localFont from "next/font/local";
export const beatriceFonts = localFont({
  src: [
    {
      path: "./beatrice/BeatriceDeckTRIAL-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./beatrice/BeatriceDeckTRIAL-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./beatrice/BeatriceDeckTRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./beatrice/BeatriceDeckTRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./beatrice/BeatriceDeckTRIAL-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./beatrice/BeatriceDeckTRIAL-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-beatrice",
});

// Tailwind Class	Font Weight	Beatrice File Used
// font-thin	100	BeatriceDeckTRIAL-Thin.woff2
// font-light	300	BeatriceDeckTRIAL-Light.woff2
// font-normal	400	BeatriceDeckTRIAL-Regular.woff2
// font-medium	500	BeatriceDeckTRIAL-Medium.woff2
// font-semibold	600	BeatriceDeckTRIAL-Semibold.woff2
// font-extrabold	800	BeatriceDeckTRIAL-Extrabold.woff2
