import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface ScoreBarProps {
  value: number; // 0–1
  className?: string;
}

export function ScoreBar({ value, className }: ScoreBarProps) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(value * 100), 50);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Progress
      value={displayed}
      className={`h-1 bg-secondary ${className ?? ""}`}
    />
  );
}
