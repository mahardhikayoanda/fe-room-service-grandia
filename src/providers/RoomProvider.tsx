"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { RoomData } from "@/types/room";
import { getRoomData, getRoomUUID } from "@/utils/geolocation";

interface RoomContextType {
  roomData: RoomData | null;
  roomUUID: string | null;
  setRoomData: (data: RoomData | null) => void;
}

const RoomContext = createContext<RoomContextType>({
  roomData: null,
  roomUUID: null,
  setRoomData: () => {},
});

export const useRoom = () => useContext(RoomContext);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [roomData, setRoomDataState] = useState<RoomData | null>(null);
  const [roomUUID, setRoomUUID] = useState<string | null>(null);

  useEffect(() => {
    // Load room data from sessionStorage on mount
    const data = getRoomData();
    const uuid = getRoomUUID();

    if (data) {
      setRoomDataState(data);
      console.log("Room data loaded from sessionStorage:", data);
    }
    if (uuid) {
      setRoomUUID(uuid);
      console.log("Room UUID loaded from sessionStorage:", uuid);
    }
  }, []);

  const setRoomData = (data: RoomData | null) => {
    setRoomDataState(data);
    if (data) {
      setRoomUUID(data.uuid);
    }
  };

  return (
    <RoomContext.Provider value={{ roomData, roomUUID, setRoomData }}>
      {children}
    </RoomContext.Provider>
  );
}
