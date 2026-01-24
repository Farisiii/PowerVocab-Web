'use client'

import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

export function VocabGrowthChart() {
  const data = useMemo(() => {
    let total = 40
    return Array.from({ length: 24 }, (_, i) => ({
      day: i + 1,
      words: (total += Math.floor(Math.random() * 8) + 2),
    }))
  }, [])

  return (
    <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl shadow-navy/5 border border-white">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-6">
        <div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy uppercase tracking-tighter leading-none">
            Vocab <span className="text-sky">Growth</span>
          </h3>
          <p className="hidden md:flex text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
            Accumulative Learning Path
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy leading-none tracking-tighter">
            {data[23].words}
          </span>
          <div className="flex flex-col">
            <span className="text-emerald-500 font-black text-xs">+12%</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Total Words
            </span>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="h-55 sm:h-70 lg:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1c4d8d" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1c4d8d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="6 6"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
              interval="preserveStartEnd"
              dy={10}
            />

            <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />

            <Tooltip
              content={({ active, payload }) =>
                active &&
                payload?.[0] && (
                  <div className="bg-navy p-4 rounded-2xl shadow-2xl border border-white/10 text-white">
                    <p className="text-[8px] font-black uppercase text-sky tracking-widest mb-1">
                      Day {payload[0].payload.day}
                    </p>
                    <p className="text-lg sm:text-xl font-black">
                      {payload[0].value}{' '}
                      <small className="text-[10px] opacity-50">Words</small>
                    </p>
                  </div>
                )
              }
            />

            <Area
              type="monotone"
              dataKey="words"
              stroke="#1c4d8d"
              strokeWidth={5}
              fillOpacity={1}
              fill="url(#colorWords)"
              activeDot={{ r: 7, strokeWidth: 3, stroke: 'white' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
