import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_MOCK_CLIENTS, computeAggregatedMetrics } from './src/data/mockClients';
import { ClientRecord, SessionRecord } from './src/types/coaching';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store with initial seed
let clientsStore: ClientRecord[] = JSON.parse(JSON.stringify(INITIAL_MOCK_CLIENTS));

// REST API Endpoints
// 1. Get all clients (private to coach)
app.get('/api/clients', (req, res) => {
  res.json({ success: true, clients: clientsStore });
});

// 2. Create new client (private to coach)
app.post('/api/clients', (req, res) => {
  const newClient: ClientRecord = req.body;
  if (!newClient || !newClient.id) {
    return res.status(400).json({ error: 'Faltan datos del cliente' });
  }
  // Check if exists
  const existingIdx = clientsStore.findIndex(c => c.id === newClient.id);
  if (existingIdx >= 0) {
    clientsStore[existingIdx] = newClient;
  } else {
    clientsStore.unshift(newClient);
  }
  res.status(201).json({ success: true, client: newClient });
});

// 3. Get single client detail
app.get('/api/clients/:id', (req, res) => {
  const client = clientsStore.find(c => c.id === req.params.id);
  if (!client) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }
  res.json({ success: true, client });
});

// 4. Update client (baseline, final evaluation, or flags)
app.put('/api/clients/:id', (req, res) => {
  const index = clientsStore.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }
  clientsStore[index] = { ...clientsStore[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json({ success: true, client: clientsStore[index] });
});

// 5. Add session to client
app.post('/api/clients/:id/sessions', (req, res) => {
  const index = clientsStore.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }
  const session: SessionRecord = req.body;
  clientsStore[index].sessions.push(session);
  clientsStore[index].updatedAt = new Date().toISOString();
  res.status(201).json({ success: true, client: clientsStore[index], session });
});

// 6. Delete client
app.delete('/api/clients/:id', (req, res) => {
  clientsStore = clientsStore.filter(c => c.id !== req.params.id);
  res.json({ success: true, message: 'Cliente eliminado' });
});

// 6.b Purge sensitive clinical data (keep ONLY Name, Email, Phone, and Conflict Area)
app.post('/api/clients/:id/purge', (req, res) => {
  const index = clientsStore.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }
  const client = clientsStore[index];
  const retainedConflictArea =
    client.retainedConflictArea ||
    client.transformationalSession?.diagnosticSnapshot?.areaKey ||
    client.baseline?.dominantDrainArea ||
    'cuerpo_mente';

  clientsStore[index] = {
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
  res.json({ success: true, client: clientsStore[index] });
});

// 7. Public Anonymous Aggregated Metrics for cclagoriocoach.com
app.get('/api/public/metrics', (req, res) => {
  const metrics = computeAggregatedMetrics(clientsStore);
  res.json({
    success: true,
    metrics,
    source: 'Historia Clínica Evolutiva Coaching · ALIVE GAME',
    privacyCompliant: true,
    updatedAt: new Date().toISOString(),
  });
});

// 8. Seed / Reset to realistic demo data
app.post('/api/seed', (req, res) => {
  clientsStore = JSON.parse(JSON.stringify(INITIAL_MOCK_CLIENTS));
  res.json({ success: true, message: 'Base de datos re-sembrada con éxito', count: clientsStore.length });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
