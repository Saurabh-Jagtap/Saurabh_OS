export function CornerBracket({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const styles: Record<string, string> = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return (
    <span
      className={`absolute w-3 h-3 ${styles[position]} border-indigo-500/40`}
      aria-hidden
    />
  );
}