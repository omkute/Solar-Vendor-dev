import { type Request, type Response, type NextFunction } from "express";
import {prisma} from "@repo/db"

// Create a new lead
export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await prisma.lead.create({
      data: req.body(),
    });
    res.status(201).json(lead);
  } catch (err) {
    next(err);
  }
};

// Get all leads
export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await prisma.lead.findMany({
      include: { createdBy: true, invoiceNo: true },
    });
    res.json(leads);
  } catch (err) {
    next(err);
  }
};

// Get single lead by ID
export const getLeadById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: Number(req.params.id) },
      include: { createdBy: true, invoiceNo: true },
    });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    next(err);
  }
};

// Update lead
export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(lead);
  } catch (err) {
    next(err);
  }
};

// Delete lead
export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.lead.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    next(err);
  }
};