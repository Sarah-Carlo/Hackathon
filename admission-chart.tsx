'use client'

import { BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { Recommendation } from '@/lib/university-data'

interface AdmissionChartProps {
  recommendations: Recommendation[]
}

export function AdmissionChart({ recommendations }: AdmissionChartProps) {
  const data = recommendations.map((rec) => ({
    name:
      rec.university.name.length > 20
        ? rec.university.logoInitials
        : rec.university.name.split(' ').slice(0, 2).join(' '),
    fullName: rec.university.name,
    probability: rec.admissionProbability,
  }))

  function getBarColor(value: number): string {
    if (value >= 70) return 'hsl(160, 70%, 42%)'
    if (value >= 40) return 'hsl(35, 92%, 52%)'
    return 'hsl(0, 84%, 60%)'
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-xl text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          Admission Probability
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your estimated chance of admission at each university.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220, 16%, 88%)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: 'hsl(220, 10%, 46%)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: 'hsl(220, 10%, 46%)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(220, 16%, 93%)', opacity: 0.5 }}
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 16%, 88%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [`${value}%`, 'Probability']}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    const item = payload[0].payload as { fullName: string }
                    return item.fullName
                  }
                  return label
                }}
              />
              <Bar dataKey="probability" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.probability)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-[10px] text-muted-foreground">{'High (70%+)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-chart-3" />
            <span className="text-[10px] text-muted-foreground">{'Medium (40-69%)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <span className="text-[10px] text-muted-foreground">{'Low (<40%)'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
