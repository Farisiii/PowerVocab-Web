export default function BackgroundAmbience() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-blue/20 blur-[100px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-150 h-150 rounded-full bg-cyan/20 blur-[120px] mix-blend-multiply animate-pulse-slow delay-700" />
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            left: 120%;
          }
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  )
}
