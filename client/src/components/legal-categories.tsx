import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Briefcase, Gavel, Handshake, FileText } from "lucide-react";

const categories = [
  {
    icon: Home,
    title: "Family Law",
    description: "Hindu Marriage Act, divorce, custody, adoption, and domestic relations",
    color: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-100",
    iconColor: "text-legal-blue",
    buttonColor: "text-legal-blue hover:text-legal-navy"
  },
  {
    icon: Building,
    title: "Property Law",
    description: "Real estate, property disputes, registration, and ownership rights",
    color: "from-green-50 to-emerald-50",
    borderColor: "border-green-100",
    iconColor: "text-green-600",
    buttonColor: "text-green-600 hover:text-green-800"
  },
  {
    icon: Briefcase,
    title: "Employment Law",
    description: "Labour laws, EPF, ESI, workplace rights, and employment contracts",
    color: "from-purple-50 to-violet-50",
    borderColor: "border-purple-100",
    iconColor: "text-purple-600",
    buttonColor: "text-purple-600 hover:text-purple-800"
  },
  {
    icon: Gavel,
    title: "Criminal Law",
    description: "IPC, CrPC, criminal defense, charges, and legal representation",
    color: "from-red-50 to-rose-50",
    borderColor: "border-red-100",
    iconColor: "text-red-600",
    buttonColor: "text-red-600 hover:text-red-800"
  },
  {
    icon: Handshake,
    title: "Business Law",
    description: "Companies Act, GST, corporate formation, and business compliance",
    color: "from-orange-50 to-amber-50",
    borderColor: "border-orange-100",
    iconColor: "text-orange-600",
    buttonColor: "text-orange-600 hover:text-orange-800"
  },
  {
    icon: FileText,
    title: "Consumer Law",
    description: "Consumer Protection Act, consumer rights, and complaint procedures",
    color: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-100",
    iconColor: "text-teal-600",
    buttonColor: "text-teal-600 hover:text-teal-800"
  }
];

export default function LegalCategories() {
  const scrollToAIChat = () => {
    const element = document.getElementById("ai-chat");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-legal-navy mb-4">
            Indian Legal Expertise Areas
          </h2>
          <p className="text-xl text-legal-gray max-w-3xl mx-auto">
            Our AI is trained in Indian law across multiple practice areas to provide comprehensive legal guidance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index}
                className={`bg-gradient-to-br ${category.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${category.borderColor} border`}
              >
                <CardContent className="p-8">
                  <div className={`${category.iconColor} mb-4`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">
                    {category.title}
                  </h3>
                  <p className="text-legal-gray mb-4">
                    {category.description}
                  </p>
                  <Button 
                    variant="ghost"
                    onClick={scrollToAIChat}
                    className={`${category.buttonColor} font-medium transition-colors duration-300 p-0 h-auto`}
                  >
                    Get Help →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
