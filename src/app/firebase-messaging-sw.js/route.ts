import {
  buildFirebaseServiceWorkerScript,
  getFirebaseServiceWorkerConfig,
} from "@/lib/firebase/service-worker";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const config = getFirebaseServiceWorkerConfig();
  const script = buildFirebaseServiceWorkerScript(config);

  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Service-Worker-Allowed": "/",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};
