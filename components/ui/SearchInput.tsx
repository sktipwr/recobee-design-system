"use client";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeMap = {
  sm: "py-1.5 pl-8 pr-7 text-body-sm",
  md: "py-2 pl-9 pr-8 text-body",
};

const iconSize = {
  sm: "w-3.5 h-3.5 left-2.5",
  md: "w-4 h-4 left-3",
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  size = "md",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${iconSize[size]}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-zinc-900/60 border border-white/[0.06] rounded-full text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 transition-colors ${sizeMap[size]}`}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
