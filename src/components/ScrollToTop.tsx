import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const action = useNavigationType();

  useEffect(() => {
    // Skip scroll to top if the user is navigating back
    if (action === "POP") return;

    if (hash) {
      // Small timeout to allow the DOM to render (especially when navigating from a different page)
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const lenis = (window as any).__lenis;
          if (lenis) {
            // Smoothly scroll with Lenis, giving an offset of -90px to prevent header overlap
            lenis.scrollTo(element, { offset: -90, duration: 1.5 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, action]);

  return null;
}
