"use client";

import { useEffect, useState } from "react";
import Breddy from "./Breddy";

// Renders null on the server and on first hydration, then mounts Breddy
// client-side only. This prevents SSR/hydration mismatches from browser-only
// APIs (sessionStorage, SpeechRecognition, SpeechSynthesis) used inside Breddy.
export default function BreddyLoader() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Breddy />;
}
