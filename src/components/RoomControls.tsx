
import React, { useEffect, useState } from 'react';
import { useRoomContext } from '../context/RoomContext';
import apiService, { RoomStatus } from '../services/apiService';
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
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Lightbulb, Clock, Calendar, Send } from 'lucide-react';
import { Button } from './ui/button';

interface RoomControlsProps {
  roomId: number;
}

const RoomControls: React.FC<RoomControlsProps> = ({ roomId }) => {
  const { getRoomById, updateRoomStatus } = useRoomContext();
  const room = getRoomById(roomId);
  const [localStatus, setLocalStatus] = useState<RoomStatus>(room?.status || {
    state: 'OFF',
    brightness: 50,
    mode: '',
    schedule: 0
  });

  if (!room) {
    return <div>Room not found</div>;
  }

  // Update local state when room changes
  useEffect(() => {
    if (room) {
      setLocalStatus(room.status);
    }
  }, [room]);

  const handleStateChange = (checked: boolean) => {
    const newState = checked ? 'ON' : 'OFF';
    setLocalStatus(prev => ({ ...prev, state: newState }));
  };

  const handleBrightnessChange = (value: number[]) => {
    const brightness = value[0];
    setLocalStatus(prev => ({ ...prev, brightness }));
  };

  const handleModeChange = (value: string) => {
    // Convert "none" value to empty string for internal state
    const mode = value === "none" ? "" : value as "" | 'party' | 'movie';
    setLocalStatus(prev => ({ ...prev, mode }));
  };

  const handleScheduleChange = (value: string) => {
    const schedule = parseInt(value, 10);
    setLocalStatus(prev => ({ ...prev, schedule }));
  };

  const handleSendCommand = () => {
    // Update the room status in context
    updateRoomStatus(roomId, localStatus);
    
    // Send API request with all current values
    apiService.sendRoomRequest({
      roomID: roomId,
      status: localStatus,
    });
  };

  // No longer sending API requests on initial mount
  // Just use the existing room state

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
              checked={localStatus.state === 'ON'}
              onCheckedChange={handleStateChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="brightness" className="text-base">Brightness</Label>
              <span className="text-sm text-muted-foreground">
                {localStatus.brightness}%
              </span>
            </div>
            <Slider
              id="brightness"
              min={0}
              max={100}
              step={1}
              value={[localStatus.brightness]}
              onValueChange={handleBrightnessChange}
              disabled={localStatus.state === 'OFF'}
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
              value={localStatus.mode === "" ? "none" : localStatus.mode}
              onValueChange={handleModeChange}
              disabled={localStatus.state === 'OFF'}
            >
              <SelectTrigger id="mode">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="movie">Movie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="schedule" className="text-base">Schedule (minutes)</Label>
              {localStatus.schedule > 0 && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{localStatus.schedule} min</span>
                </div>
              )}
            </div>
            <Select
              value={localStatus.schedule.toString()}
              onValueChange={handleScheduleChange}
              disabled={localStatus.state === 'OFF'}
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

      <div className="md:col-span-2">
        <Card>
          <CardContent className="pt-6">
            <Button 
              className="w-full" 
              onClick={handleSendCommand}
              disabled={room.status.state === localStatus.state && 
                        room.status.brightness === localStatus.brightness &&
                        room.status.mode === localStatus.mode &&
                        room.status.schedule === localStatus.schedule}
            >
              <Send className="mr-2 h-4 w-4" /> Send Commands
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomControls;
