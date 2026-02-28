import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const MOCK_ESCALATIONS = [
  { id: "E001", student: "Alice Chen", concept: "trees", reason: "streak", time: "2 min ago", resolved: false },
  { id: "E002", student: "Bob Park", concept: "recursion", reason: "low_capability", time: "15 min ago", resolved: false },
  { id: "E003", student: "Carol Liu", concept: "trees", reason: "conceptual_gap", time: "1 hour ago", resolved: true },
  { id: "E004", student: "David Kim", concept: "dp", reason: "student_request", time: "2 hours ago", resolved: false },
  { id: "E005", student: "Eve Wang", concept: "graphs", reason: "streak", time: "3 hours ago", resolved: true },
  { id: "E006", student: "Frank Lee", concept: "arrays", reason: "low_capability", time: "5 hours ago", resolved: false },
];

const FILTERS = ["All", "Streak", "Low Capability", "Conceptual Gap", "Student Request"];
const FILTER_MAP: Record<string, string> = {
  "All": "",
  "Streak": "streak",
  "Low Capability": "low_capability",
  "Conceptual Gap": "conceptual_gap",
  "Student Request": "student_request",
};

export default function EscalationLog() {
  const [filter, setFilter] = useState("All");
  const [escalations, setEscalations] = useState(MOCK_ESCALATIONS);

  const filtered = filter === "All"
    ? escalations
    : escalations.filter((e) => e.reason === FILTER_MAP[filter]);

  const toggleResolved = (id: string) => {
    console.log(`PATCH /escalations/${id}/resolve`);
    setEscalations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, resolved: !e.resolved } : e))
    );
  };

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-normal text-foreground mb-8">Escalation Log</h1>

      <Tabs defaultValue="All" onValueChange={setFilter}>
        <TabsList className="bg-background border-b border-border rounded-none h-auto p-0 mb-6">
          {FILTERS.map((f) => (
            <TabsTrigger
              key={f}
              value={f}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm"
            >
              {f}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} forceMount>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Student</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Concept</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Reason</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Time</TableHead>
                <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Resolved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-sm text-foreground">{e.student}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-md">{e.concept}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-md">{e.reason}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{e.time}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={e.resolved}
                      onCheckedChange={() => toggleResolved(e.id)}
                      className="rounded-sm"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
