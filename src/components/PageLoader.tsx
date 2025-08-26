export default function PageLoader({ text = "Загрузка..." }: { text?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <svg className="animate-spin h-10 w-10 text-primary mb-4" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      <div className="text-steel-700 text-lg">{text}</div>
    </div>
  );
} 