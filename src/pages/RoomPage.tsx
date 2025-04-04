
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useRoomContext } from '../context/RoomContext';
import Layout from '../components/Layout';
import RoomControls from '../components/RoomControls';

const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { getRoomById } = useRoomContext();
  
  const id = parseInt(roomId || '0', 10);
  const room = getRoomById(id);
  
  if (!room) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">{room.name}</h1>
          <p className="text-muted-foreground">
            Control settings for this room
          </p>
        </div>
        
        <RoomControls roomId={id} />
      </div>
    </Layout>
  );
};

export default RoomPage;
