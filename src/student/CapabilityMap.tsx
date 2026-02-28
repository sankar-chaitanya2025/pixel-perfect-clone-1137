import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfile } from "@/api/students";
import { StatCard } from "@/components/StatCard";
import { ScoreBar } from "@/components/ScoreBar";
import { ZoneBadge } from "@/components/ZoneBadge";
import { Spinner } from "@/components/Spinner";
import { ErrorBanner } from "@/components/ErrorBanner";

interface ConceptScore {
  concept: string;
  score: number;
  last_updated?: string;
}

export default function CapabilityMap() {
  const { id: studentId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data, error: err } = await getProfile(studentId);
      if (err) {
        setError(err);
        // Mock data
        setProfile({
          total_submissions: 42,
          total_escalations: 7,
          concepts: [
            { concept: "arrays", score: 0.72, last_updated: "2 hours ago" },
            { concept: "hash_maps", score: 0.45, last_updated: "1 hour ago" },
            { concept: "recursion", score: 0.33, last_updated: "3 hours ago" },
            { concept: "sorting", score: 0.81, last_updated: "5 hours ago" },
            { concept: "linked_lists", score: 0.58, last_updated: "1 day ago" },
            { concept: "trees", score: 0.25, last_updated: "2 days ago" },
          ],
        });
      } else {
        setProfile(data);
      }
      setLoading(false);
    })();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const concepts: ConceptScore[] = (profile?.concepts ?? []).sort(
    (a: ConceptScore, b: ConceptScore) => a.score - b.score
  );

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-normal text-foreground mb-8">My Progress</h1>

      <div className="grid grid-cols-2 gap-px mb-8 border border-border">
        <StatCard label="Total Submissions" value={profile?.total_submissions ?? 0} />
        <StatCard label="Total Escalations" value={profile?.total_escalations ?? 0} />
      </div>

      <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
        Capability across concepts
      </h2>

      {error && <ErrorBanner message={`Using demo data — ${error}`} />}

      <div className="space-y-6 mt-4">
        {concepts.map((c) => (
          <div key={c.concept} className="flex items-start gap-6">
            <div className="w-32 shrink-0">
              <div className="text-sm text-foreground">{c.concept}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {c.last_updated ? `Updated ${c.last_updated}` : ""}
              </div>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-display text-xl text-foreground">{c.score.toFixed(2)}</span>
                <ZoneBadge score={c.score} />
              </div>
              <ScoreBar value={c.score} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
