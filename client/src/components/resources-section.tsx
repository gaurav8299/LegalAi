import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Book, Search, Phone } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the AI legal advice for Indian law?",
    answer: "Our AI provides 94% accuracy in Indian legal information delivery, but it's important to note that this is general guidance based on Indian law and not a substitute for professional legal counsel from a qualified advocate."
  },
  {
    question: "Is my consultation confidential?",
    answer: "Yes, all consultations are encrypted and confidential. We follow strict data privacy protocols and comply with Indian legal confidentiality standards and IT Act provisions."
  },
  {
    question: "When should I consult a human advocate?",
    answer: "For complex cases, court representation, or when you need legally binding advice, we recommend consulting with a licensed advocate registered with the Bar Council of India in your state."
  },
  {
    question: "What types of Indian legal questions can the AI handle?",
    answer: "Our AI can handle questions across Family Law (Hindu Marriage Act, Muslim Personal Law), Property Law, Employment Law (Labour Laws), Criminal Law (IPC), Business Law (Companies Act, GST), and Consumer Law. It provides general guidance based on Indian legal framework."
  },
  {
    question: "How much does the AI consultation cost?",
    answer: "Basic AI consultations are free for all Indian users. For premium features like detailed case analysis and priority support, we offer affordable subscription plans starting from ₹99/month."
  }
];

const resources = [
  {
    icon: FileText,
    title: "Indian Legal Forms",
    description: "Download commonly used Indian legal document templates",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-legal-blue"
  },
  {
    icon: Book,
    title: "Indian Law Guides",
    description: "Comprehensive guides for Indian legal processes and acts",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: Search,
    title: "Indian Case Law",
    description: "Search through Indian Supreme Court and High Court cases",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Phone,
    title: "Legal Helplines",
    description: "24/7 legal helpline numbers across India",
    color: "bg-orange-50 hover:bg-orange-100",
    iconColor: "text-orange-600"
  }
];

export default function ResourcesSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-legal-navy mb-4">
            Indian Legal Resources
          </h2>
          <p className="text-xl text-legal-gray max-w-3xl mx-auto">
            Access comprehensive Indian legal information, guides, and frequently asked questions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-semibold text-legal-navy mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-legal-blue justify-between"
                    >
                      <span className="font-medium text-legal-navy pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`text-legal-gray transition-transform duration-200 flex-shrink-0 ${
                          openFAQ === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </Button>
                    {openFAQ === index && (
                      <div className="px-6 pb-6 text-legal-gray">
                        {faq.answer}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Legal Library */}
          <div>
            <h3 className="text-2xl font-semibold text-legal-navy mb-6">
              Legal Resource Library
            </h3>
            <img 
              src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Legal books and scales of justice" 
              className="rounded-xl shadow-lg w-full h-48 object-cover mb-6" 
            />
            
            <div className="space-y-4">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div 
                    key={index}
                    className={`flex items-center p-4 ${resource.color} rounded-lg transition-colors duration-300 cursor-pointer`}
                  >
                    <Icon className={`${resource.iconColor} text-xl mr-4 w-5 h-5`} />
                    <div>
                      <h4 className="font-medium text-legal-navy">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-legal-gray">
                        {resource.description}
                      </p>
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
