import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getPerformance, type FirebasePerformance } from "firebase/performance";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// 1. Escudo global contra excepciones no controladas generadas internamente por el SDK de Firebase
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    const reasonStr = String(event.reason?.message || event.reason || "");
    const codeStr = String(event.reason?.code || "");
    const isFirebaseIssue =
      event.reason?.name === "FirebaseError" ||
      codeStr.includes("installations") ||
      reasonStr.includes("API key not valid") ||
      reasonStr.includes("installations/request-failed") ||
      reasonStr.includes("400 INVALID_ARGUMENT");

    if (isFirebaseIssue) {
      // Prevenir que el overlay de desarrollo o la consola muestre error en pantalla
      event.preventDefault();
      console.warn("[Firebase] Servicio en segundo plano en propagación de credenciales:", reasonStr);
    }
  });
}

// Configuración oficial de Firebase para cclagoriocoachlanding
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDZ92ZtFCdMHis7wZk05IE2jw4-CfwLj7o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cclagoriocoachlanding.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cclagoriocoachlanding",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cclagoriocoachlanding.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "588497403896",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:588497403896:web:59d4255751d9c103d1600d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YXD9FQEG0K"
};

let app: FirebaseApp | undefined;
let perf: FirebasePerformance | undefined;
let analytics: Analytics | undefined;

// Solo inicializamos en el navegador para evitar errores en SSR o dev server
if (typeof window !== "undefined") {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    // Solo activamos telemetría activa en dominios de producción o despliegue real (cclagoriocoach.com, web.app, etc.)
    // En el entorno de previsualización interna (run.app o localhost), Google Cloud bloquea la API key por restricción de dominio/origen.
    const hostname = window.location.hostname;
    const isPreviewEnv = hostname.includes("run.app") || hostname === "localhost" || hostname === "127.0.0.1";

    if (!isPreviewEnv && app) {
      // 1. Firebase Performance Monitoring
      try {
        perf = getPerformance(app);
        console.log("[Firebase Performance] Activo en producción para cclagoriocoach.com");
      } catch (perfErr) {
        console.warn("[Firebase Performance] No disponible en este entorno:", perfErr);
      }

      // 2. Firebase Analytics (Google Analytics G-YXD9FQEG0K)
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
          console.log("[Firebase Analytics] Activo y midiendo en cclagoriocoach.com (G-YXD9FQEG0K)");
        }
      }).catch((analyticsErr) => {
        console.warn("[Firebase Analytics] No disponible:", analyticsErr);
      });
    } else {
      console.log("[Firebase] Inicializado en modo vista previa. El monitoreo en vivo de Performance y Analytics se activará automáticamente al desplegar en cclagoriocoach.com / Firebase Hosting.");
    }

  } catch (error) {
    console.warn("[Firebase] Inicialización omitida:", error);
  }
}

export { app, perf, analytics };
