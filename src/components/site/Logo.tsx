import logo from "@/assets/rjd-logo.jpeg.asset.json";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="RJD Group"
      width={80}
      height={80}
      className={`${className} rounded-md object-contain`}
    />
  );
}
