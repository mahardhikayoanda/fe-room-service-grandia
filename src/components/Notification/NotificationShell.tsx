"use client";

import FCMProvider from "@/components/FCMProvider";

import NotificationDrawer from "./NotificationDrawer";

const NotificationShell = () => (
  <>
    <NotificationDrawer />
    <FCMProvider />
  </>
);

export default NotificationShell;
