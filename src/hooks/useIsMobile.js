import { useEffect, useState } from 'react';

// Phones (< 768px, Tailwind `md`) get the app-style UI; tablets & laptops get the website layout.
const QUERY = '(max-width: 767px)';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener ? mql.addEventListener('change', onChange) : mql.addListener(onChange);
    return () => {
      mql.removeEventListener ? mql.removeEventListener('change', onChange) : mql.removeListener(onChange);
    };
  }, []);

  return isMobile;
}
