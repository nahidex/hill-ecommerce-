import React from 'react';

interface LineChartSeries {
  label: string;
  color: string;
  values: number[];
}

interface MiniLineChartProps {
  categories: string[];
  series: LineChartSeries[];
  height?: number;
  formatValue?: (value: number) => string;
}

export const MiniLineChart: React.FC<MiniLineChartProps> = ({
  categories,
  series,
  height = 180,
  formatValue = (v) => v.toLocaleString()
}) => {
  const width = 100; // viewBox percentage width, scales with container
  const padding = { top: 10, bottom: 18, left: 0, right: 0 };
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = series.flatMap(s => s.values);
  const maxValue = Math.max(...allValues, 1);
  const minValue = Math.min(...allValues, 0);
  const range = maxValue - minValue || 1;

  const pointsFor = (values: number[]) =>
    values.map((v, i) => {
      const x = (i / (values.length - 1 || 1)) * width;
      const y = padding.top + chartHeight - ((v - minValue) / range) * chartHeight;
      return { x, y };
    });

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
      >
        {/* Horizontal gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={0}
            x2={width}
            y1={padding.top + chartHeight * f}
            y2={padding.top + chartHeight * f}
            stroke="#e7e5e4"
            strokeWidth={0.4}
          />
        ))}

        {series.map((s) => {
          const points = pointsFor(s.values);
          const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
          const areaPath = `${linePath} L${points[points.length - 1].x},${padding.top + chartHeight} L${points[0].x},${padding.top + chartHeight} Z`;

          return (
            <g key={s.label}>
              <path d={areaPath} fill={s.color} opacity={0.08} />
              <path d={linePath} fill="none" stroke={s.color} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={1.6} fill={s.color} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          );
        })}
      </svg>

      <div className="flex justify-between text-[10px] text-stone-400 mt-1 px-0.5">
        {categories.map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs flex-wrap">
        {series.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }}></span>
            <span className="text-stone-600 font-medium">{s.label}</span>
            <span className="font-bold text-stone-900 tabular-nums">
              {formatValue(s.values[s.values.length - 1])}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
