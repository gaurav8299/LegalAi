import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, BookOpen, Scale, FileText, Search, ExternalLink, Calendar, User } from "lucide-react";
import { useState } from "react";
import LawGuideContent from "./law-guide-content";

const legalForms = [
  {
    title: "Divorce Petition Template",
    category: "Family Law",
    description: "Standard divorce petition format under Hindu Marriage Act, 1955",
    downloadUrl: "#",
    format: "PDF"
  },
  {
    title: "Property Sale Deed Format",
    category: "Property Law", 
    description: "Complete property sale deed template as per Registration Act",
    downloadUrl: "#",
    format: "PDF"
  },
  {
    title: "Employment Contract Template",
    category: "Employment Law",
    description: "Standard employment agreement compliant with Labour Laws",
    downloadUrl: "#",
    format: "PDF"
  },
  {
    title: "Company Registration Forms",
    category: "Business Law",
    description: "MOA, AOA and incorporation documents for Companies Act, 2013",
    downloadUrl: "#",
    format: "PDF"
  },
  {
    title: "Consumer Complaint Format",
    category: "Consumer Law",
    description: "Consumer complaint template for Consumer Protection Act, 2019",
    downloadUrl: "#",
    format: "PDF"
  },
  {
    title: "Criminal Complaint (FIR)",
    category: "Criminal Law",
    description: "First Information Report format under CrPC",
    downloadUrl: "#",
    format: "PDF"
  }
];

const lawGuides = [
  {
    id: "hindu-marriage-act",
    title: "Hindu Marriage Act, 1955 - Complete Guide",
    description: "Comprehensive guide covering marriage, divorce, maintenance, and custody provisions",
    sections: ["Marriage Requirements", "Grounds for Divorce", "Maintenance Laws", "Child Custody"],
    readTime: "25 min read"
  },
  {
    id: "property-registration",
    title: "Property Registration in India",
    description: "Step-by-step guide for property registration under Registration Act, 1908",
    sections: ["Documentation Required", "Stamp Duty Calculation", "Registration Process", "Legal Compliance"],
    readTime: "20 min read"
  },
  {
    id: "labour-laws",
    title: "Indian Labour Laws Compliance",
    description: "Essential guide for employers and employees on labour law compliance",
    sections: ["Contract Labour Act", "Minimum Wages Act", "ESI & PF Compliance", "Industrial Disputes"],
    readTime: "30 min read"
  },
  {
    id: "companies-act",
    title: "Company Incorporation Under Companies Act, 2013",
    description: "Complete guide for business registration and corporate compliance",
    sections: ["Business Structure Selection", "Incorporation Process", "Annual Compliances", "Board Meetings"],
    readTime: "35 min read"
  },
  {
    id: "consumer-protection",
    title: "Consumer Rights and Remedies",
    description: "Understanding consumer protection under Consumer Protection Act, 2019",
    sections: ["Consumer Rights", "Filing Complaints", "Remedies Available", "Alternative Dispute Resolution"],
    readTime: "18 min read"
  },
  {
    id: "criminal-procedure",
    title: "Criminal Procedure Code (CrPC) Essentials",
    description: "Key provisions of CrPC for understanding criminal proceedings",
    sections: ["FIR Process", "Investigation Procedure", "Trial Process", "Bail Provisions"],
    readTime: "40 min read"
  }
];

const recentCases = [
  {
    title: "Shayara Bano v. Union of India (2017)",
    court: "Supreme Court of India",
    citation: "AIR 2017 SC 4609",
    category: "Family Law",
    summary: "Triple Talaq declared unconstitutional and void",
    date: "22 Aug 2017",
    keyPoints: ["Constitutional validity of Triple Talaq", "Fundamental Rights violation", "Gender equality"]
  },
  {
    title: "K.S. Puttaswamy v. Union of India (2017)",
    court: "Supreme Court of India", 
    citation: "AIR 2017 SC 4161",
    category: "Constitutional Law",
    summary: "Right to Privacy declared fundamental right under Article 21",
    date: "24 Aug 2017",
    keyPoints: ["Right to Privacy", "Fundamental Rights", "Article 21 interpretation"]
  },
  {
    title: "Vishaka v. State of Rajasthan (1997)",
    court: "Supreme Court of India",
    citation: "AIR 1997 SC 3011",
    category: "Employment Law",
    summary: "Guidelines for prevention of sexual harassment at workplace",
    date: "13 Aug 1997",
    keyPoints: ["Workplace harassment", "Women's rights", "Employer responsibility"]
  },
  {
    title: "M.C. Mehta v. Union of India (1987)",
    court: "Supreme Court of India",
    citation: "AIR 1987 SC 1086",
    category: "Environmental Law",
    summary: "Oleum Gas Leak case - Absolute liability principle established",
    date: "20 Dec 1986",
    keyPoints: ["Absolute liability", "Environmental protection", "Industrial accidents"]
  }
];

