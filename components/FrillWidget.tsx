"use client";

import { useEffect } from "react";

export default function FrillWidget() {
  useEffect(() => {
    // Function to initialize the Frill widget
    const initializeFrillWidget = () => {
      const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widget.frill.co/v2/container.js";

    script.onload = () => {
        // After the script is loaded, initialize the Frill widget
        if ((window as any).Frill) {
            (window as any).Frill("container", {
                key: "90d54760-b65b-4902-a6c3-b54ca7b96a86", // Add your script key
                ssoToken: localStorage.getItem("ssoToken"), // Retrieve the token from localStorage
            });
        }
    };

    document.body.appendChild(script);
    };

    // Check if the script is already loaded; if not, initialize it
    if (
      !document.querySelector(
        'script[src="https://widget.frill.co/v2/container.js"]'
      )
    ) {
      initializeFrillWidget();
    }
  }, []);

  return null; // The component doesn't render any visible UI
}
