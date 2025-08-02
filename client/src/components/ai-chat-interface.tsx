import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Send, Shield, Zap, Brain, History, Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  category?: string;
  confidence?: number;
  disclaimer?: string;
}

interface ConsultationResponse {
  id: string;
  question: string;
  response: string;
  category: string;
  confidence: number;
  disclaimer: string;
  createdAt: string;
}

export default function AiChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Namaste! I'm your AI legal assistant specialized in Indian law. How can I help you with your legal questions today? 🇮🇳\n\n💡 Tip: Try asking about family law, property registration, employment rights, criminal matters, business incorporation, or consumer complaints!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const quickQuestions = [
    "How to file for divorce in India?",
    "Property registration process",
    "Employee rights in India", 
    "How to register a company?",
    "Consumer complaint procedure"
  ];

  const consultationMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("POST", "/api/consultations", { question });
      return response.json() as Promise<ConsultationResponse>;
    },
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: data.id,
        type: "ai",
        content: data.response,
        timestamp: new Date(data.createdAt),
        category: data.category,
        confidence: data.confidence,
        disclaimer: data.disclaimer
      };
      setMessages(prev => [...prev, aiMessage]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI response",
        variant: "destructive"
      });
    }
  });

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    consultationMutation.mutate(inputValue);
    setInputValue("");
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    consultationMutation.mutate(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Get immediate answers to your legal questions powered by advanced AI technology trained on extensive legal databases."
    },
    {
      icon: Brain,
      title: "Smart Classification",
      description: "Our AI automatically categorizes your question and provides specialized guidance based on the relevant area of law."
    },
    {
      icon: History,
      title: "Conversation History",
      description: "Keep track of all your consultations with secure conversation history and follow-up question support."
    },
    {
      icon: Percent,
      title: "Confidence Scoring",
      description: "Each response includes a confidence score to help you understand the reliability of the AI guidance provided."
    }
  ];

  return (
    <section id="ai-chat" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-legal-navy mb-4">
            AI Legal Assistant for India
          </h2>
          <p className="text-xl text-legal-gray max-w-3xl mx-auto">
            Get instant answers to your Indian legal questions with our advanced AI-powered consultation system
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Chat Interface */}
          <Card className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <CardHeader className="bg-legal-navy text-white p-6 flex flex-row items-center space-y-0">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse-legal"></div>
              <span className="font-semibold">LegalAI India Assistant - Online</span>
              <div className="ml-auto flex items-center text-sm">
                <Shield className="mr-1 h-4 w-4" />
                Encrypted
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-6 bg-gray-50 custom-scrollbar">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-sm rounded-lg px-4 py-2 ${
                        message.type === "user" 
                          ? "bg-gray-200 text-legal-navy" 
                          : "bg-legal-blue text-white"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.category && (
                          <div className="mt-2 flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {message.category}
                            </Badge>
                            {message.confidence && (
                              <div className="text-xs opacity-75 flex items-center">
                                <Brain className="mr-1 h-3 w-3" />
                                Confidence: {message.confidence}%
                              </div>
                            )}
                          </div>
                        )}
                        {message.disclaimer && (
                          <p className="text-xs opacity-75 mt-2 border-t border-white/20 pt-2">
                            {message.disclaimer}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {consultationMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="bg-legal-blue text-white rounded-lg px-4 py-2 max-w-xs">
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span className="text-sm">Analyzing your question...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-6 border-t border-gray-200 bg-white">
                {/* Quick Question Buttons */}
                {messages.length <= 1 && (
                  <div className="mb-4">
                    <p className="text-sm text-legal-gray mb-2">Quick questions to get started:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickQuestion(question)}
                          disabled={consultationMutation.isPending}
                          className="text-xs hover:bg-legal-blue hover:text-white border-legal-blue text-legal-blue"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your Indian legal question..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-legal-blue focus:border-legal-blue"
                    disabled={consultationMutation.isPending}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || consultationMutation.isPending}
                    className="bg-legal-blue hover:bg-legal-navy text-white px-6 py-3 rounded-lg transition-colors duration-300"
                  >
                    {consultationMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-legal-gray mt-2 flex items-center">
                  <Shield className="mr-1 h-3 w-3" />
                  This AI provides general legal information based on Indian law only. Consult a licensed advocate for specific legal advice.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start">
                  <div className="bg-legal-gold text-white rounded-lg p-3 mr-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-legal-navy mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-legal-gray">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
