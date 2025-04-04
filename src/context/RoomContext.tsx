
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RoomStatus } from '../services/apiService';

interface Room {
  id: number;
  name: string;
  status: RoomStatus;
}

interface RoomContextType {
  rooms: Room[];
  updateRoomStatus: (roomId: number, status: Partial<RoomStatus>) => void;
  getRoomById: (roomId: number) => Room | undefined;
}

const defaultRooms: Room[] = [
  {
    id: 1,
    name: 'Living Room',
    status: {
      state: 'OFF',
      brightness: 50,
      mode: '',
      schedule: 0,
    },
  },
  {
    id: 2,
    name: 'Bedroom',
    status: {
      state: 'OFF',
      brightness: 30,
      mode: '',
      schedule: 0,
    },
  },
];

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(defaultRooms);

  const updateRoomStatus = (roomId: number, status: Partial<RoomStatus>) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { ...room, status: { ...room.status, ...status } }
          : room
      )
    );
  };

  const getRoomById = (roomId: number): Room | undefined => {
    return rooms.find(room => room.id === roomId);
  };

  return (
    <RoomContext.Provider value={{ rooms, updateRoomStatus, getRoomById }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};
