
import React from 'react';
import { useRoomContext } from '../context/RoomContext';
import Layout from '../components/Layout';
import RoomCard from '../components/RoomCard';

const Index = () => {
  const { rooms } = useRoomContext();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Smart Home Command Center</h1>
          <p className="text-muted-foreground">Control your rooms with voice commands or touch controls</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              state={room.status.state}
            />
          ))}
        </div>
        
        <div className="bg-card rounded-lg p-4 mt-6">
          <h2 className="text-xl font-medium mb-3">Voice Commands</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>Try saying these commands:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>"Turn room 1 on"</li>
              <li>"Set brightness to 50 in room 2"</li>
              <li>"Change mode to party in room 1"</li>
              <li>"Schedule 15 minutes for room 2"</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
