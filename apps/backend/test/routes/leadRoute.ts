import { Router, type RequestHandler } from "express";
import { 
  createLead, 
  getLeads, 
  getLeadById, 
  updateLead, 
  deleteLead 
} from "../controller/leadController.js";

const leadRoute = Router();

leadRoute.post("/", createLead as RequestHandler);
leadRoute.get("/", getLeads as RequestHandler);
leadRoute.get("/:id", getLeadById as RequestHandler);
leadRoute.put("/:id", updateLead as RequestHandler);
leadRoute.delete("/:id", deleteLead as RequestHandler);

export default leadRoute;