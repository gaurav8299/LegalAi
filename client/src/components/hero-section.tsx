import { Button } from "@/components/ui/button";
import { Bot, Play, Shield, Clock, Star } from "lucide-react";

export default function HeroSection() {
  const scrollToAIChat = () => {
    const element = document.getElementById("ai-chat");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative bg-gradient-to-br from-legal-navy via-blue-900 to-legal-blue min-h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered Legal
            <span className="text-legal-gold"> Consultation</span>
            <span className="block text-2xl md:text-3xl mt-2 text-orange-300">For India 🇮🇳</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Get instant legal guidance based on Indian law powered by advanced AI. Professional, reliable, and available 24/7 for all your Indian legal questions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToAIChat}
              className="bg-legal-gold hover:bg-yellow-500 text-legal-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Bot className="mr-2 h-5 w-5" />
              Start AI Consultation
            </Button>
            <Button 
              variant="outline"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-legal-navy text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-300">
            <div className="flex items-center">
              <Shield className="text-legal-gold mr-2 h-5 w-5" />
              <span>Secure & Confidential</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-legal-gold mr-2 h-5 w-5" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center">
              <Star className="text-legal-gold mr-2 h-5 w-5" />
              <span>AI-Powered Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
