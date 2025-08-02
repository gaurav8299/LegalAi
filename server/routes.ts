import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getLegalAdvice } from "./services/openai";
import { createConsultationSchema, insertContactRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Legal consultation endpoint
  app.post("/api/consultations", async (req, res) => {
    try {
      const { question, category } = createConsultationSchema.parse(req.body);
      
      // Get AI response
      const aiResponse = await getLegalAdvice(question);
      
      // Store consultation
      const consultation = await storage.createConsultation({
        userId: null, // Anonymous for now
        question,
        response: aiResponse.response,
        category: aiResponse.category,
        confidence: aiResponse.confidence,
      });

      res.json({
        id: consultation.id,
        question: consultation.question,
        response: consultation.response,
        category: consultation.category,
        confidence: consultation.confidence,
        disclaimer: aiResponse.disclaimer,
        createdAt: consultation.createdAt,
      });
    } catch (error) {
      console.error("Consultation error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to process consultation" 
      });
    }
  });

  // Get consultation history
  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json(consultations.slice(0, 10)); // Return last 10 consultations
    } catch (error) {
      console.error("Get consultations error:", error);
      res.status(500).json({ message: "Failed to fetch consultations" });
    }
  });

  // Get specific consultation
  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const consultation = await storage.getConsultationById(req.params.id);
      if (!consultation) {
        return res.status(404).json({ message: "Consultation not found" });
      }
      res.json(consultation);
    } catch (error) {
      console.error("Get consultation error:", error);
      res.status(500).json({ message: "Failed to fetch consultation" });
    }
  });

  // Contact request endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(contactData);
      res.json({
        id: contactRequest.id,
        message: "Contact request submitted successfully. We will respond within 2 hours."
      });
    } catch (error) {
      console.error("Contact request error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid contact information", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit contact request" });
    }
  });

  // Get contact requests (admin endpoint)
  app.get("/api/contact", async (req, res) => {
    try {
      const requests = await storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      console.error("Get contact requests error:", error);
      res.status(500).json({ message: "Failed to fetch contact requests" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // API status endpoint
  app.get("/api/status", (req, res) => {
    const hasApiKey = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10);
    res.json({ 
      openaiConnected: hasApiKey,
      mode: hasApiKey ? "live" : "demo",
      message: hasApiKey ? "AI powered by OpenAI GPT-4o" : "Demo mode - Connect OpenAI API for full functionality"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
