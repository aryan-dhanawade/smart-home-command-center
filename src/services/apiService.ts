
import { toast } from 'sonner';

export interface RoomStatus {
  state: 'ON' | 'OFF';
  brightness: number;
  mode: '' | 'party' | 'movie';
  schedule: number;
  motionDetection: boolean;
}

export interface RoomRequest {
  roomID: number;
  status: RoomStatus;
}

class ApiService {
  private apiEndpoint: string = 'http://192.168.1.6:80/command'; // Replace with actual endpoint

  public async sendRoomRequest(request: RoomRequest): Promise<boolean> {
    try {
      console.log('Sending room request:', JSON.stringify(request, null, 2));
      
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request), 
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response
      console.log('API response:', data);
      
      // Simulating successful API call
      toast.success(`Room ${request.roomID} updated successfully`);
      console.log(request);
      return true;
    } catch (error) {
      console.error('Error sending room request:', error);
      toast.error('Failed to update room. Please try again.');
      return false;
    }
  }

  public setApiEndpoint(endpoint: string) {
    this.apiEndpoint = endpoint;
  }
}

// Singleton instance
const apiService = new ApiService();
export default apiService;
