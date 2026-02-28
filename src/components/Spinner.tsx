export function Spinner() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
          style={{
            animation: "pulse 1s ease-in-out infinite",
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}
