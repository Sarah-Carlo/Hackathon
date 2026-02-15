'use client'

import { School, Target, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { Recommendation } from '@/lib/university-data'

interface StatsOverviewProps {
  recommendations: Recommendation[]
}

export function StatsOverview({ recommendations }: StatsOverviewProps) {
  const avgProbability =
    Math.round(
      recommendations.reduce((sum, r) => sum + r.admissionProbability, 0) /
        recommendations.length
    )

  const bestMatch = recommendations[0]
  const bestRoi = [...recommendations].sort((a, b) => b.estimatedRoi - a.estimatedRoi)[0]
  const lowestCost = [...recommendations].sort(
    (a, b) => a.estimatedTotalCost - b.estimatedTotalCost
  )[0]

  const stats = [
    {
      label: 'Best Match',
      value: bestMatch.university.logoInitials,
      sublabel: `${bestMatch.matchScore}% match`,
      icon: Target,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Avg. Admission',
      value: `${avgProbability}%`,
      sublabel: `Across ${recommendations.length} universities`,
      icon: School,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Highest ROI',
      value: `${bestRoi.estimatedRoi}%`,
      sublabel: bestRoi.university.logoInitials,
      icon: TrendingUp,
      color: 'text-chart-3',
      bg: 'bg-chart-3/10',
    },
    {
      label: 'Most Affordable',
      value: `$${(lowestCost.estimatedTotalCost / 1000).toFixed(0)}k`,
      sublabel: lowestCost.university.logoInitials,
      icon: DollarSign,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/60 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
              <span className="font-heading text-lg font-bold leading-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground">{stat.sublabel}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
