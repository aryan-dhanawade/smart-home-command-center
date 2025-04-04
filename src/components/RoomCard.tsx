
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Room, Sofa, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface RoomCardProps {
  id: number;
  name: string;
  state: 'ON' | 'OFF';
}

const RoomCard: React.FC<RoomCardProps> = ({ id, name, state }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/room/${id}`);
  };

  // Pick an icon based on room name
  let RoomIcon = Room;
  if (name.toLowerCase().includes('living')) {
    RoomIcon = Sofa;
  } else if (name.toLowerCase().includes('bed')) {
    RoomIcon = Moon;
  }

  return (
    <Card 
      className="room-card cursor-pointer hover:scale-105 transition-all duration-300 h-full"
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
          <Badge variant={state === 'ON' ? 'default' : 'secondary'}>
            {state}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-24">
          <RoomIcon 
            className={`h-16 w-16 ${state === 'ON' ? 'text-primary' : 'text-muted-foreground'}`} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
