import { AccuracyCard } from './accuracy-card'
import { StreakCard } from './streak-card'

export function StatsCards({
  accuracy = 94,
  streak = 12,
  best = 15,
}: {
  accuracy?: number
  streak?: number
  best?: number
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6 h-full">
      <div className="h-full">
        <AccuracyCard accuracy={accuracy} />
      </div>

      <div className="h-full">
        <StreakCard streak={streak} best={best} />
      </div>
    </div>
  )
}
