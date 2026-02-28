import { Badge } from "@/components/ui/badge";

interface ZoneBadgeProps {
  score: number;
}

function getZone(score: number) {
  if (score < 0.4) return { label: "Too Difficult", variant: "default" as const };
  if (score <= 0.75) return { label: "Learning", variant: "outline" as const };
  return { label: "Mastered", variant: "outline" as const };
}

export function ZoneBadge({ score }: ZoneBadgeProps) {
  const zone = getZone(score);
  return <Badge variant={zone.variant}>{zone.label}</Badge>;
}
