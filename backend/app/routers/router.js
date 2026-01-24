import { Router } from "express";
import { jobRouter } from "./job.router.js";

export const router = Router();

router.use(jobRouter);
