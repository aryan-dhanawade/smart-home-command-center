
import { useRoomContext } from '../context/RoomContext';
import apiService, { RoomRequest } from './apiService';
import { toast } from 'sonner';

export interface CommandProcessor {
  processCommand: (command: string) => boolean;
}

export const useVoiceCommandProcessor = (): CommandProcessor => {
  const { rooms, updateRoomStatus, getRoomById } = useRoomContext();
  
  const processCommand = (command: string): boolean => {
    const normalizedCommand = command.toLowerCase().trim();
    console.log('Processing command:', normalizedCommand);
    
    // Room selection regex
    const roomRegex = /room\s*(\d+|one|two|1|2)/i;
    const roomMatch = normalizedCommand.match(roomRegex);
    
    let roomId = 0;
    if (roomMatch) {
      const roomIdentifier = roomMatch[1].toLowerCase();
      if (roomIdentifier === 'one' || roomIdentifier === '1') {
        roomId = 1;
      } else if (roomIdentifier === 'two' || roomIdentifier === '2') {
        roomId = 2;
      } else {
        roomId = parseInt(roomIdentifier, 10);
      }
    }
    
    if (!roomId || roomId > rooms.length) {
      toast.error(`Room ${roomId || ''} not found. Please try again.`);
      return false;
    }
    
    const room = getRoomById(roomId);
    if (!room) {
      toast.error(`Room ${roomId} not found. Please try again.`);
      return false;
    }
    
    // Command patterns
    const stateOn = /(turn|switch)?\s*(on)/i;
    const stateOff = /(turn|switch)?\s*(off)/i;
    const brightness = /(?:set|change)?\s*brightness\s*(?:to|at)?\s*(\d+)/i;
    const modeParty = /(?:set|change)?\s*mode\s*(?:to)?\s*(party)/i;
    const modeMovie = /(?:set|change)?\s*mode\s*(?:to)?\s*(movie)/i;
    const schedule = /(?:set|schedule)?\s*(?:for)?\s*(\d+)\s*(?:minutes|minute|mins|min)/i;
    
    // Clone current room status
    const newStatus = { ...room.status };
    let commandRecognized = false;
    
    // Process commands
    if (stateOn.test(normalizedCommand)) {
      newStatus.state = 'ON';
      commandRecognized = true;
    } else if (stateOff.test(normalizedCommand)) {
      newStatus.state = 'OFF';
      commandRecognized = true;
    }
    
    const brightnessMatch = normalizedCommand.match(brightness);
    if (brightnessMatch) {
      const brightnessValue = parseInt(brightnessMatch[1], 10);
      if (!isNaN(brightnessValue) && brightnessValue >= 0 && brightnessValue <= 100) {
        newStatus.brightness = brightnessValue;
        commandRecognized = true;
      }
    }
    
    if (modeParty.test(normalizedCommand)) {
      newStatus.mode = 'party';
      commandRecognized = true;
    } else if (modeMovie.test(normalizedCommand)) {
      newStatus.mode = 'movie';
      commandRecognized = true;
    }
    
    const scheduleMatch = normalizedCommand.match(schedule);
    if (scheduleMatch) {
      const scheduleValue = parseInt(scheduleMatch[1], 10);
      if (!isNaN(scheduleValue) && scheduleValue > 0) {
        newStatus.schedule = scheduleValue;
        commandRecognized = true;
      }
    }
    
    if (commandRecognized) {
      updateRoomStatus(roomId, newStatus);
      
      // Send API request
      const request: RoomRequest = {
        roomID: roomId,
        status: newStatus,
      };
      
      apiService.sendRoomRequest(request);
      return true;
    }
    
    toast.error('Command not recognized. Please try again.');
    return false;
  };
  
  return { processCommand };
};
