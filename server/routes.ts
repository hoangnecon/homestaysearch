import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all homestays
  app.get("/api/homestays", async (req, res) => {
    try {
      const homestays = await storage.getAllHomestays();
      res.json(homestays);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch homestays" });
    }
  });

  // Get homestay by ID
  app.get("/api/homestays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const homestay = await storage.getHomestayById(id);
      
      if (!homestay) {
        return res.status(404).json({ message: "Homestay not found" });
      }
      
      res.json(homestay);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch homestay" });
    }
  });

  // Search homestays with AI-like natural language processing
  app.post("/api/homestays/search", async (req, res) => {
    try {
      const validatedData = searchSchema.parse(req.body);
      const { query, area, minPrice, maxPrice } = validatedData;
      
      const results = await storage.searchHomestays(query, area, minPrice, maxPrice);
      
      res.json({
        results,
        total: results.length,
        query: validatedData
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid search parameters",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Get homestays by area
  app.get("/api/homestays/area/:area", async (req, res) => {
    try {
      const area = req.params.area;
      const homestays = await storage.getHomestaysByArea(area);
      res.json(homestays);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch homestays by area" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
