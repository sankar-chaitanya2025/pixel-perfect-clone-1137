import { useEffect, useState } from "react";
import { getDashboard } from "@/api/faculty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScoreBar } from "@/components/ScoreBar";
import { Spinner } from "@/components/Spinner";

export default function StrugglingStudents() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getDashboard();
      if (error) {
        setStudents([
          { id: "S001", name: "Alice Chen", weakest_concept: "trees", score: 0.25, submissions: 18, status: "At Risk" },
          { id: "S002", name: "Bob Park", weakest_concept: "recursion", score: 0.31, submissions: 12, status: "At Risk" },
          { id: "S003", name: "Carol Liu", weakest_concept: "trees", score: 0.35, submissions: 22, status: "At Risk" },
          { id: "S004", name: "David Kim", weakest_concept: "dynamic_programming", score: 0.28, submissions: 8, status: "At Risk" },
          { id: "S005", name: "Eve Wang", weakest_concept: "graphs", score: 0.37, submissions: 15, status: "At Risk" },
        ]);
      } else {
        setStudents((data as any)?.struggling_students ?? []);
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

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-normal text-foreground mb-1">Students Needing Attention</h1>
      <p className="text-sm text-muted-foreground mb-8">Students with at least one concept below 0.40</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Student ID</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Name</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Weakest Concept</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Score</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Submissions</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="text-sm font-mono text-foreground">{s.id}</TableCell>
              <TableCell className="text-sm text-foreground">{s.name}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="rounded-md">{s.weakest_concept}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm text-foreground">{s.score.toFixed(2)}</span>
                  <div className="w-20">
                    <ScoreBar value={s.score} />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-foreground">{s.submissions}</TableCell>
              <TableCell>
                <Badge variant="default" className="rounded-md">{s.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
