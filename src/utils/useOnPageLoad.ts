import { useEffect } from "react";

// This will run one time after the component mounts
const useOnPageLoad = (cb: () => void) => {
  useEffect(() => {
    const onPageLoad = () => {
      cb();
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
};

export default useOnPageLoad;
