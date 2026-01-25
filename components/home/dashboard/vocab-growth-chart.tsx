'use client'

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { MOCK_CHART_DATA } from '@/lib/data'

export function VocabGrowthChart() {
  // Langsung gunakan data dari lib/data.ts
  const data = MOCK_CHART_DATA

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

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Angka Utama */}
          <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-navy leading-none tracking-tighter">
            {data[data.length - 1].words}
          </span>

          {/* Kontainer Info Samping */}
          <div className="flex flex-col justify-center border-l-2 border-slate-100 pl-4 py-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-black text-[10px] md:text-xs">
                +12%
              </span>
              <span className="text-[9px] font-bold text-navy uppercase tracking-widest whitespace-nowrap">
                vs last month
              </span>
            </div>

            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
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
                    <p className="text-[8px] md:text-[10px] font-black uppercase text-sky tracking-widest mb-1">
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
