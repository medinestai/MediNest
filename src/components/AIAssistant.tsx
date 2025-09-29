import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Bot, Send, User, Heart, Brain, Activity, Shield } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface AIAssistantProps {
  onNavigate: (view: string) => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export function AIAssistant({ onNavigate }: AIAssistantProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. I can help you with medication reminders, symptom tracking, general health advice, and answering your medical questions. How can I assist you today?",
      sender: 'ai',
      timestamp: '10:00 AM'
    }
  ]);

  const quickActions = [
    {
      title: 'Symptom Checker',
      description: 'Describe your symptoms for guidance',
      icon: Heart,
      prompt: 'I\'m experiencing some symptoms and would like guidance'
    },
    {
      title: 'Medication Info',
      description: 'Get information about medications',
      icon: Shield,
      prompt: 'Can you tell me about my medication?'
    },
    {
      title: 'Health Tips',
      description: 'Get personalized health advice',
      icon: Brain,
      prompt: 'Can you give me some health tips?'
    },
    {
      title: 'Exercise Guidance',
      description: 'Get workout recommendations',
      icon: Activity,
      prompt: 'What exercises would you recommend for me?'
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(message),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('feeling')) {
      return "I understand you're experiencing symptoms. While I can provide general guidance, it's important to consult with a healthcare professional for proper diagnosis. Can you describe your symptoms in more detail? Also, consider scheduling an appointment if symptoms persist or worsen.";
    }
    
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return "I can help with general medication information. Always follow your doctor's prescribed dosage and timing. If you have questions about side effects or interactions, consult your pharmacist or doctor. Would you like me to help you set up medication reminders?";
    }
    
    if (lowerMessage.includes('health tips') || lowerMessage.includes('advice')) {
      return "Here are some general health tips: 1) Stay hydrated - aim for 8 glasses of water daily, 2) Get 7-9 hours of quality sleep, 3) Exercise regularly - even 30 minutes of walking helps, 4) Eat a balanced diet with plenty of fruits and vegetables, 5) Manage stress through meditation or relaxation techniques. What specific area would you like to focus on?";
    }
    
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      return "Exercise is great for overall health! For beginners, I recommend starting with 30 minutes of moderate activity 5 days a week. This could include brisk walking, swimming, or cycling. Always consult your doctor before starting a new exercise program, especially if you have any medical conditions. Would you like specific exercise recommendations based on your health goals?";
    }
    
    return "Thank you for your question. I'm here to provide general health information and support. For specific medical concerns, please consult with your healthcare provider. Is there anything else I can help you with regarding your health and wellness?";
  };

  const handleQuickAction = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => onNavigate('home')} 
            variant="outline"
            className="bg-white/50 border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl text-black flex items-center gap-2">
              <Bot className="w-8 h-8 text-purple-600" />
              AI Health Assistant
            </h1>
            <p className="text-gray-600">Get instant health guidance and support</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  MediBot Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${
                          msg.sender === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.sender === 'user' 
                            ? 'bg-black text-white' 
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-black text-white'
                            : 'bg-white/50 text-black border border-gray-200'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="mt-4 flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything about your health..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-white/50 border-gray-200"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="backdrop-blur-lg bg-white/70 border border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-3 bg-white/50 border-gray-200 hover:bg-white/70"
                      onClick={() => handleQuickAction(action.prompt)}
                    >
                      <Icon className="w-5 h-5 mr-3 text-purple-600" />
                      <div className="text-left">
                        <div className="text-sm text-black">{action.title}</div>
                        <div className="text-xs text-gray-600">{action.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="backdrop-blur-lg bg-gradient-to-br from-purple-50/70 to-purple-100/70 border border-purple-200/50">
              <CardHeader>
                <CardTitle className="text-black">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• General health information</p>
                  <p>• Medication guidance</p>
                  <p>• Symptom assessment</p>
                  <p>• Wellness recommendations</p>
                  <p>• Exercise suggestions</p>
                  <p>• Nutritional advice</p>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-lg bg-gradient-to-br from-yellow-50/70 to-yellow-100/70 border border-yellow-200/50">
              <CardHeader>
                <CardTitle className="text-black">Important Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  This AI assistant provides general health information only. 
                  For medical emergencies or specific health concerns, please 
                  consult with qualified healthcare professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}