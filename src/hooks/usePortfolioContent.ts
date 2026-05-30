import { useEffect, useState } from "react";
import type { PortfolioContent } from "@/types/content";

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("./data/portfolio.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load portfolio content.");
        }
        const payload = (await response.json()) as PortfolioContent;
        if (!cancelled) {
          setContent(payload);
        }
      })
      .catch((fetchError: Error) => {
        if (!cancelled) {
          setError(fetchError.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, error };
}