const legalArticles = [
  {
    title: "Understanding the New Criminal Laws in India 2024",
    author: "Legal Team",
    date: "15 Jan 2024",
    category: "Criminal Law",
    readTime: "12 min read",
    summary: "Comprehensive analysis of Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam",
    tags: ["BNS", "BNSS", "BSA", "Criminal Law Reform"]
  },
  {
    title: "GST Compliance for Small Businesses in 2024",
    author: "Tax Expert",
    date: "08 Feb 2024", 
    category: "Business Law",
    readTime: "15 min read",
    summary: "Updated guide on GST registration, filing returns, and compliance requirements for small businesses",
    tags: ["GST", "Small Business", "Tax Compliance", "MSME"]
  },
  {
    title: "Women's Property Rights in India: Recent Developments",
    author: "Family Law Specialist",
    date: "22 Mar 2024",
    category: "Family Law", 
    readTime: "18 min read",
    summary: "Recent amendments and court judgments affecting women's property rights in India",
    tags: ["Women's Rights", "Property Law", "Inheritance", "Gender Equality"]
  },
  {
    title: "Digital Personal Data Protection Act, 2023: What You Need to Know",
    author: "Privacy Law Expert",
    date: "05 Apr 2024",
    category: "Technology Law",
    readTime: "20 min read",
    summary: "Complete guide to India's new data protection law and its implications for businesses and individuals",
    tags: ["Data Protection", "Privacy", "Digital Rights", "DPDP Act"]
  }
];

export default function LegalResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const categories = ["All", "Family Law", "Property Law", "Employment Law", "Criminal Law", "Business Law", "Consumer Law"];

  const filteredCases = recentCases.filter(caseItem => 
    (selectedCategory === "All" || caseItem.category === selectedCategory) &&
    (searchQuery === "" || 
     caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     caseItem.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Show detailed guide content if a guide is selected
  if (selectedGuide) {
    return (
      <LawGuideContent 
        guideId={selectedGuide} 
        onBack={() => setSelectedGuide(null)} 
      />
    );
  }

  return (
    <div id="legal-resources" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-legal-navy mb-4">Legal Resources Hub</h2>
          <p className="text-xl text-legal-gray max-w-3xl mx-auto">
            Access comprehensive Indian legal resources, forms, guides, case law, and expert articles
          </p>
        </div>

        {/* Legal Forms Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <FileText className="h-8 w-8 text-legal-blue mr-3" />
            <h3 className="text-3xl font-bold text-legal-navy">Indian Legal Forms</h3>
          </div>
          <p className="text-legal-gray mb-8">Download commonly used Indian legal document templates</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalForms.map((form, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{form.title}</span>
                    <Badge variant="outline" className="text-xs">{form.format}</Badge>
                  </CardTitle>
                  <CardDescription>
                    <Badge className="mb-2 bg-legal-blue text-white">{form.category}</Badge>
                    <p>{form.description}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-legal-blue hover:bg-legal-navy text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Law Guides Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <BookOpen className="h-8 w-8 text-legal-blue mr-3" />
            <h3 className="text-3xl font-bold text-legal-navy">Indian Law Guides</h3>
          </div>
          <p className="text-legal-gray mb-8">Comprehensive guides for Indian legal processes and acts</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {lawGuides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                  <CardDescription>
                    <p className="mb-3">{guide.description}</p>
                    <Badge variant="outline" className="text-xs">{guide.readTime}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Sections:</h4>
                    <div className="flex flex-wrap gap-2">
                      {guide.sections.map((section, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white"
                    onClick={() => setSelectedGuide(guide.id)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Case Law Search Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Scale className="h-8 w-8 text-legal-blue mr-3" />
            <h3 className="text-3xl font-bold text-legal-navy">Indian Case Law</h3>
          </div>
          <p className="text-legal-gray mb-8">Search through Indian Supreme Court and High Court cases</p>
          
          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search cases by title, summary, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button className="bg-legal-blue hover:bg-legal-navy text-white">
                <Search className="h-4 w-4 mr-2" />
                Search Cases
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-legal-blue hover:bg-legal-navy" : "border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Case Results */}
          <div className="space-y-6">
            {filteredCases.map((case_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{case_.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-legal-gray mb-2">
                        <span className="flex items-center">
                          <Scale className="h-4 w-4 mr-1" />
                          {case_.court}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {case_.date}
                        </span>
                      </div>
                      <Badge className="bg-legal-blue text-white">{case_.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-legal-gray mb-4">{case_.summary}</p>
                  <div className="mb-4">
                    <p className="font-semibold text-sm mb-2">Citation: {case_.citation}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Points:</h4>
                      <div className="flex flex-wrap gap-2">
                        {case_.keyPoints.map((point, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Case
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Legal Articles Section */}
        <section>
          <div className="flex items-center mb-8">
            <User className="h-8 w-8 text-legal-blue mr-3" />
            <h3 className="text-3xl font-bold text-legal-navy">Legal Articles & Insights</h3>
          </div>
          <p className="text-legal-gray mb-8">Expert analysis and insights on current Indian legal topics</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {legalArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-legal-gray mb-2">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-legal-blue text-white">{article.category}</Badge>
                    <Badge variant="outline" className="text-xs">{article.readTime}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-legal-gray mb-4">{article.summary}</p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}