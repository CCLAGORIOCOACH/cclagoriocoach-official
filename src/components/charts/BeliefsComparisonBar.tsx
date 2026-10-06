import React from 'react';
import { LIFE_AREAS, LifeAreaKey, AreaBelief } from '../../types/coaching';

interface BeliefsComparisonBarProps {
  initialBeliefs: Record<LifeAreaKey, AreaBelief>;
  currentEmpoweredSnapshots?: Record<LifeAreaKey, number>;
  title?: string;
  showSnippets?: boolean;
}

export const BeliefsComparisonBar: React.FC<BeliefsComparisonBarProps> = ({
  initialBeliefs,
  currentEmpoweredSnapshots,
  title = 'Evolución de Creencias: Limitantes vs Empoderadas',
  showSnippets = true,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between border-b border-[#EADFCF] pb-2">
        <h4 className="text-sm font-serif font-bold text-[#581420]">{title}</h4>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#8C3A49]" />
            <span className="text-[#6A6057]">Limitantes (%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#C38B3A]" />
            <span className="text-[#6A6057]">Empoderadas Inicio (%)</span>
          </div>
          {currentEmpoweredSnapshots && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#6B705C]" />
              <span className="text-[#581420] font-semibold">Empoderadas Hoy (%)</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {LIFE_AREAS.map(area => {
          const belief = initialBeliefs[area.key] || {
            limitingPercentage: 60,
            empoweredPercentage: 40,
            limitingBeliefSnippet: '',
            empoweredBeliefSnippet: '',
          };

          const curEmpowered = currentEmpoweredSnapshots
            ? (currentEmpoweredSnapshots[area.key] ?? belief.empoweredPercentage)
            : null;

          const delta = curEmpowered !== null ? curEmpowered - belief.empoweredPercentage : 0;

          return (
            <div
              key={area.key}
              className="p-3 bg-white/70 rounded-xl border border-[#EADBCA] hover:border-[#C38B3A]/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#2B231F] flex items-center gap-2">
                  <span>{area.label}</span>
                </span>
                <div className="flex items-center gap-3 font-mono tabular-nums text-[11px]">
                  <span className="text-[#8C3A49]">Lim: {belief.limitingPercentage}%</span>
                  <span className="text-[#C38B3A]">Emp. Inicio: {belief.empoweredPercentage}%</span>
                  {curEmpowered !== null && (
                    <span className="font-bold text-[#6B705C] bg-[#6B705C]/10 px-2 py-0.5 rounded-md">
                      Emp. Hoy: {curEmpowered}% ({delta >= 0 ? `+${delta}` : delta}%)
                    </span>
                  )}
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="w-full h-3 rounded-full bg-[#EADFCF] overflow-hidden flex">
                {/* Limiting segment */}
                <div
                  style={{ width: `${belief.limitingPercentage}%` }}
                  className="bg-[#8C3A49] transition-all duration-300"
                  title={`Limitante inicial: ${belief.limitingPercentage}%`}
                />
                {/* Empowered segment */}
                <div
                  style={{ width: `${belief.empoweredPercentage}%` }}
                  className="bg-[#C38B3A] transition-all duration-300"
                  title={`Empoderada inicial: ${belief.empoweredPercentage}%`}
                />
              </div>

              {/* Current Progress bar if updated */}
              {curEmpowered !== null && (
                <div className="mt-1 w-full flex items-center gap-2">
                  <span className="text-[10px] text-[#6A6057] font-medium w-16 shrink-0">
                    Estado Actual:
                  </span>
                  <div className="w-full h-2 rounded-full bg-[#EADFCF] overflow-hidden flex">
                    <div
                      style={{ width: `${100 - curEmpowered}%` }}
                      className="bg-[#8C3A49]/40"
                    />
                    <div
                      style={{ width: `${curEmpowered}%` }}
                      className="bg-[#6B705C] transition-all duration-500"
                    />
                  </div>
                </div>
              )}

              {/* Belief snippets if available */}
              {showSnippets && (belief.limitingBeliefSnippet || belief.empoweredBeliefSnippet) && (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1.5 border-t border-[#F2EDE4]">
                  {belief.limitingBeliefSnippet && (
                    <div className="text-[#7D3442] bg-[#7D3442]/5 p-2 rounded-lg">
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-[#7D3442]">
                        Creencia Limitante Detectada:
                      </span>
                      "{belief.limitingBeliefSnippet}"
                    </div>
                  )}
                  {belief.empoweredBeliefSnippet && (
                    <div className="text-[#3A5333] bg-[#6B705C]/10 p-2 rounded-lg">
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-[#4D5A3C]">
                        Creencia Empoderada Neuroplástica:
                      </span>
                      "{belief.empoweredBeliefSnippet}"
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
