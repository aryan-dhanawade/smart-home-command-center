
import { toast } from 'sonner';

interface VoiceCommandCallback {
  (command: string): void;
}

class VoiceRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;
  private commandCallback: VoiceCommandCallback | null = null;

  constructor() {
    this.initializeRecognition();
  }

  private initializeRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log('Voice command recognized:', command);
        
        if (this.commandCallback) {
          this.commandCallback(command);
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please allow microphone access to use voice commands.');
        } else {
          toast.error('Error recognizing speech. Please try again.');
        }
        this.isListening = false;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    }
  }

  public startListening(callback: VoiceCommandCallback) {
    if (!this.recognition) {
      this.initializeRecognition();
      if (!this.recognition) {
        return false;
      }
    }

    try {
      this.commandCallback = callback;
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start speech recognition. Please try again.');
      this.isListening = false;
      return false;
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }
}

// Singleton instance
const voiceRecognitionService = new VoiceRecognitionService();
export default voiceRecognitionService;
