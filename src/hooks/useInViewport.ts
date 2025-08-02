import { useState, useEffect, useRef } from "react";

const useInViewport = (options?: IntersectionObserverInit) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isInViewport };
};

export default useInViewport;
