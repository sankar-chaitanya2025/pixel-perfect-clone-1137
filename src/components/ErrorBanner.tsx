interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="border border-border bg-secondary px-4 py-3 text-sm text-foreground">
      {message}
    </div>
  );
}
