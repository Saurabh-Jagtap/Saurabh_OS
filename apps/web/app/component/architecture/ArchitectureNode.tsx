interface ArchitectureNodeProps {
  label: string;
}

export default function ArchitectureNode({
  label,
}: ArchitectureNodeProps) {
  return (
    <div
      className="
        rounded-lg
        border border-white/10
        bg-white/[0.03]
        px-4 py-2
        text-center
        font-mono
        text-xs
        text-zinc-300
        transition-all
        duration-300
        hover:border-cyan-500/30
        hover:bg-cyan-500/[0.04]
      "
    >
      {label}
    </div>
  );
}