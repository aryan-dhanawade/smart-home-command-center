
import React, { useState, useEffect } from 'react';
import voiceRecognitionService from '../services/voiceRecognitionService';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface VoiceCommandButtonProps {
  onCommand: (command: string) => void;
}

const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      voiceRecognitionService.stopListening();
      setIsListening(false);
    } else {
      const started = voiceRecognitionService.startListening((command) => {
        onCommand(command);
        setIsListening(false);
      });
      
      if (started) {
        setIsListening(true);
        toast.info('Listening for voice commands...');
      }
    }
  };

  useEffect(() => {
    return () => {
      voiceRecognitionService.stopListening();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={toggleListening}
        className={`voice-indicator ${isListening ? 'voice-indicator-listening' : ''} p-0 bg-transparent hover:bg-primary/20`}
        aria-label={isListening ? 'Stop listening' : 'Start voice command'}
      >
        {isListening ? (
          <>
            <div className="voice-pulse"></div>
            <Mic className="h-5 w-5 text-primary animate-pulse" />
          </>
        ) : (
          <Mic className="h-5 w-5 text-primary" />
        )}
      </Button>
      <span className="text-xs mt-1 text-muted-foreground">
        {isListening ? 'Listening...' : 'Voice'}
      </span>
    </div>
  );
};

export default VoiceCommandButton;
