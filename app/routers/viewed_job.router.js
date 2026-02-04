import { Router } from "express";
import { controllerWrapper } from "../middlewares/controllerwrapper.middleware.js";
import { viewedJobController } from "../controllers/viewed_job.controller.js";

export const viewedJobRouter = Router();

/**
 * @swagger
 * /viewed-jobs:
 *   get:
 *     summary: Récupère tous les jobs consultés
 *     tags: [Jobs consultés]
 *     responses:
 *       200:
 *         description: Liste des jobs consultés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewedJobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ViewedJob'
 */
viewedJobRouter.get(
  "/viewed-jobs",
  controllerWrapper(viewedJobController.getViewedJobs),
);
