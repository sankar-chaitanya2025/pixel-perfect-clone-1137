import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LogoMark() {
  return (
    <div className="grid grid-cols-2 gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-2 w-2 bg-foreground" />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const [id, setId] = useState("");
  const [role, setRole] = useState<"student" | "faculty">("student");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!id.trim()) {
      setError("Please enter your ID");
      return;
    }
    login(id.trim(), role);
    navigate(role === "student" ? "/student/lab" : "/faculty/overview");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center">
          <LogoMark />
          <h1 className="font-display text-3xl font-normal text-foreground mt-6">AdaptLab</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-8">Adaptive Coding Lab</p>
        </div>

        <Separator />

        <Input
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setError("");
          }}
          className="mt-6 rounded-md"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <div className="grid grid-cols-2 gap-0 mt-3">
          <Button
            variant={role === "student" ? "default" : "outline"}
            className="rounded-none"
            onClick={() => setRole("student")}
          >
            Student
          </Button>
          <Button
            variant={role === "faculty" ? "default" : "outline"}
            className="rounded-none"
            onClick={() => setRole("faculty")}
          >
            Faculty
          </Button>
        </div>

        <Button className="w-full mt-4" onClick={handleSubmit}>
          Enter Lab
        </Button>

        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
