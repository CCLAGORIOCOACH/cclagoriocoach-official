import React, { useState } from 'react';

interface EmotionSlice {
  emotion: string;
  count: number;
  percentage: number;
}

interface EmotionsDonutChartProps {
  distribution: EmotionSlice[];
  size?: number;
}

const EMOTION_COLORS = [
  '#581420', // Borgoña
  '#C38B3A', // Dorado
  '#6B705C', // Verde Oliva
  '#8C3A49', // Rosa vino
  '#3E5C59', // Azul verdoso
  '#8E6C3A', // Ocre
  '#7A5266', // Malva
  '#4A5568', // Gris pizarra
];

export const EmotionsDonutChart: React.FC<EmotionsDonutChartProps> = ({
  distribution,
  size = 260,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!distribution || distribution.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-xs text-[#8C8176]">
        Sin registros de emociones suficientes
      </div>
    );
  }

  const center = size / 2;
  const radius = size * 0.38;
  const strokeWidth = size * 0.16;

  // Circumference
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      {/* SVG Donut */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
          {/* Base background ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#EFE8DE"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {distribution.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += item.percentage;
            const color = EMOTION_COLORS[index % EMOTION_COLORS.length];
            const isHovered = hoveredIdx === index;

            return (
              <circle
                key={item.emotion}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer transition-all duration-200"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#6B705C]">
            {hoveredIdx !== null ? 'Frecuencia' : 'Total'}
          </span>
          <span className="text-xl font-bold font-serif text-[#581420]">
            {hoveredIdx !== null
              ? `${distribution[hoveredIdx].percentage}%`
              : `${distribution.reduce((acc, d) => acc + d.count, 0)} Reg.`}
          </span>
          <span className="text-[11px] font-medium text-[#2B231F] truncate max-w-[100px]">
            {hoveredIdx !== null ? distribution[hoveredIdx].emotion : 'Emociones'}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-1.5 w-full max-w-[220px]">
        {distribution.map((item, index) => {
          const color = EMOTION_COLORS[index % EMOTION_COLORS.length];
          const isHovered = hoveredIdx === index;
          return (
            <div
              key={item.emotion}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between text-xs p-1.5 rounded-lg cursor-pointer transition-colors ${
                isHovered ? 'bg-[#C38B3A]/15 font-semibold' : 'hover:bg-[#EFE8DE]/60'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate text-[#2B231F]">{item.emotion}</span>
              </div>
              <span className="font-mono text-[#581420] tabular-nums font-semibold shrink-0 ml-2">
                {item.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
