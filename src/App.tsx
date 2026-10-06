import React, { useState, useEffect } from 'react';
import { ClientRecord, PublicAggregatedMetrics, SessionRecord, FinalEvaluation } from './types/coaching';
import { apiService } from './services/api';
import { INITIAL_MOCK_CLIENTS, computeAggregatedMetrics } from './data/mockClients';
import { CoachDashboard } from './components/coach/CoachDashboard';
import { ClientDetailView } from './components/coach/ClientDetailView';
import { PublicLandingDashboard } from './components/public/PublicLandingDashboard';
import { LandingPage } from './components/public/LandingPage';
import { NewClientModal } from './components/modals/NewClientModal';
import { AddSessionModal } from './components/modals/AddSessionModal';
import { FinalizeClientModal } from './components/modals/FinalizeClientModal';
import { CoachAuthModal } from './components/auth/CoachAuthModal';
import { LiveSessionGuideModal } from './components/coach/LiveSessionGuideModal';
import { InteractiveClinicalTestsModal } from './components/coach/InteractiveClinicalTestsModal';
import ccPerfilImg from './assets/images/cc_perfil.png';
import {
  Sparkles,
  Users,
  Globe,
  Plus,
  ShieldCheck,
  Lock,
  Unlock,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  // Determine mode based on URL path or search parameters
  // /admin -> Coach Portal (Historial de Pacientes)
  // / -> Public Landing Page + Vitrina
  // ?embed=true -> iframe embed mode
  const getInitialMode = (): 'coach' | 'public' | 'embed' => {
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('embed') === 'true' || urlParams.get('mode') === 'embed') {
      return 'embed';
    }
    if (
      pathname.startsWith('/admin') ||
      urlParams.get('mode') === 'admin' ||
      urlParams.get('mode') === 'coach'
    ) {
      return 'coach';
    }
    return 'public';
  };

  const [viewMode, setViewMode] = useState<'coach' | 'public' | 'embed'>(getInitialMode);
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_MOCK_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<PublicAggregatedMetrics>(() => computeAggregatedMetrics(INITIAL_MOCK_CLIENTS));
  const [isCoachAuthenticated, setIsCoachAuthenticated] = useState<boolean>(true);

  // Sync route navigation with browser history
  const navigateTo = (mode: 'coach' | 'public' | 'embed') => {
    setViewMode(mode);
    if (mode === 'coach') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState({}, '', '/admin');
      }
    } else if (mode === 'embed') {
      window.history.pushState({}, '', '/?mode=public&embed=true');
    } else {
      setSelectedClientId(null);
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  // Listen to popstate (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setViewMode(getInitialMode());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Modals state
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isFinalizeOpen, setIsFinalizeOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLiveGuideOpen, setIsLiveGuideOpen] = useState(false);
  const [liveGuideTargetSession, setLiveGuideTargetSession] = useState(1);
  const [isClinicalTestsModalOpen, setIsClinicalTestsModalOpen] = useState(false);

  // Initial load from API / localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const loadedClients = await apiService.getClients();
        if (loadedClients && loadedClients.length > 0) {
          setClients(loadedClients);
          setMetrics(computeAggregatedMetrics(loadedClients));
        }
      } catch (err) {
        console.warn('Using initial seed data:', err);
      }
    }
    loadData();
  }, []);

  // Update metrics whenever clients change
  useEffect(() => {
    setMetrics(computeAggregatedMetrics(clients));
  }, [clients]);

  // Selected client object
  const selectedClient = clients.find(c => c.id === selectedClientId) || null;

  // Handlers
  const handleSaveNewClient = async (newClient: ClientRecord) => {
    const saved = await apiService.saveClient(newClient);
    setClients(prev => [saved, ...prev.filter(c => c.id !== saved.id)]);
    setSelectedClientId(saved.id);
  };

  const handleSaveSession = async (session: SessionRecord) => {
    if (!selectedClientId) return;
    const updated = await apiService.addSession(selectedClientId, session);
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleStartLiveGuide = (sessionNumber: number) => {
    setLiveGuideTargetSession(sessionNumber);
    setIsLiveGuideOpen(true);
  };

  const handleSaveBaselineUpdate = async (updatedBaseline: any) => {
    if (!selectedClientId) return;
    const current = clients.find(c => c.id === selectedClientId);
    if (!current) return;
    const updated = await apiService.updateClient(selectedClientId, {
      baseline: { ...current.baseline, ...updatedBaseline },
    });
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleApplyClinicalTestResults = async (results: any) => {
    if (!selectedClientId) return;
    const current = clients.find(c => c.id === selectedClientId);
    if (!current) return;
    const updated = await apiService.updateClient(selectedClientId, {
      baseline: {
        ...current.baseline,
        enneatype: results.enneatype,
        dominantDrainArea: results.dominantDrainArea,
        lifeWheel: results.lifeWheel,
        beliefs: results.beliefs,
      },
    });
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleSaveFinalEvaluation = async (finalEval: FinalEvaluation, purgeClinicalData?: boolean) => {
    if (!selectedClientId) return;
    let updated = await apiService.updateClient(selectedClientId, {
      finalEvaluation: finalEval,
      status: 'completed',
    });
    if (purgeClinicalData) {
      updated = await apiService.purgeClientClinicalData(selectedClientId);
    }
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handlePurgeClientData = async (clientId: string) => {
    const updated = await apiService.purgeClientClinicalData(clientId);
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleSaveTransformationalSession = async (transData: any) => {
    if (!selectedClientId) return;
    const updated = await apiService.updateClient(selectedClientId, {
      transformationalSession: transData,
      status: 'completed',
    });
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleTogglePublicAggregation = async (clientId: string, newValue: boolean) => {
    const updated = await apiService.updateClient(clientId, {
      isPubliclyAggregated: newValue,
    });
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteClient = async (clientId: string) => {
    await apiService.deleteClient(clientId);
    setClients(prev => prev.filter(c => c.id !== clientId));
    if (selectedClientId === clientId) {
      setSelectedClientId(null);
    }
  };

  const handleResetSeedData = async () => {
    if (window.confirm('¿Deseas restaurar los casos clínicos de ejemplo de ALIVE GAME?')) {
      const resetList = await apiService.resetSeedData();
      setClients(resetList);
      setSelectedClientId(null);
    }
  };

  // If in pure embed mode (for iframe insertion into external platforms)
  if (viewMode === 'embed') {
    return (
      <div className="min-h-screen bg-[#F9F6F0] text-[#2B231F] font-sans antialiased">
        <PublicLandingDashboard metrics={metrics} isEmbedMode={true} />
      </div>
    );
  }

  // If in public mode (cclagoriocoach.com root): FULL LANDING PAGE + VITRINA
  if (viewMode === 'public') {
    return (
      <LandingPage
        metrics={metrics}
        onGoToAdmin={() => navigateTo('coach')}
      />
    );
  }

  // If in coach mode (cclagoriocoach.com/admin): PRIVATE CLINICAL HISTORIAL OF PATIENTS
  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#2B231F] font-sans flex flex-col antialiased selection:bg-[#C38B3A]/20 selection:text-[#581420]">
      {/* Top Bar following Top Bar Contract: 3 distinct zones */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E8DFD3] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Display Font) */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#581420] text-[#E4B062] flex items-center justify-center font-serif font-bold text-lg shadow-sm border border-[#C38B3A]/30">
            A
          </div>
          <div>
            <a
              href="/admin"
              onClick={e => {
                e.preventDefault();
                setSelectedClientId(null);
                navigateTo('coach');
              }}
              className="font-serif font-bold text-base sm:text-lg text-[#581420] tracking-tight hover:opacity-90 block leading-tight"
            >
              Historia Clínica de Pacientes
            </a>
            <span className="text-[10px] text-[#8C8176] tracking-wide block uppercase font-medium">
              cclagoriocoach.com/admin · ALIVE GAME
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Segmented Mode Selector */}
        <nav className="flex items-center gap-2 p-1 bg-[#FAF7F2] rounded-xl border border-[#E8DFD3]">
          <button
            onClick={() => {
              setSelectedClientId(null);
              navigateTo('coach');
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 bg-[#581420] text-white shadow-sm"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Panel Coach (Privado)</span>
          </button>

          <button
            onClick={() => navigateTo('public')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 text-[#6A6057] hover:text-[#2B231F] hover:bg-white"
            title="Ir a la Landing pública de cclagoriocoach.com"
          >
            <Globe className="w-3.5 h-3.5 text-[#C38B3A]" />
            <span>Ver Landing Pública (cclagoriocoach.com)</span>
          </button>

          <button
            onClick={() => navigateTo('embed')}
            className="hidden md:flex px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#8C8176] hover:text-[#2B231F] transition-colors items-center gap-1"
            title="Previsualizar cómo se ve dentro de un iframe"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ver Modo Iframe</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions & Coach Profile */}
        <div className="flex items-center gap-3">
          {viewMode === 'coach' && (
            <button
              onClick={() => setIsNewClientOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-[#E4B062]" />
              <span>Nuevo Cliente</span>
            </button>
          )}

          {/* Coach Identity Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E8DFD3]">
            <img
              src={ccPerfilImg}
              alt="Cecilia Lagorio"
              className="w-8 h-8 rounded-full object-cover border border-[#C38B3A]"
              referrerPolicy="no-referrer"
            />
            <div className="hidden lg:block text-left">
              <span className="text-xs font-bold text-[#2B231F] block leading-tight">
                Cecilia Lagorio
              </span>
              <span className="text-[10px] text-[#6B705C] block">
                ICF Neurocoach
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8">
        {selectedClient ? (
          <ClientDetailView
            client={selectedClient}
            onBack={() => setSelectedClientId(null)}
            onOpenAddSession={() => setIsAddSessionOpen(true)}
            onStartLiveGuide={handleStartLiveGuide}
            onOpenTestsModal={() => setIsClinicalTestsModalOpen(true)}
            onOpenFinalize={() => setIsFinalizeOpen(true)}
            onTogglePublicAggregation={handleTogglePublicAggregation}
            onPurgeClientData={handlePurgeClientData}
            onDeleteClient={handleDeleteClient}
          />
        ) : (
          <CoachDashboard
            clients={clients}
            onSelectClient={c => setSelectedClientId(c.id)}
            onOpenNewClient={() => setIsNewClientOpen(true)}
            onStartLiveGuide={(client, sessionNum) => {
              setSelectedClientId(client.id);
              handleStartLiveGuide(sessionNum);
            }}
            onTogglePublicAggregation={handleTogglePublicAggregation}
            onResetSeedData={handleResetSeedData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E8DFD3] bg-[#FFFFFF] py-6 px-4 sm:px-8 text-xs text-[#8C8176]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#581420]">ALIVE GAME</span>
            <span>·</span>
            <span>Historia Clínica Evolutiva de Neurocoaching</span>
            <span>·</span>
            <span className="text-[#6B705C]">Desplegado en Google Cloud Run & Firebase</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#2B231F] font-medium">cclagoriocoach.com</span>
            <span>·</span>
            <span>alivegamers.com</span>
            <span>·</span>
            <span>qchalive.com</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NewClientModal
        isOpen={isNewClientOpen}
        onClose={() => setIsNewClientOpen(false)}
        onSave={handleSaveNewClient}
        existingCount={clients.length}
      />

      {selectedClient && (
        <>
          <AddSessionModal
            isOpen={isAddSessionOpen}
            onClose={() => setIsAddSessionOpen(false)}
            client={selectedClient}
            onSaveSession={handleSaveSession}
          />

          <FinalizeClientModal
            isOpen={isFinalizeOpen}
            onClose={() => setIsFinalizeOpen(false)}
            client={selectedClient}
            onSaveFinalEvaluation={handleSaveFinalEvaluation}
          />

          <LiveSessionGuideModal
            isOpen={isLiveGuideOpen}
            onClose={() => setIsLiveGuideOpen(false)}
            client={selectedClient}
            targetSessionNumber={liveGuideTargetSession}
            onSaveSession={handleSaveSession}
            onSaveBaselineUpdate={handleSaveBaselineUpdate}
            onSaveFinalEvaluation={handleSaveFinalEvaluation}
            onSaveTransformationalSession={handleSaveTransformationalSession}
          />

          <InteractiveClinicalTestsModal
            isOpen={isClinicalTestsModalOpen}
            onClose={() => setIsClinicalTestsModalOpen(false)}
            clientName={selectedClient.clientName}
            anonymousCode={selectedClient.anonymousCode}
            initialEnneatype={selectedClient.baseline.enneatype}
            initialWheel={selectedClient.baseline.lifeWheel}
            initialBeliefs={selectedClient.baseline.beliefs}
            onApplyResults={handleApplyClinicalTestResults}
          />
        </>
      )}

      <CoachAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => setIsCoachAuthenticated(true)}
      />
    </div>
  );
}
