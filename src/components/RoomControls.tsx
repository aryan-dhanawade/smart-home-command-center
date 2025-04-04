
import React, { useEffect } from 'react';
import { useRoomContext } from '../context/RoomContext';
import apiService from '../services/apiService';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lightbulb, Clock, Calendar } from 'lucide-react';

interface RoomControlsProps {
  roomId: number;
}

const RoomControls: React.FC<RoomControlsProps> = ({ roomId }) => {
  const { getRoomById, updateRoomStatus } = useRoomContext();
  const room = getRoomById(roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  const handleStateChange = (checked: boolean) => {
    const newState = checked ? 'ON' : 'OFF';
    updateRoomStatus(roomId, { state: newState });
    
    // Send API request
    apiService.sendRoomRequest({
      roomID: roomId,
      status: { ...room.status, state: newState },
    });
  };

  const handleBrightnessChange = (value: number[]) => {
    const brightness = value[0];
    updateRoomStatus(roomId, { brightness });
    
    // Send API request
    apiService.sendRoomRequest({
      roomID: roomId,
      status: { ...room.status, brightness },
    });
  };

  const handleModeChange = (value: string) => {
    const mode = value as 'party' | 'movie' | '';
    updateRoomStatus(roomId, { mode });
    
    // Send API request
    apiService.sendRoomRequest({
      roomID: roomId,
      status: { ...room.status, mode },
    });
  };

  const handleScheduleChange = (value: string) => {
    const schedule = parseInt(value, 10);
    updateRoomStatus(roomId, { schedule });
    
    // Send API request
    apiService.sendRoomRequest({
      roomID: roomId,
      status: { ...room.status, schedule },
    });
  };

  useEffect(() => {
    // Initial API request when component mounts
    apiService.sendRoomRequest({
      roomID: roomId,
      status: room.status,
    });
  }, [roomId]);

  return (
    <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
      <Card className="room-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            Power & Brightness
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="state" className="text-base">Power</Label>
            <Switch
              id="state"
              checked={room.status.state === 'ON'}
              onCheckedChange={handleStateChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="brightness" className="text-base">Brightness</Label>
              <span className="text-sm text-muted-foreground">
                {room.status.brightness}%
              </span>
            </div>
            <Slider
              id="brightness"
              min={0}
              max={100}
              step={1}
              value={[room.status.brightness]}
              onValueChange={handleBrightnessChange}
              disabled={room.status.state === 'OFF'}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="room-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Mode & Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mode" className="text-base">Mode</Label>
            <Select
              value={room.status.mode}
              onValueChange={handleModeChange}
              disabled={room.status.state === 'OFF'}
            >
              <SelectTrigger id="mode">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="movie">Movie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="schedule" className="text-base">Schedule (minutes)</Label>
              {room.status.schedule > 0 && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{room.status.schedule} min</span>
                </div>
              )}
            </div>
            <Select
              value={room.status.schedule.toString()}
              onValueChange={handleScheduleChange}
              disabled={room.status.state === 'OFF'}
            >
              <SelectTrigger id="schedule">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No schedule</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomControls;
