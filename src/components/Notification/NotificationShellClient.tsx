"use client";

import FCMProvider from "@/components/FCMProvider";

import NotificationDrawer from "./NotificationDrawer";

const NotificationShellClient = () => (
  <>
    <NotificationDrawer />
    <FCMProvider />
  </>
);

export default NotificationShellClient;
