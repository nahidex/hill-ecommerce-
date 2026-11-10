import React from 'react';

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface MiniDonutChartProps {
  data: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
}

export const MiniDonutChart: React.FC<MiniDonutChartProps> = ({
  data,
  size = 140,
  strokeWidth = 16,
  centerLabel,
  centerValue
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let cumulativeOffset = 0;

  return (
    <div className="flex items-center gap-5 flex-wrap">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f5f5f4"
            strokeWidth={strokeWidth}
          />
          {data.map((d, i) => {
            const segmentLength = (d.value / total) * circumference;
            const dashArray = `${segmentLength} ${circumference - segmentLength}`;
            const dashOffset = -cumulativeOffset;
            cumulativeOffset += segmentLength;

            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>

        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && <span className="text-lg font-bold text-stone-900 tabular-nums">{centerValue}</span>}
            {centerLabel && <span className="text-[10px] text-stone-500 text-center px-2">{centerLabel}</span>}
          </div>
        )}
      </div>

      <div className="space-y-2 text-xs flex-1 min-w-[140px]">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-stone-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
              <span>{d.label}</span>
            </span>
            <span className="font-bold text-stone-900 tabular-nums shrink-0">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
