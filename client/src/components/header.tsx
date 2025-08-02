import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Scale className="text-legal-gold w-8 h-8 mr-3" />
              <span className="text-legal-navy font-bold text-xl">LegalAI India</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-legal-navy hover:text-legal-blue transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="text-legal-gray hover:text-legal-blue transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("ai-chat")}
                className="text-legal-gray hover:text-legal-blue transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                AI Chat
              </button>
              <button 
                onClick={() => scrollToSection("legal-resources")}
                className="text-legal-gray hover:text-legal-blue transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Legal Resources
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-legal-gray hover:text-legal-blue transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection("ai-chat")}
              className="bg-legal-blue hover:bg-legal-navy text-white px-6 py-2 rounded-lg transition-colors duration-300 font-medium"
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-legal-navy hover:text-legal-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection("home")}
                className="block px-3 py-2 text-legal-navy hover:text-legal-blue transition-colors duration-300 text-base font-medium w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="block px-3 py-2 text-legal-gray hover:text-legal-blue transition-colors duration-300 text-base font-medium w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("ai-chat")}
                className="block px-3 py-2 text-legal-gray hover:text-legal-blue transition-colors duration-300 text-base font-medium w-full text-left"
              >
                AI Chat
              </button>
              <button 
                onClick={() => scrollToSection("legal-resources")}
                className="block px-3 py-2 text-legal-gray hover:text-legal-blue transition-colors duration-300 text-base font-medium w-full text-left"
              >
                Legal Resources
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-legal-gray hover:text-legal-blue transition-colors duration-300 text-base font-medium w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
