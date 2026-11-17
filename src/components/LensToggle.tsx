import type { Lens } from "@/types/tarot";

export function LensToggle({
  lens,
  onChange,
}: {
  lens: Lens;
  onChange: (lens: Lens) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-300 bg-white p-1 text-sm">
      {(["tarot", "brain"] as const).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-full px-4 py-1 transition-colors ${
            lens === option
              ? "bg-neutral-800 text-white"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          {option === "tarot" ? "Tarot" : "Brain"}
        </button>
      ))}
    </div>
  );
}
