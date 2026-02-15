'use client'

import { useState } from 'react'
import { GraduationCap, Globe, DollarSign, Target, BookOpen, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { StudentProfile } from '@/lib/university-data'

interface StudentFormProps {
  onAnalyze: (profile: StudentProfile) => void
  isLoading: boolean
}

export function StudentForm({ onAnalyze, isLoading }: StudentFormProps) {
  const [cgpa, setCgpa] = useState('')
  const [ielts, setIelts] = useState('')
  const [budget, setBudget] = useState('')
  const [country, setCountry] = useState('')
  const [careerGoals, setCareerGoals] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    const cgpaNum = parseFloat(cgpa)
    if (!cgpa || isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 4.0) {
      newErrors.cgpa = 'Enter a valid CGPA (0.0 - 4.0)'
    }

    const ieltsNum = parseFloat(ielts)
    if (!ielts || isNaN(ieltsNum) || ieltsNum < 0 || ieltsNum > 9.0) {
      newErrors.ielts = 'Enter a valid IELTS score (0.0 - 9.0)'
    }

    const budgetNum = parseFloat(budget)
    if (!budget || isNaN(budgetNum) || budgetNum <= 0) {
      newErrors.budget = 'Enter a valid budget amount'
    }

    if (!country) {
      newErrors.country = 'Select a country preference'
    }

    if (!careerGoals.trim()) {
      newErrors.careerGoals = 'Describe your career goals'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    onAnalyze({
      cgpa: parseFloat(cgpa),
      ielts: parseFloat(ielts),
      budget: parseFloat(budget),
      country,
      careerGoals,
    })
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-heading text-xl text-foreground">
          <BookOpen className="h-5 w-5 text-primary" />
          Student Profile
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your academic details to get personalized university recommendations.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* CGPA */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="cgpa"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <GraduationCap className="h-4 w-4 text-primary" />
                CGPA
              </Label>
              <Input
                id="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                placeholder="e.g. 3.75"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className={errors.cgpa ? 'border-destructive' : ''}
              />
              {errors.cgpa && (
                <p className="text-xs text-destructive">{errors.cgpa}</p>
              )}
            </div>

            {/* IELTS */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="ielts"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <Globe className="h-4 w-4 text-primary" />
                IELTS Score
              </Label>
              <Input
                id="ielts"
                type="number"
                step="0.5"
                min="0"
                max="9"
                placeholder="e.g. 7.0"
                value={ielts}
                onChange={(e) => setIelts(e.target.value)}
                className={errors.ielts ? 'border-destructive' : ''}
              />
              {errors.ielts && (
                <p className="text-xs text-destructive">{errors.ielts}</p>
              )}
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="budget"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <DollarSign className="h-4 w-4 text-primary" />
                Total Budget (USD)
              </Label>
              <Input
                id="budget"
                type="number"
                step="1000"
                min="0"
                placeholder="e.g. 80000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={errors.budget ? 'border-destructive' : ''}
              />
              {errors.budget && (
                <p className="text-xs text-destructive">{errors.budget}</p>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Target className="h-4 w-4 text-primary" />
                Country Preference
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Country</SelectItem>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Netherlands">Netherlands</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-xs text-destructive">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Career Goals */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="career"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Career Goals
            </Label>
            <Textarea
              id="career"
              placeholder="Describe your career aspirations, e.g. 'I want to become a software engineer specializing in AI and machine learning...'"
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              className={`min-h-[80px] resize-none ${errors.careerGoals ? 'border-destructive' : ''}`}
            />
            {errors.careerGoals && (
              <p className="text-xs text-destructive">{errors.careerGoals}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-auto md:self-end"
          >
            {isLoading ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Profile
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
