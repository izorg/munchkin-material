import { type MetadataRoute } from "next";

import icon192 from "./icon-192.png";
import icon512 from "./icon-512.png";

export const dynamic = "force-static";

const manifest = (): MetadataRoute.Manifest => ({
  icons: [
    {
      sizes: "192x192",
      src: icon192.src,
      type: "image/png",
    },
    {
      sizes: "512x512",
      src: icon512.src,
      type: "image/png",
    },
  ],
});

export default manifest;
