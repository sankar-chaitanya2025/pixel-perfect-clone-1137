import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScoreBar } from "@/components/ScoreBar";
import { ZoneBadge } from "@/components/ZoneBadge";
import { DeepExplanationDialog } from "@/student/DeepExplanationDialog";
import { Check, X, ArrowRight } from "lucide-react";

interface FeedbackPanelProps {
  result: any;
  onNext: () => void;
}

export function FeedbackPanel({ result, onNext }: FeedbackPanelProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="border-t border-border p-8">
      {/* Row 1: Result Summary */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-display text-2xl text-foreground">
          {result.passed}/{result.total}
        </span>
        <span className="text-sm text-muted-foreground">test cases passed</span>
        <ZoneBadge score={result.new_score} />
      </div>

      {/* Row 2: Test Case Results */}
      <div className="flex items-center gap-2 mb-6">
        {result.test_results?.map((passed: boolean, i: number) => (
          <div
            key={i}
            className={`w-6 h-6 flex items-center justify-center border ${
              passed ? "bg-foreground text-background" : "bg-background text-foreground"
            } border-border`}
          >
            {passed ? <Check size={12} /> : <X size={12} />}
          </div>
        ))}
        {result.hidden_count > 0 && (
          <span className="text-xs text-muted-foreground ml-2">
            + {result.hidden_count} hidden tests
          </span>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Row 3: Feedback */}
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Feedback</h3>
        <p className="text-sm text-foreground leading-relaxed">{result.feedback}</p>
        {result.error_pattern && (
          <Badge variant="secondary" className="mt-2 rounded-md">{result.error_pattern}</Badge>
        )}
      </div>

      {/* Row 4: Capability Update */}
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Capability Update</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground">{result.concept}</span>
          <span className="text-sm text-muted-foreground">
            {result.old_score?.toFixed(2)} → {result.new_score?.toFixed(2)}
          </span>
        </div>
        <div className="mt-2 max-w-md">
          <ScoreBar value={result.new_score} />
        </div>
      </div>

      {/* Row 5: Deep Explanation Trigger */}
      <div className="flex items-center gap-3">
        {result.escalated && (
          <Button variant="outline" size="sm" onClick={() => setShowExplanation(true)}>
            View Deep Explanation
          </Button>
        )}
        <Button size="sm" onClick={onNext}>
          Continue to Next Problem
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>

      {result.deep_explanation && (
        <DeepExplanationDialog
          open={showExplanation}
          onOpenChange={setShowExplanation}
          explanation={result.deep_explanation}
        />
      )}
    </div>
  );
}
