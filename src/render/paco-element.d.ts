// <paco-3d>: the Kunz ecosystem's shared 3D character (public/paco/paco-viewer.js, source in KunzGlobal/Brand/Paco/web-kit).
// The element is upgraded on the client when its section comes near; until then (and without JavaScript) the
// light-DOM <img> inside it is the fallback.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "paco-3d": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        poster?: string;
        alt?: string;
        props?: string;
        camera?: "full" | "wide" | "hero" | "bust" | "threequarter";
        accent?: string;
        look?: "cursor" | "target" | "mixed" | "none";
        "look-at"?: string;
        mood?: "idle" | "talk" | "think" | "look";
        mobile?: "3d" | "poster";
        wave?: string;
        speaking?: string;
        scale?: string;
        yaw?: string;
        screen?: string;
        "screen-kind"?: "dashboard" | "chat" | "code";
      };
    }
  }
}
