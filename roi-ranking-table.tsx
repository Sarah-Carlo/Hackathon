'use client'

import { TrendingUp, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import type { Recommendation } from '@/lib/university-data'

interface RoiRankingTableProps {
  recommendations: Recommendation[]
}

export function RoiRankingTable({ recommendations }: RoiRankingTableProps) {
  const sorted = [...recommendations].sort((a, b) => b.roiScore - a.roiScore)
  const maxRoi = Math.max(...sorted.map((r) => r.estimatedRoi))

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-xl text-foreground">
          <TrendingUp className="h-5 w-5 text-accent" />
          ROI Ranking
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Universities ranked by return on investment over 5 years.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="w-10 text-xs font-semibold text-muted-foreground">
                  #
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">
                  University
                </TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground">
                  Total Cost
                </TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground">
                  Avg. Salary
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">
                  ROI (5yr)
                </TableHead>
                <TableHead className="text-right text-xs font-semibold text-muted-foreground">
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((rec, i) => (
                <TableRow
                  key={rec.university.name}
                  className="border-border/40 transition-colors hover:bg-muted/50"
                >
                  <TableCell className="py-3 text-sm font-semibold text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                        {rec.university.logoInitials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {rec.university.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {rec.university.country}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-right text-sm text-foreground">
                    ${rec.estimatedTotalCost.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-3 text-right text-sm text-foreground">
                    ${rec.university.avgSalaryAfterGrad.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(rec.estimatedRoi / maxRoi) * 100}
                        className="h-2 w-20 bg-muted"
                      />
                      <span className="flex items-center gap-0.5 text-xs font-semibold text-accent">
                        <ArrowUpRight className="h-3 w-3" />
                        {rec.estimatedRoi}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      {rec.roiScore}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
