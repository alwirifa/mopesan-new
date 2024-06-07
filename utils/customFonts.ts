import localFont from "next/font/local";

const Noah = localFont({
  src: [
    {
      path: "../assets/fonts/noah-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/noah-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/noah-regular.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-noah",
});

export { Noah };
