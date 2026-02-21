import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [days, setDays] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1280) setDays(7);
      else if (width >= 1024) setDays(5);
      else if (width >= 768) setDays(4);
      else if (width >= 640) setDays(3);
      else if (width >= 380) setDays(2);
      else setDays(1);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return days;
};
