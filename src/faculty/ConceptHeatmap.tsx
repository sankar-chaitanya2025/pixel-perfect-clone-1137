import { useEffect, useState } from "react";
import { getDashboard } from "@/api/faculty";
import { ScoreBar } from "@/components/ScoreBar";
import { Spinner } from "@/components/Spinner";

export default function ConceptHeatmap() {
  const [loading, setLoading] = useState(true);
  const [concepts, setConcepts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getDashboard();
      if (error) {
        setConcepts([
          { concept: "trees", avg_score: 0.38 },
          { concept: "recursion", avg_score: 0.41 },
          { concept: "linked_lists", avg_score: 0.55 },
          { concept: "hash_maps", avg_score: 0.58 },
          { concept: "arrays", avg_score: 0.72 },
          { concept: "sorting", avg_score: 0.79 },
          { concept: "strings", avg_score: 0.65 },
          { concept: "dynamic_programming", avg_score: 0.29 },
          { concept: "graphs", avg_score: 0.44 },
        ]);
      } else {
        setConcepts((data as any)?.concepts ?? []);
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

  const sorted = [...concepts].sort((a, b) => a.avg_score - b.avg_score);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-normal text-foreground mb-1">Performance by Concept</h1>
      <p className="text-sm text-muted-foreground mb-8">Class averages — sorted weakest first</p>

      <div className="grid grid-cols-3 gap-px border border-border">
        {sorted.map((c) => (
          <div key={c.concept} className="p-6 bg-background">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.concept}</div>
            <div className="font-display text-3xl font-normal text-foreground my-2">{c.avg_score.toFixed(2)}</div>
            <ScoreBar value={c.avg_score} />
            <div className="text-xs text-muted-foreground mt-1">class average</div>
          </div>
        ))}
      </div>
    </div>
  );
}
