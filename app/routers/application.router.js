import { Router } from "express";
import { controllerWrapper } from "../middlewares/controllerwrapper.middleware.js";
import { applicationController } from "../controllers/application.controller.js";

export const appRouter = Router();

/**
 * @openapi
 * /applications:
 *   get:
 *     summary: Récupère toutes les candidatures
 *     tags: [Candidatures]
 *     responses:
 *       200:
 *         description: Liste des candidatures
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 */
appRouter.get(
  "/applications",
  controllerWrapper(applicationController.getApplications),
);
