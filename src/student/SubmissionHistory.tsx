import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getHistory } from "@/api/submissions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/Spinner";

interface Submission {
  id: string;
  problem_title: string;
  concept: string;
  passed: number;
  total: number;
  score_change: string;
  timestamp: string;
}

export default function SubmissionHistory() {
  const { id: studentId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Submission[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getHistory(studentId);
      if (error) {
        // Mock data
        setHistory([
          { id: "1", problem_title: "Two Sum", concept: "arrays", passed: 5, total: 5, score_change: "+0.05", timestamp: "2 min ago" },
          { id: "2", problem_title: "Reverse Linked List", concept: "linked_lists", passed: 3, total: 5, score_change: "-0.03", timestamp: "1 hour ago" },
          { id: "3", problem_title: "Binary Search", concept: "sorting", passed: 4, total: 5, score_change: "+0.02", timestamp: "3 hours ago" },
          { id: "4", problem_title: "Valid Parentheses", concept: "stacks", passed: 5, total: 5, score_change: "+0.08", timestamp: "1 day ago" },
          { id: "5", problem_title: "Tree Traversal", concept: "trees", passed: 1, total: 5, score_change: "-0.07", timestamp: "2 days ago" },
        ]);
      } else {
        setHistory(data as Submission[]);
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

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-normal text-foreground mb-2">History</h1>
      <p className="text-sm text-muted-foreground mb-8">Your recent submissions</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Problem</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Concept</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Result</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Score Δ</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="text-sm text-foreground">{s.problem_title}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="rounded-md">{s.concept}</Badge>
              </TableCell>
              <TableCell className="text-sm font-mono text-foreground">{s.passed}/{s.total}</TableCell>
              <TableCell className="text-sm font-mono text-foreground">{s.score_change}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{s.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
