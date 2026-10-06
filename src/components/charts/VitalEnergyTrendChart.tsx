import React, { useState } from 'react';
import { SessionRecord, InitialBaseline } from '../../types/coaching';

interface VitalEnergyTrendChartProps {
  baseline: InitialBaseline;
  sessions: SessionRecord[];
  finalEnergyScore?: number;
  height?: number;
}

export const VitalEnergyTrendChart: React.FC<VitalEnergyTrendChartProps> = ({
  baseline,
  sessions,
  finalEnergyScore,
  height = 240,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Compute baseline energy
  const baseScore = Number((
    (baseline.initialVitalDecisions.nutrition +
      baseline.initialVitalDecisions.exercise +
      baseline.initialVitalDecisions.rest) /
    3
  ).toFixed(1));

  // Build points series
  const dataPoints: {
    label: string;
    score: number;
    nutrition: number;
    exercise: number;
    rest: number;
    emotion: string;
    date: string;
  }[] = [
    {
      label: 'Inicio',
      score: baseScore,
      nutrition: baseline.initialVitalDecisions.nutrition,
      exercise: baseline.initialVitalDecisions.exercise,
      rest: baseline.initialVitalDecisions.rest,
      emotion: baseline.initialPredominantEmotion,
      date: 'Sesión 0',
    },
  ];

  sessions.forEach(s => {
    dataPoints.push({
      label: `S.${s.sessionNumber}`,
      score: s.vitalDecisions.vitalEnergyScore,
      nutrition: s.vitalDecisions.nutrition,
      exercise: s.vitalDecisions.exercise,
      rest: s.vitalDecisions.rest,
      emotion: s.emotionalManagement.predominantEmotion,
      date: s.date,
    });
  });

  if (finalEnergyScore !== undefined && finalEnergyScore !== null) {
    const last = dataPoints[dataPoints.length - 1];
    if (last.label !== `S.${sessions[sessions.length - 1]?.sessionNumber || 'Final'}`) {
      dataPoints.push({
        label: 'Cierre',
        score: finalEnergyScore,
        nutrition: 8.5,
        exercise: 8.0,
        rest: 8.5,
        emotion: 'Consolidada',
        date: 'Evaluación Final',
      });
    }
  }

  // Geometry
  const width = 600;
  const paddingLeft = 40;
  const paddingRight = 40;
  const paddingTop = 25;
  const paddingBottom = 40;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const minVal = 1;
  const maxVal = 10;

  const getX = (index: number) => {
    if (dataPoints.length === 1) return paddingLeft + innerWidth / 2;
    return paddingLeft + (index / (dataPoints.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    const normalized = (clamped - minVal) / (maxVal - minVal);
    return paddingTop + (1 - normalized) * innerHeight;
  };

  const pathPoints = dataPoints.map((dp, i) => `${getX(i)},${getY(dp.score)}`).join(' ');
  const areaPoints = `${getX(0)},${height - paddingBottom} ` +
    dataPoints.map((dp, i) => `${getX(i)},${getY(dp.score)}`).join(' ') +
    ` ${getX(dataPoints.length - 1)},${height - paddingBottom}`;

  // Threshold markers
  const yAgotamiento = getY(4);
  const yOptimo = getY(7.5);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[500px] h-auto select-none"
        >
          <defs>
            {/* Gradient fill under the trend line */}
            <linearGradient id="vitalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C38B3A" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#581420" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#581420" stopOpacity="0.0" />
            </linearGradient>

            {/* Threshold zones */}
            <linearGradient id="optimoZone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B705C" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#6B705C" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines */}
          {[2, 4, 6, 8, 10].map(val => (
            <g key={`grid-${val}`}>
              <line
                x1={paddingLeft}
                y1={getY(val)}
                x2={width - paddingRight}
                y2={getY(val)}
                stroke="#E8DFD3"
                strokeWidth="1"
                strokeDasharray={val === 4 || val === 8 ? '2 2' : 'none'}
              />
              <text
                x={paddingLeft - 8}
                y={getY(val) + 3}
                textAnchor="end"
                fontSize="10"
                fill="#8C8176"
                className="font-mono tabular-nums"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Optimal Vital Zone */}
          <rect
            x={paddingLeft}
            y={paddingTop}
            width={innerWidth}
            height={yOptimo - paddingTop}
            fill="url(#optimoZone)"
            rx="4"
          />

          {/* Threshold Label */}
          <text
            x={width - paddingRight - 8}
            y={yOptimo - 6}
            textAnchor="end"
            fontSize="9"
            fill="#6B705C"
            fontWeight="600"
            className="tracking-wider uppercase"
          >
            Zona de Alta Vitalidad (≥ 7.5)
          </text>
          <text
            x={width - paddingRight - 8}
            y={yAgotamiento + 12}
            textAnchor="end"
            fontSize="9"
            fill="#B95D55"
            fontWeight="600"
            className="tracking-wider uppercase"
          >
            Alerta de Drenaje / Agotamiento (≤ 4.0)
          </text>

          {/* Area Under Curve */}
          <polygon points={areaPoints} fill="url(#vitalGradient)" />

          {/* Trend Polyline */}
          <polyline
            points={pathPoints}
            fill="none"
            stroke="#581420"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secondary glowing line */}
          <polyline
            points={pathPoints}
            fill="none"
            stroke="#C38B3A"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {dataPoints.map((dp, i) => {
            const cx = getX(i);
            const cy = getY(dp.score);
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={`point-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Outer halo on hover */}
                {isHovered && (
                  <circle cx={cx} cy={cy} r="14" fill="#C38B3A" fillOpacity="0.25" />
                )}

                {/* Main point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 7 : 5}
                  fill={i === 0 ? '#C38B3A' : '#581420'}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />

                {/* Score text over point */}
                <text
                  x={cx}
                  y={cy - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#2B231F"
                  className="font-mono tabular-nums"
                >
                  {dp.score}
                </text>

                {/* Bottom X-axis label */}
                <text
                  x={cx}
                  y={height - paddingBottom + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={isHovered ? '700' : '500'}
                  fill={isHovered ? '#581420' : '#6A6057'}
                  className="font-sans"
                >
                  {dp.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip info for active hovered session point */}
      {hoveredIndex !== null && dataPoints[hoveredIndex] && (
        <div className="mt-2 bg-[#2B231F] text-white px-4 py-2 rounded-xl text-xs flex flex-wrap items-center justify-center gap-4 shadow-lg border border-[#C38B3A]/30 animate-in fade-in duration-150">
          <span className="font-serif font-bold text-[#E4B062]">
            {dataPoints[hoveredIndex].label} ({dataPoints[hoveredIndex].date})
          </span>
          <span className="text-white/80">
            Energía Vital: <b className="text-white font-mono">{dataPoints[hoveredIndex].score} / 10</b>
          </span>
          <span className="text-emerald-400">
            🥗 Nutrición: {dataPoints[hoveredIndex].nutrition}
          </span>
          <span className="text-amber-300">
            🏃 Ejercicio: {dataPoints[hoveredIndex].exercise}
          </span>
          <span className="text-indigo-300">
            💤 Descanso: {dataPoints[hoveredIndex].rest}
          </span>
          <span className="text-[#E0AC5E]">
            🎭 Emoción: {dataPoints[hoveredIndex].emotion}
          </span>
        </div>
      )}
    </div>
  );
};
