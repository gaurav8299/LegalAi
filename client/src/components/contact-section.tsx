import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  legalArea: string;
  description: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    legalArea: "",
    description: ""
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message || "Contact request submitted successfully!",
      });
      setFormData({ name: "", email: "", legalArea: "", description: "" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit contact request",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.legalArea || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      content: "Connaught Place, New Delhi\nLegal District, Delhi 110001"
    },
    {
      icon: Phone,
      title: "Phone Support",
      content: "+91 11 123-LEGAL\nAvailable 24/7 for emergencies"
    },
    {
      icon: Mail,
      title: "Email Contact",
      content: "support@legalai-india.com\nResponse within 2 hours"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Saturday: 9:00 AM - 7:00 PM IST\nSunday: Emergency only"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-legal-navy to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Professional Legal Support in India
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Need more than AI assistance? Connect with our network of qualified Indian legal advocates
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white rounded-2xl p-8 shadow-2xl">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-legal-navy mb-6">
                Request Professional Consultation
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-legal-gray mb-2">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-legal-blue focus:border-legal-blue"
                    disabled={contactMutation.isPending}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-legal-gray mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-legal-blue focus:border-legal-blue"
                    disabled={contactMutation.isPending}
                  />
                </div>
                
                <div>
                  <Label htmlFor="legalArea" className="block text-sm font-medium text-legal-gray mb-2">
                    Legal Area
                  </Label>
                  <Select 
                    value={formData.legalArea} 
                    onValueChange={(value) => handleInputChange("legalArea", value)}
                    disabled={contactMutation.isPending}
                  >
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-legal-blue focus:border-legal-blue">
                      <SelectValue placeholder="Select legal area..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family-law">Family Law</SelectItem>
                      <SelectItem value="property-law">Property Law</SelectItem>
                      <SelectItem value="employment-law">Employment Law</SelectItem>
                      <SelectItem value="criminal-law">Criminal Law</SelectItem>
                      <SelectItem value="business-law">Business Law</SelectItem>
                      <SelectItem value="consumer-law">Consumer Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description" className="block text-sm font-medium text-legal-gray mb-2">
                    Case Description
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-legal-blue focus:border-legal-blue"
                    placeholder="Please describe your legal situation..."
                    disabled={contactMutation.isPending}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-legal-blue hover:bg-legal-navy text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Consultation"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="text-white space-y-8">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Modern law office with professional atmosphere" 
              className="rounded-xl shadow-lg w-full h-48 object-cover" 
            />
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="bg-legal-gold text-legal-navy rounded-lg p-3 mr-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{info.title}</h4>
                      <p className="text-gray-300 whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
