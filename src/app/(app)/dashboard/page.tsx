'use client';


import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Message } from '@/model/User.model';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { toast } from 'sonner';
import MessageCard from '@/components/MessageCard';

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);


  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get('/api/accept-messages');
      setValue('acceptMessages', response?.data?.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>('/api/get-messages');
        setMessages(response.data.messages || []);
        if (refresh) {
          toast("showing Latest Messages")
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast("Profile URL copied to clipboard");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            Welcome to Your Dashboard
          </h1>

          
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-200">Share Your Profile</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={profileUrl}
                readOnly
                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={copyToClipboard}
                className="bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Copy Link
              </Button>
            </div>
          </div>
        </div>

        
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-gray-200">Message Settings</h2>
              <p className="text-sm text-gray-400">Control who can send you messages</p>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                {...register('acceptMessages')}
                checked={acceptMessages}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
                className="shrink-0"
              />
              <span className={`text-gray-300 min-w-[160px] text-right ${acceptMessages ? 'text-green-500' : 'text-red-500'}`}>
                {acceptMessages ? 'Accepting Messages' : 'Not Accepting Messages'}
              </span>
            </div>
          </div>
        </div>

        
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-200">Your Messages</h2>
            <Button
              variant="outline"
              onClick={() => fetchMessages(true)}
              className="border-gray-700 text-gray-600 hover:bg-gray-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-800" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-400">No messages to display.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;