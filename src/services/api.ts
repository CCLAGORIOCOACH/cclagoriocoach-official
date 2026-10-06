import { ClientRecord, PublicAggregatedMetrics } from '../types/coaching';
import { INITIAL_MOCK_CLIENTS, computeAggregatedMetrics } from '../data/mockClients';

const LOCAL_STORAGE_KEY = 'alive_game_clients_store_v1';

// Helper to get local cache
function getLocalCache(): ClientRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading localStorage', err);
  }
  return INITIAL_MOCK_CLIENTS;
}

// Helper to set local cache
function setLocalCache(clients: ClientRecord[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clients));
  } catch (err) {
    console.error('Error writing localStorage', err);
  }
}

export const apiService = {
  async getClients(): Promise<ClientRecord[]> {
    try {
      const res = await fetch('/api/clients');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.clients) && data.clients.length > 0) {
          setLocalCache(data.clients);
          return data.clients;
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, using cached client store:', err);
    }
    return getLocalCache();
  },

  async saveClient(client: ClientRecord): Promise<ClientRecord> {
    const current = getLocalCache();
    const idx = current.findIndex(c => c.id === client.id);
    let updated: ClientRecord[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = client;
    } else {
      updated = [client, ...current];
    }
    setLocalCache(updated);

    try {
      await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
    } catch (err) {
      console.warn('Network sync pending, saved in local cache:', err);
    }

    return client;
  },

  async addSession(clientId: string, session: any): Promise<ClientRecord> {
    const current = getLocalCache();
    const idx = current.findIndex(c => c.id === clientId);
    if (idx === -1) throw new Error('Client not found');

    const updatedClient = {
      ...current[idx],
      sessions: [...current[idx].sessions, session],
      updatedAt: new Date().toISOString(),
    };

    current[idx] = updatedClient;
    setLocalCache(current);

    try {
      await fetch(`/api/clients/${clientId}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session),
      });
    } catch (err) {
      console.warn('Session saved locally, backend sync deferred');
    }

    return updatedClient;
  },

  async updateClient(clientId: string, updates: Partial<ClientRecord>): Promise<ClientRecord> {
    const current = getLocalCache();
    const idx = current.findIndex(c => c.id === clientId);
    if (idx === -1) throw new Error('Client not found');

    const updatedClient = {
      ...current[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    current[idx] = updatedClient;
    setLocalCache(current);

    try {
      await fetch(`/api/clients/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn('Update saved locally, backend sync deferred');
    }

    return updatedClient;
  },

  async deleteClient(clientId: string): Promise<void> {
    const current = getLocalCache();
    const filtered = current.filter(c => c.id !== clientId);
    setLocalCache(filtered);

    try {
      await fetch(`/api/clients/${clientId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Delete performed locally');
    }
  },

  async purgeClientClinicalData(clientId: string): Promise<ClientRecord> {
    const current = getLocalCache();
    const idx = current.findIndex(c => c.id === clientId);
    if (idx === -1) throw new Error('Client not found');

    const client = current[idx];
    const retainedConflictArea =
      client.retainedConflictArea ||
      client.transformationalSession?.diagnosticSnapshot?.areaKey ||
      client.baseline?.dominantDrainArea ||
      'cuerpo_mente';

    const purgedClient: ClientRecord = {
      ...client,
      isDataPurged: true,
      purgedAt: new Date().toISOString(),
      retainedConflictArea,
      status: 'completed',
      sessions: [],
      baseline: {
        ...client.baseline,
        childhoodStimuli: [],
        workVocationNotes: '',
        generalObservations: 'Datos clínicos purgados por política de privacidad del coach. Retenido únicamente Nombre, Correo, Teléfono y Área en conflicto.',
        sessionOneTaskForSessionTwo: undefined,
        initialVitalDecisions: {
          ...client.baseline?.initialVitalDecisions,
          notes: '',
        },
      },
      transformationalSession: client.transformationalSession ? {
        ...client.transformationalSession,
        howClientDecidedInitially: '',
        initialImpactNotes: '',
        selfDiscovery: '',
        breakthroughSomaticMoment: '',
        transformationDuringSession: '',
        coachNotesPrivate: undefined,
      } : undefined,
      finalEvaluation: client.finalEvaluation ? {
        ...client.finalEvaluation,
        keyMilestones: [],
        preventiveBoicotProtocol: '',
        coachSummary: 'Expediente purgado. Solo datos de contacto y área de conflicto retenidos.',
      } : undefined,
      updatedAt: new Date().toISOString(),
    };

    current[idx] = purgedClient;
    setLocalCache(current);

    try {
      await fetch(`/api/clients/${clientId}/purge`, { method: 'POST' });
    } catch (err) {
      console.warn('Purge synced locally, backend deferred');
    }

    return purgedClient;
  },

  async getPublicMetrics(): Promise<PublicAggregatedMetrics> {
    try {
      const res = await fetch('/api/public/metrics');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.metrics) {
          return data.metrics;
        }
      }
    } catch (err) {
      console.warn('Using client-side computed metrics');
    }
    const clients = getLocalCache();
    return computeAggregatedMetrics(clients);
  },

  async resetSeedData(): Promise<ClientRecord[]> {
    setLocalCache(INITIAL_MOCK_CLIENTS);
    try {
      await fetch('/api/seed', { method: 'POST' });
    } catch (err) {
      console.warn('Local seed restored');
    }
    return INITIAL_MOCK_CLIENTS;
  },
};
