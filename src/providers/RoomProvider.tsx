"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { RoomDataType } from "@/types/room.type";
import { getRoomData, getRoomUUID } from "@/utils/geolocation";

interface RoomContextType {
  roomData: RoomDataType | null;
  roomUUID: string | null;
  setRoomData: (data: RoomDataType | null) => void;
}

const RoomContext = createContext<RoomContextType>({
  roomData: null,
  roomUUID: null,
  setRoomData: () => {},
});

export const useRoom = () => useContext(RoomContext);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [roomData, setRoomDataState] = useState<RoomDataType | null>(null);
  const [roomUUID, setRoomUUID] = useState<string | null>(null);

  useEffect(() => {
    // Load room data from sessionStorage on mount
    const data = getRoomData();
    const uuid = getRoomUUID();

    if (data) {
      setRoomDataState(data);
    }
    if (uuid) {
      setRoomUUID(uuid);
    }
  }, []);

  const setRoomData = (data: RoomDataType | null) => {
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
