import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface DeepExplanationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  explanation: {
    explanation: string;
    steps: string[];
    alternative?: string;
    practice_problem?: {
      title: string;
      statement: string;
    };
  };
}

export function DeepExplanationDialog({ open, onOpenChange, explanation }: DeepExplanationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-none shadow-none border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-normal">Deep Explanation</DialogTitle>
          <p className="text-xs text-muted-foreground">Brain B analysis</p>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Explanation */}
          <div>
            <p className="text-sm text-foreground leading-relaxed">{explanation.explanation}</p>
          </div>

          <Separator />

          {/* Steps */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Reasoning Steps</h4>
            <ol className="space-y-2">
              {explanation.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-display text-muted-foreground">{i + 1}</span>
                  <span className="text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Alternative */}
          {explanation.alternative && (
            <>
              <Separator />
              <div>
                <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Alternative Approach</h4>
                <p className="text-sm text-foreground leading-relaxed">{explanation.alternative}</p>
              </div>
            </>
          )}

          {/* Practice Problem */}
          {explanation.practice_problem && (
            <>
              <Separator />
              <div>
                <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Practice Problem</h4>
                <p className="text-sm font-medium text-foreground">{explanation.practice_problem.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{explanation.practice_problem.statement}</p>
                <Button size="sm" className="mt-3">Practice This Problem</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
