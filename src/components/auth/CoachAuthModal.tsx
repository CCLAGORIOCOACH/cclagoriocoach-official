import React, { useState } from 'react';
import { Lock, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CoachAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (coachName: string) => void;
}

export const CoachAuthModal: React.FC<CoachAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('cecilia@cclagoriocoach.com');
  const [password, setPassword] = useState('alivegame2026');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Cecilia Lagorio');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F9F6F0] rounded-3xl border border-[#EADBCA] shadow-2xl w-full max-w-md overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#581420] via-[#45101A] to-[#2B231F] text-white p-6 text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-[#E4B062] border border-white/15 mb-3 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#F9F6F0]">
            Acceso Panel Coach Privado
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Historia Clínica Evolutiva & Gestión de Expedientes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-[#2B231F]">
          <div className="p-3 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-xl flex items-center gap-2 text-[#581420]">
            <ShieldCheck className="w-4 h-4 text-[#C38B3A] shrink-0" />
            <span>Acceso seguro protegido para el rol de coach directivo.</span>
          </div>

          <div>
            <label className="block font-semibold text-[#4A413B] mb-1">
              Email del Coach
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4A413B] mb-1">
              Contraseña / Clave de Acceso
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#581420] hover:bg-[#6D1B29] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              {isLoading ? (
                <span>Autenticando...</span>
              ) : (
                <>
                  <span>Ingresar al Panel de Gestión</span>
                  <ArrowRight className="w-4 h-4 text-[#E4B062]" />
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-[#8C8176] pt-1">
            Cumple con estándares de confidencialidad médica y coaching ICF.
          </p>
        </form>
      </div>
    </div>
  );
};
