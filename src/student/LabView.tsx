import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getNextProblem } from "@/api/problems";
import { postSubmission } from "@/api/submissions";
import { CodeEditor, type CodeEditorHandle } from "@/components/CodeEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/Spinner";
import { ErrorBanner } from "@/components/ErrorBanner";
import { FeedbackPanel } from "@/student/FeedbackPanel";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  concepts: string[];
  statement: string;
  examples: { input: string; output: string }[];
  starter_code?: string;
}

export default function LabView() {
  const { id: studentId } = useAuth();
  const editorRef = useRef<CodeEditorHandle>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [attempt, setAttempt] = useState(1);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const loadProblem = useCallback(async () => {
    setLoading(true);
    setResult(null);
    setError("");
    const { data, error: err } = await getNextProblem(studentId);
    if (err) {
      setError(err);
      // Use mock data for demo
      setProblem({
        id: "demo-1",
        title: "Two Sum",
        difficulty: "Medium",
        concepts: ["arrays", "hash_maps"],
        statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
          { input: "nums = [2,7,11,15], target = 9", output: "[0, 1]" },
          { input: "nums = [3,2,4], target = 6", output: "[1, 2]" },
        ],
        starter_code: "def two_sum(nums, target):\n    # Your code here\n    pass",
      });
    } else if (data) {
      setProblem(data as Problem);
    }
    setLoading(false);
    setAttempt(1);
  }, [studentId]);

  useEffect(() => {
    loadProblem();
  }, [loadProblem]);

  useEffect(() => {
    if (problem?.starter_code) {
      setCode(problem.starter_code);
      editorRef.current?.setValue(problem.starter_code);
    }
  }, [problem]);

  const handleSubmit = async () => {
    if (!problem) return;
    setSubmitting(true);
    setError("");
    const { data, error: err } = await postSubmission({
      student_id: studentId,
      problem_id: problem.id,
      code,
    });
    if (err) {
      // Mock result for demo
      setResult({
        passed: 3,
        total: 5,
        test_results: [true, true, true, false, false],
        hidden_count: 2,
        feedback: "Your solution doesn't handle edge cases. Consider what happens when the array has duplicate values.",
        error_pattern: "off_by_one",
        concept: "arrays",
        old_score: 0.65,
        new_score: 0.62,
        escalated: true,
        deep_explanation: {
          explanation: "The issue is that your solution iterates through the array but doesn't properly track previously seen elements. A hash map approach would allow O(1) lookups.",
          steps: [
            "Create an empty hash map to store number → index pairs",
            "For each element, calculate complement = target - current",
            "Check if complement exists in hash map",
            "If yes, return [hash_map[complement], current_index]",
            "If no, add current number and index to hash map",
          ],
          alternative: "You could also sort the array and use two pointers, but this changes the indices so you'd need to store original positions.",
          practice_problem: {
            title: "Three Sum",
            statement: "Find all unique triplets in the array which gives the sum of zero.",
          },
        },
      });
    } else {
      setResult(data);
    }
    setSubmitting(false);
    setAttempt((a) => a + 1);
    setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const diffVariant = problem?.difficulty === "Hard" ? "default" : "outline";

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 min-h-0">
        {/* Left — Problem Panel */}
        <div className="w-1/2 border-r border-border overflow-y-auto p-8">
          {error && !problem && <ErrorBanner message={error} />}
          {problem && (
            <>
              <div className="flex justify-between items-start mb-6">
                <h1 className="font-display text-2xl font-normal text-foreground">
                  {problem.title}
                </h1>
                <Badge variant={diffVariant} className={problem.difficulty === "Easy" ? "text-muted-foreground" : ""}>
                  {problem.difficulty}
                </Badge>
              </div>

              <div className="flex gap-2 mb-6">
                {problem.concepts.map((c) => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
              </div>

              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap mb-6">
                {problem.statement}
              </p>

              {problem.examples.length > 0 && (
                <>
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Examples</h3>
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="mb-4 font-mono text-sm">
                      <div className="text-muted-foreground">
                        Input: <span className="text-foreground">{ex.input}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Output: <span className="text-foreground">{ex.output}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* Right — Editor Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Solution</span>
              <span className="text-xs text-muted-foreground">Python</span>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <CodeEditor ref={editorRef} value={code} onChange={setCode} />
          </div>

          <div className="flex items-center justify-between px-6 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Attempt {attempt}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={submitting}>
                Request Hint
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <Spinner /> : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Panel */}
      {result && (
        <div ref={feedbackRef} className="animate-panel-in">
          <FeedbackPanel result={result} onNext={loadProblem} />
        </div>
      )}
    </div>
  );
}
