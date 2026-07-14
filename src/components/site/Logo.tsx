import logoUrl from "@/assets/rjd-logo.jpeg";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="RJD Group"
      width={80}
      height={80}
      className={`${className} rounded-md object-contain`}
    />
  );
}
