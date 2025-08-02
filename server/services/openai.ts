import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "invalid_key_placeholder"
});

// Check if API key is properly configured
function isApiKeyConfigured(): boolean {
  const apiKey = process.env.OPENAI_API_KEY;
  return !!(apiKey && apiKey !== "invalid_key_placeholder" && apiKey.length > 10);
}

export interface LegalResponse {
  response: string;
  category: string;
  confidence: number;
  disclaimer: string;
}

// Predefined demo responses for when API key is not configured
const demoResponses: { [key: string]: LegalResponse } = {
  "family": {
    response: "Under the Hindu Marriage Act, 1955, marriage is considered a sacred bond between two individuals. For divorce proceedings, you can file under Section 13 which lists grounds including cruelty, desertion, conversion, mental disorder, etc. The process involves filing a petition in the family court with jurisdiction. Both mutual consent divorce (Section 13B) and contested divorce options are available. You'll need to provide evidence supporting your grounds and follow the mandatory waiting period of 6 months for mutual consent cases.",
    category: "Family Law",
    confidence: 88,
    disclaimer: "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
  },
  "property": {
    response: "Property registration in India is governed by the Registration Act, 1908. For property transactions, you must register the sale deed with the Sub-Registrar office in the jurisdiction where the property is located. Required documents include title deeds, NOC from society/builder, property tax receipts, and identity proofs. Stamp duty varies by state (typically 3-10% of property value). Registration fees are usually 1% of property value. Ensure proper verification of title documents and encumbrance certificate before purchase.",
    category: "Property Law", 
    confidence: 92,
    disclaimer: "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
  },
  "employment": {
    response: "Under Indian Labour laws, employees have several protections and rights. The Payment of Wages Act ensures timely salary payment, while the Employees' Provident Fund (EPF) Act provides retirement benefits. For workplace harassment, the Sexual Harassment of Women at Workplace Act, 2013 mandates Internal Complaints Committees. Termination requires proper notice as per Industrial Disputes Act. Maternity benefits are covered under the Maternity Benefit Act, providing 26 weeks paid leave. Always maintain documentation of employment terms, salary slips, and any workplace incidents.",
    category: "Employment Law",
    confidence: 90,
    disclaimer: "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
  },
  "criminal": {
    response: "Under the Indian Penal Code (IPC), criminal offenses are categorized as cognizable/non-cognizable and bailable/non-bailable. For any criminal charges, you have the right to legal representation and bail (except in specific cases). The Code of Criminal Procedure (CrPC) governs the process. If falsely accused, gather evidence and witnesses for your defense. For filing complaints, approach the nearest police station or magistrate. Remember that confession before police is not admissible in court under Section 25 of Indian Evidence Act.",
    category: "Criminal Law",
    confidence: 87,
    disclaimer: "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
  },
  "business": {
    response: "Business incorporation in India is governed by the Companies Act, 2013. For Private Limited Companies, you need minimum 2 directors and 2 shareholders. Required documents include DIN, DSC, and MOA/AOA. GST registration is mandatory if annual turnover exceeds ₹40 lakhs (₹10 lakhs for services). Comply with ROC filings, maintain statutory registers, and file annual returns. For contracts, ensure proper stamp duty payment and registration where required. Consider intellectual property protection for your business assets.",
    category: "Business Law",
    confidence: 93,
    disclaimer: "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
  },
  "consumer": {
    response: "The Consumer Protection Act, 2019 provides comprehensive protection against defective goods and deficient services. You can file complaints in Consumer Courts - District, State, or National level based on claim value. The Act covers e-commerce transactions and provides for product liability. For complaints up to ₹20 lakhs, approach District Consumer Disputes Redressal Commission. Remedies include replacement, refund, compensation, and discontinuation of unfair trade practices. Keep purchase receipts, warranty cards, and communication records as evidence.",
    category: "Consumer Law",
    confidence: 91,
    disclaimer: "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
  },
  "default": {
    response: "Thank you for your legal question. This appears to be a matter that requires careful consideration of Indian legal provisions. Based on Indian law, such matters typically involve specific statutory procedures and documentation requirements. The resolution would depend on various factors including jurisdiction, applicable statutes, and specific circumstances of your case. I recommend gathering all relevant documents and evidence related to your matter.",
    category: "General Legal",
    confidence: 85,
    disclaimer: "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
  }
};

