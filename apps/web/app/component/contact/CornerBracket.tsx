export function CornerBracket({
  pos,
  color = "border-indigo-500/30",
}: {
  pos: "tl" | "tr" | "bl" | "br";
  color?: string;
}) {
  const map = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute w-3 h-3 ${map[pos]} ${color}`}
    />
  );
}