'use client'

/**
 * 图表组件
 *
 * 使用 recharts 渲染图表，支持的数据格式：
 * ```chart
 * {"type": "bar", "title": "销售数据", "labels": ["Q1", "Q2", "Q3", "Q4"], "values": [65, 59, 80, 81]}
 * ```
 *
 * 支持的图表类型：bar（柱状图）、line（折线图）
 *
 * 注意：recharts 体积较大（50MB+），使用动态导入以减小 Serverless Function 体积
 */

import { useMemo, useState, useEffect } from 'react'
import type { MediaBlockProps } from './registry'

interface ChartData {
  type: 'bar' | 'line'
  title?: string
  labels: string[]
  values: number[]
}

interface ChartComponents {
  BarChart: React.ComponentType<{ data: unknown[]; children?: React.ReactNode }>
  Bar: React.ComponentType<{ dataKey: string; fill?: string; radius?: number[] }>
  LineChart: React.ComponentType<{ data: unknown[]; children?: React.ReactNode }>
  Line: React.ComponentType<{ type?: string; dataKey: string; stroke?: string; strokeWidth?: number; dot?: unknown }>
  XAxis: React.ComponentType<{ dataKey: string; tick?: unknown; className?: string }>
  YAxis: React.ComponentType<{ tick?: unknown; className?: string }>
  CartesianGrid: React.ComponentType<{ strokeDasharray?: string; className?: string }>
  Tooltip: React.ComponentType<{ contentStyle?: React.CSSProperties; labelStyle?: React.CSSProperties; formatter?: (value: number) => [number, string] }>
  ResponsiveContainer: React.ComponentType<{ width: string; height: number; children: React.ReactNode }>
}

// 动态加载 recharts（recharts 体积 50MB+，必须按需加载）
function useRecharts() {
  const [components, setComponents] = useState<ChartComponents | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      import('recharts').then(m => ({
        BarChart: m.BarChart,
        Bar: m.Bar,
        LineChart: m.LineChart,
        Line: m.Line,
        XAxis: m.XAxis,
        YAxis: m.YAxis,
        CartesianGrid: m.CartesianGrid,
        Tooltip: m.Tooltip,
        ResponsiveContainer: m.ResponsiveContainer,
      })),
    ]).then(c => {
      setComponents(c[0])
      setIsLoading(false)
    })
  }, [])

  return { components, isLoading }
}

export function ChartBlock({ data, isStreaming }: MediaBlockProps) {
  const { components: Chart, isLoading } = useRecharts()
  const chartData = useMemo(() => {
    try {
      return JSON.parse(data) as ChartData
    } catch {
      return null
    }
  }, [data])

  // 转换为 recharts 格式
  const formattedData = useMemo(() => {
    if (!chartData) return []
    if (!Array.isArray(chartData.labels) || !Array.isArray(chartData.values)) {
      return []
    }
    return chartData.labels.map((label, index) => ({
      name: label,
      value: chartData.values[index] ?? 0,
    }))
  }, [chartData])

  // 检查数据是否有效
  const isValidData = chartData
    && Array.isArray(chartData.labels)
    && Array.isArray(chartData.values)
    && chartData.labels.length > 0
    && chartData.values.length > 0

  // 流式传输中或数据无效时显示加载状态
  if (!isValidData) {
    if (isStreaming || isLoading) {
      return (
        <div className="my-4 overflow-hidden rounded-xl border bg-card">
          <div className="border-b bg-muted/30 px-4 py-2">
            <span className="text-sm font-medium text-muted-foreground">图表</span>
          </div>
          <div className="flex h-[250px] items-center justify-center">
            <div className="text-sm text-muted-foreground">加载中...</div>
          </div>
        </div>
      )
    }
    return (
      <div className="my-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <span className="text-sm text-destructive">无法解析图表数据</span>
      </div>
    )
  }

  if (!Chart) {
    return (
      <div className="my-4 overflow-hidden rounded-xl border bg-card">
        <div className="border-b bg-muted/30 px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">图表</span>
        </div>
        <div className="flex h-[250px] items-center justify-center">
          <div className="text-sm text-muted-foreground">加载中...</div>
        </div>
      </div>
    )
  }

  const chartType = chartData.type || 'bar'
  const supportedTypes = ['bar', 'line']

  if (!supportedTypes.includes(chartType)) {
    return (
      <div className="my-4 overflow-hidden rounded-xl border bg-amber-50 dark:bg-amber-950/30">
        <div className="border-b border-amber-200 dark:border-amber-800 bg-amber-100/50 dark:bg-amber-900/30 px-4 py-2">
          <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
            暂不支持的图表类型
          </span>
        </div>
        <div className="p-4">
          <p className="text-sm text-amber-600 dark:text-amber-400">
            暂不支持 <code className="px-1 py-0.5 bg-amber-100 dark:bg-amber-900 rounded">{chartType}</code> 类型图表
          </p>
          <p className="text-sm text-amber-500 dark:text-amber-500 mt-1">
            目前仅支持柱状图（bar）和折线图（line）
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border bg-card">
      {chartData.title && (
        <div className="border-b bg-muted/30 px-4 py-2">
          <span className="text-sm font-medium text-black">{chartData.title}</span>
        </div>
      )}
      <div className="p-4">
        <Chart.ResponsiveContainer width="100%" height={250}>
          {chartType === 'line' ? (
            <Chart.LineChart data={formattedData}>
              <Chart.CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <Chart.XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Chart.YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Chart.Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [value, '数值']}
              />
              <Chart.Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
            </Chart.LineChart>
          ) : (
            <Chart.BarChart data={formattedData}>
              <Chart.CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <Chart.XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Chart.YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Chart.Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [value, '数值']}
              />
              <Chart.Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </Chart.BarChart>
          )}
        </Chart.ResponsiveContainer>
      </div>
    </div>
  )
}
