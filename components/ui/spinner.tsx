export function Spinner() {
  return (
    <div className="flex justify-center items-center bg-white rounded-full" style={{ width: 40, height: 40 }}>
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-4 border-gray-300 border-t-blue-500"></div>
      {/* Fallback SVG spinner if Tailwind classes fail */}
      <svg className="absolute animate-spin" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#e5e7eb" strokeWidth="4" />
        <path d="M16 2a14 14 0 0 1 14 14" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