function getDemoResponse(question: string): LegalResponse {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("marriage") || lowerQuestion.includes("divorce") || lowerQuestion.includes("family") || lowerQuestion.includes("custody")) {
    return demoResponses["family"];
  } else if (lowerQuestion.includes("property") || lowerQuestion.includes("land") || lowerQuestion.includes("real estate") || lowerQuestion.includes("registration")) {
    return demoResponses["property"];
  } else if (lowerQuestion.includes("job") || lowerQuestion.includes("employment") || lowerQuestion.includes("salary") || lowerQuestion.includes("workplace") || lowerQuestion.includes("epf")) {
    return demoResponses["employment"];
  } else if (lowerQuestion.includes("criminal") || lowerQuestion.includes("police") || lowerQuestion.includes("arrest") || lowerQuestion.includes("bail") || lowerQuestion.includes("charge")) {
    return demoResponses["criminal"];
  } else if (lowerQuestion.includes("business") || lowerQuestion.includes("company") || lowerQuestion.includes("gst") || lowerQuestion.includes("startup") || lowerQuestion.includes("incorporation")) {
    return demoResponses["business"];
  } else if (lowerQuestion.includes("consumer") || lowerQuestion.includes("defective") || lowerQuestion.includes("refund") || lowerQuestion.includes("complaint") || lowerQuestion.includes("product")) {
    return demoResponses["consumer"];
  } else {
    return demoResponses["default"];
  }
}

export async function getLegalAdvice(question: string): Promise<LegalResponse> {
  // If API key is not configured, return demo response
  if (!isApiKeyConfigured()) {
    console.log("OpenAI API key not configured, returning demo response");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    return getDemoResponse(question);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional AI legal assistant specializing in Indian law. Analyze the user's legal question and provide guidance based on Indian legal system in the following areas:
          
          Legal Categories:
          - Family Law (Hindu Marriage Act, Muslim Personal Law, divorce, custody, adoption, domestic relations)
          - Property Law (Indian Property laws, real estate, property disputes, ownership rights)
          - Employment Law (Indian Labour laws, workplace rights, EPF, ESI, discrimination, contracts)
          - Criminal Law (Indian Penal Code, CrPC, criminal defense, charges, legal representation)
          - Business Law (Companies Act, GST, corporate formation, contracts, compliance)
          - Consumer Law (Consumer Protection Act, consumer rights, complaints)
          
          Respond with JSON in this exact format:
          {
            "response": "detailed legal guidance (2-3 paragraphs)",
            "category": "one of the categories above",
            "confidence": number between 70-95,
            "disclaimer": "standard legal disclaimer"
          }
          
          Important: Always include appropriate disclaimers mentioning Indian legal context and recommend consulting a licensed advocate/lawyer registered with Bar Council of India for specific legal advice.`
        },
        {
          role: "user",
          content: question
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      response: result.response || "I apologize, but I couldn't generate a proper response. Please try rephrasing your question.",
      category: result.category || "General Legal",
      confidence: Math.max(70, Math.min(95, result.confidence || 75)),
      disclaimer: result.disclaimer || "This AI provides general legal information based on Indian law and does not constitute legal advice. Please consult a licensed advocate registered with Bar Council of India for specific legal counsel."
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    // Return demo response as fallback
    return getDemoResponse(question);
  }
}

export async function classifyLegalCategory(question: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Classify the following legal question into one of these Indian legal categories:
          - Family Law
          - Property Law  
          - Employment Law
          - Criminal Law
          - Business Law
          - Consumer Law
          
          Respond with JSON: {"category": "exact category name"}`
        },
        {
          role: "user",
          content: question
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 50,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.category || "General Legal";
  } catch (error) {
    console.error("Category classification error:", error);
    return "General Legal";
  }
}
