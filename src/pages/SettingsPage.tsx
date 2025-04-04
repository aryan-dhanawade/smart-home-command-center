
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import apiService from '@/services/apiService';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [apiEndpoint, setApiEndpoint] = useState('https://example.com/api/rooms');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiService.setApiEndpoint(apiEndpoint);
    toast.success('API endpoint updated successfully');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your Smart Home Command Center</p>
        </div>
        
        <Card className="room-card">
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input
                  id="api-endpoint"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  placeholder="https://example.com/api/rooms"
                />
                <p className="text-xs text-muted-foreground">
                  This is the endpoint where room control requests will be sent
                </p>
              </div>
              <Button type="submit">Save Settings</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="room-card">
          <CardHeader>
            <CardTitle>Voice Command Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="font-medium">Power Control</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>"Turn room 1 on"</li>
                    <li>"Turn room 2 off"</li>
                  </ul>
                </div>
                
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="font-medium">Brightness Control</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>"Set brightness to 50 in room 1"</li>
                    <li>"Change brightness to 75 in room 2"</li>
                  </ul>
                </div>
                
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="font-medium">Mode Control</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>"Change mode to party in room 1"</li>
                    <li>"Set mode to movie in room 2"</li>
                  </ul>
                </div>
                
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="font-medium">Scheduling</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    <li>"Schedule 15 minutes for room 1"</li>
                    <li>"Set timer for 30 minutes in room 2"</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;
