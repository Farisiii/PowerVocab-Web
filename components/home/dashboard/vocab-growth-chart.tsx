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
  const data = MOCK_CHART_DATA

  return (
    <div className="relative rounded-[3rem] overflow-hidden border-4 border-white/50 shadow-glass">
      {/* Glass Layers */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-br from-sky/5 to-blue/5" />
      </div>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
      <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.08)]" />

      <div className="relative z-10 p-6 sm:p-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy uppercase tracking-tighter leading-none">
              Vocab <span className="text-sky">Growth</span>
            </h3>
            <p className="hidden md:flex text-[9px] sm:text-[10px] font-bold text-navy/50 uppercase tracking-[0.4em]">
              Accumulative Learning Path
            </p>
          </div>

          <div className="flex items-center w-full md:w-auto justify-end md:justify-start lg:gap-6">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-linear-to-br from-navy via-blue to-sky pr-0.5">
              1900
            </span>

            <div className="flex flex-col justify-center pl-4 py-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500/15 text-emerald-600 px-2 py-0.5 rounded-full font-black text-[10px] md:text-xs">
                  +12%
                </span>
                <span className="text-[9px] font-bold text-navy uppercase tracking-widest whitespace-nowrap">
                  vs last month
                </span>
              </div>

              <span className="text-[11px] font-black text-navy/50 uppercase tracking-[0.2em] leading-none">
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
              margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1c4d8d" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#1c4d8d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 6"
                vertical={false}
                stroke="#E2E8F0"
                opacity={0.6}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }}
                interval="preserveStartEnd"
                dy={10}
              />

              <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />

              <Tooltip
                content={({ active, payload }) =>
                  active &&
                  payload?.[0] && (
                    <div className="bg-navy/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/10 text-white">
                      <p className="text-[9px] font-black uppercase text-sky tracking-widest mb-1">
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
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorWords)"
                activeDot={{
                  r: 8,
                  strokeWidth: 3,
                  stroke: '#ffffff',
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
