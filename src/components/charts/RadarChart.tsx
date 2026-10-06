import React, { useState } from 'react';
import { LIFE_AREAS, LifeAreaKey } from '../../types/coaching';

interface RadarChartProps {
  initialData: Record<LifeAreaKey, number>;
  currentData?: Record<LifeAreaKey, number>;
  initialLabel?: string;
  currentLabel?: string;
  size?: number;
  showLegend?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  initialData,
  currentData,
  initialLabel = 'Punto de Partida',
  currentLabel = 'Evolución Actual / Final',
  size = 360,
  showLegend = true,
}) => {
  const [hoveredArea, setHoveredArea] = useState<LifeAreaKey | null>(null);

  const center = size / 2;
  const radius = size * 0.38;
  const totalSides = LIFE_AREAS.length;
  const angleStep = (Math.PI * 2) / totalSides;
  // Rotate so first area is at the top
  const startAngle = -Math.PI / 2;

  // Levels for the radar grid (2, 4, 6, 8, 10)
  const levels = [2, 4, 6, 8, 10];

  const getCoordinates = (value: number, index: number) => {
    const angle = startAngle + index * angleStep;
    const distance = (value / 10) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  const initialPoints = LIFE_AREAS.map((area, i) => {
    const val = initialData[area.key] ?? 5;
    return getCoordinates(val, i);
  });

  const currentPoints = currentData
    ? LIFE_AREAS.map((area, i) => {
        const val = currentData[area.key] ?? 5;
        return getCoordinates(val, i);
      })
    : null;

  const initialPathString =
    initialPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const currentPathString = currentPoints
    ? currentPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
    : null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible select-none"
        >
          {/* Background web circles / polygons */}
          {levels.map(level => {
            const levelPoints = LIFE_AREAS.map((_, i) => getCoordinates(level, i));
            const polyPath =
              levelPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
            return (
              <g key={`level-${level}`}>
                <path
                  d={polyPath}
                  fill="none"
                  stroke="#E4DACD"
                  strokeWidth="1"
                  strokeDasharray={level === 10 ? 'none' : '3 3'}
                />
                {/* Level label */}
                <text
                  x={center + 4}
                  y={center - (level / 10) * radius + 3}
                  fontSize="9"
                  fill="#8A8077"
                  className="font-mono select-none"
                >
                  {level}
                </text>
              </g>
            );
          })}

          {/* Spokes (axis lines from center to perimeter) */}
          {LIFE_AREAS.map((area, i) => {
            const end = getCoordinates(10, i);
            const isHovered = hoveredArea === area.key;
            return (
              <line
                key={`spoke-${area.key}`}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke={isHovered ? '#C38B3A' : '#E0D5C7'}
                strokeWidth={isHovered ? '2' : '1'}
              />
            );
          })}

          {/* Initial Data Polygon (Dorado sutil) */}
          <path
            d={initialPathString}
            fill="#C38B3A"
            fillOpacity="0.22"
            stroke="#C38B3A"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Current / Final Data Polygon (Borgoña intenso) */}
          {currentPathString && (
            <path
              d={currentPathString}
              fill="#581420"
              fillOpacity="0.35"
              stroke="#581420"
              strokeWidth="2.5"
            />
          )}

          {/* Interactive points & hover anchors */}
          {LIFE_AREAS.map((area, i) => {
            const initP = initialPoints[i];
            const curP = currentPoints ? currentPoints[i] : null;
            const isHovered = hoveredArea === area.key;

            return (
              <g
                key={`points-${area.key}`}
                onMouseEnter={() => setHoveredArea(area.key)}
                onMouseLeave={() => setHoveredArea(null)}
                className="cursor-pointer transition-all duration-150"
              >
                {/* Initial Point */}
                <circle
                  cx={initP.x}
                  cy={initP.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#C38B3A"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* Current Point */}
                {curP && (
                  <circle
                    cx={curP.x}
                    cy={curP.y}
                    r={isHovered ? 6.5 : 5}
                    fill="#581420"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}

          {/* Area Labels surrounding the radar */}
          {LIFE_AREAS.map((area, i) => {
            const angle = startAngle + i * angleStep;
            const labelDistance = radius + 24;
            const x = center + labelDistance * Math.cos(angle);
            const y = center + labelDistance * Math.sin(angle);
            const isHovered = hoveredArea === area.key;

            // Anchor logic
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (Math.cos(angle) > 0.25) textAnchor = 'start';
            else if (Math.cos(angle) < -0.25) textAnchor = 'end';

            const initVal = initialData[area.key] ?? 0;
            const curVal = currentData ? currentData[area.key] ?? 0 : null;

            return (
              <g
                key={`label-${area.key}`}
                onMouseEnter={() => setHoveredArea(area.key)}
                onMouseLeave={() => setHoveredArea(null)}
                className="cursor-pointer"
              >
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  fontSize="11"
                  fontWeight={isHovered ? '700' : '600'}
                  fill={isHovered ? '#581420' : '#4A413B'}
                  className="font-sans transition-colors duration-150"
                >
                  {area.shortLabel}
                </text>
                {/* Small indicator value badge */}
                <text
                  x={x}
                  y={y + 13}
                  textAnchor={textAnchor}
                  fontSize="10"
                  fill="#8A8077"
                  className="font-mono tabular-nums"
                >
                  {curVal !== null ? `${initVal} → ${curVal}` : `${initVal}/10`}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredArea && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-[#2B231F]/90 text-white backdrop-blur-md px-3 py-2 rounded-xl text-center shadow-xl border border-white/10 z-20 min-w-[150px]">
            <p className="text-xs font-serif font-bold text-[#E4B062]">
              {LIFE_AREAS.find(a => a.key === hoveredArea)?.label}
            </p>
            <div className="mt-1 flex items-center justify-center gap-3 text-xs font-mono">
              <span className="text-[#E0AC5E]">Inicio: {initialData[hoveredArea] ?? 0}</span>
              {currentData && (
                <span className="text-emerald-400 font-bold">
                  Hoy: {currentData[hoveredArea] ?? 0}
                </span>
              )}
            </div>
            {currentData && (
              <p className="text-[10px] text-white/70 mt-1">
                Variación:{' '}
                {(((currentData[hoveredArea] ?? 0) - (initialData[hoveredArea] ?? 0)) >= 0 ? '+' : '')}
                {((currentData[hoveredArea] ?? 0) - (initialData[hoveredArea] ?? 0)).toFixed(1)} pts
              </p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-medium text-[#4A413B]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#C38B3A]/30 border-2 border-[#C38B3A]" />
            <span>{initialLabel}</span>
          </div>
          {currentData && (
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#581420]/40 border-2 border-[#581420]" />
              <span>{currentLabel}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
