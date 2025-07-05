'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { fetchMessages, sendReply, updateMessageStatus } from '@/store/slices/adminSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Calendar, CheckCircle, Clock, Mail, MapPin, MessageSquare, Phone, Users } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, stats } = useSelector((state: RootState) => state.admin);

  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isReplySending, setIsReplySending] = useState(false);

  // Fetch messages and stats from API
  useEffect(() => {
    if (status === 'loading') return;
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/admin/login');
      return;
    }
    dispatch(fetchMessages());
  }, [session, status, router, dispatch]);

  // Update message status via API
  const handleStatusUpdate = async (messageId: string, newStatus: string) => {
    try {
      await dispatch(updateMessageStatus({ id: messageId, status: newStatus }));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Send reply via API
  const handleSendReply = async () => {
    if (!selectedMessage || !replySubject || !replyContent) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsReplySending(true);
    try {
      await dispatch(sendReply({
        messageId: selectedMessage._id,
        subject: replySubject,
        content: replyContent,
      }));
      toast.success('Reply sent successfully');
      setIsReplyDialogOpen(false);
      setReplySubject('');
      setReplyContent('');
      setSelectedMessage(null);
    } catch (error) {
      toast.error('Failed to send reply');
    } finally {
      setIsReplySending(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || (session.user as any)?.role !== 'admin') {
    if (typeof window !== 'undefined') {
      router.push('/admin/login');
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BBA</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your projects and messages</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
              >
                Back to Website
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                variant="destructive"
                className="ml-2"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Messages</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Messages</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle>Project Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message._id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          <Badge className={getStatusColor(message.status)}>
                            {message.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{message.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{message.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{message.location}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600">
                            <strong>Project:</strong> {message.projectType} 
                            {message.budget && <span> • <strong>Budget:</strong> {message.budget}</span>}
                          </p>
                          <p className="text-sm text-gray-800 mt-1">{message.message}</p>
                        </div>

                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Select
                          value={message.status}
                          onValueChange={(value) => handleStatusUpdate(message._id!, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>

                        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedMessage(message);
                                setReplySubject(`Re: ${message.projectType} Project Inquiry`);
                              }}
                            >
                              Reply
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Reply to {selectedMessage?.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                  id="subject"
                                  value={replySubject}
                                  onChange={(e) => setReplySubject(e.target.value)}
                                  placeholder="Email subject"
                                />
                              </div>
                              <div>
                                <Label htmlFor="content">Message</Label>
                                <Textarea
                                  id="content"
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  placeholder="Write your reply here..."
                                  rows={6}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setIsReplyDialogOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleSendReply} disabled={isReplySending}>
                                  {isReplySending ? "Sending" : "Send Reply"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}