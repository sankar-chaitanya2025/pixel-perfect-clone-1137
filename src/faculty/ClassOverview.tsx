import { useEffect, useState } from "react";
import { getDashboard } from "@/api/faculty";
import { StatCard } from "@/components/StatCard";
import { ScoreBar } from "@/components/ScoreBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/Spinner";
import { useNavigate } from "react-router-dom";

export default function ClassOverview() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: d, error } = await getDashboard();
      if (error) {
        // Mock data
        setData({
          class_size: 48,
          avg_capability: 0.61,
          escalation_rate: 0.22,
          gaming_flags_today: 3,
          concepts: [
            { concept: "arrays", avg_score: 0.72 },
            { concept: "hash_maps", avg_score: 0.58 },
            { concept: "recursion", avg_score: 0.41 },
            { concept: "sorting", avg_score: 0.79 },
            { concept: "linked_lists", avg_score: 0.55 },
            { concept: "trees", avg_score: 0.38 },
          ],
          struggling_students: [
            { id: "S001", name: "Alice Chen", weakest_concept: "trees", score: 0.25 },
            { id: "S002", name: "Bob Park", weakest_concept: "recursion", score: 0.31 },
            { id: "S003", name: "Carol Liu", weakest_concept: "trees", score: 0.35 },
          ],
        });
      } else {
        setData(d);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const concepts = (data?.concepts ?? []).sort((a: any, b: any) => a.avg_score - b.avg_score).slice(0, 6);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-normal text-foreground mb-8">Class Overview</h1>

      <div className="grid grid-cols-4 gap-px border border-border mb-8">
        <StatCard label="Class Size" value={data?.class_size ?? 0} />
        <StatCard label="Avg Capability" value={(data?.avg_capability ?? 0).toFixed(2)} />
        <StatCard label="Escalation Rate" value={`${Math.round((data?.escalation_rate ?? 0) * 100)}%`} />
        <StatCard label="Gaming Flags Today" value={data?.gaming_flags_today ?? 0} />
      </div>

      {/* Concept Heatmap Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Performance by Concept</h2>
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/faculty/concepts")}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-px border border-border">
          {concepts.map((c: any) => (
            <div key={c.concept} className="p-5 bg-background">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.concept}</div>
              <div className="font-display text-3xl font-normal text-foreground my-2">{c.avg_score.toFixed(2)}</div>
              <ScoreBar value={c.avg_score} />
              <div className="text-xs text-muted-foreground mt-1">class average</div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Struggling Students Preview */}
      <div>
        <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Needs Attention</h2>
        <div className="space-y-3">
          {(data?.struggling_students ?? []).map((s: any) => (
            <div key={s.id} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-32">{s.name}</span>
              <span className="text-xs text-muted-foreground w-24">{s.weakest_concept}</span>
              <div className="flex-1 max-w-xs">
                <ScoreBar value={s.score} />
              </div>
              <span className="font-display text-sm text-foreground">{s.score.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="text-xs mt-4" onClick={() => navigate("/faculty/students")}>
          View All Students →
        </Button>
      </div>
    </div>
  );
}
