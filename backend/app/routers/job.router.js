import { Router } from "express";
import { controllerWrapper } from "../middlewares/controllerwrapper.middleware.js";
import { jobController } from "../controllers/job.controller.js";

export const jobRouter = Router();

jobRouter.get("/jobs", controllerWrapper(jobController.getAllJobs));
