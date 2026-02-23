"use client";

import { useEffect, useState } from 'react';

export default function LazyAnalytics() {
  const [Loaded, setLoaded] = useState(false);
  const [AnalyticsComp, setAnalyticsComp] = useState(null);

  useEffect(() => {
    let mounted = true;
    const onInteract = () => {
      if (!mounted) return;
      if (Loaded) return;
      setLoaded(true);
      import('@vercel/analytics/react').then((mod) => {
        if (!mounted) return;
        setAnalyticsComp(() => mod.Analytics);
      }).catch(() => {});
    };

    window.addEventListener('scroll', onInteract, { once: true, passive: true });
    window.addEventListener('click', onInteract, { once: true });
    window.addEventListener('keydown', onInteract, { once: true });

    return () => { mounted = false; };
  }, [Loaded]);

  if (!AnalyticsComp) return null;
  const A = AnalyticsComp;
  return <A />;
}
