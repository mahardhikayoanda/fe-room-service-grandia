import FirebaseConfigProvider from "@/lib/firebase/FirebaseConfigProvider";
import { buildFirebaseClientConfig } from "@/lib/firebase/server-config";

import NotificationShellClient from "./NotificationShellClient";

const NotificationShell = () => (
  <FirebaseConfigProvider config={buildFirebaseClientConfig()}>
    <NotificationShellClient />
  </FirebaseConfigProvider>
);

export default NotificationShell;
