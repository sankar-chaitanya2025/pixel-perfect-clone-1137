import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="border-border shadow-none rounded-none p-6">
      <div className="font-display text-3xl font-normal text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
    </Card>
  );
}
