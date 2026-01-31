import { Router } from "express";
import { controllerWrapper } from "../middlewares/controllerwrapper.middleware.js";
import { technologyController } from "../controllers/technology.controller.js";

export const techRouter = Router();

/**
 * @openapi
 * /technologies:
 *   get:
 *     summary: Récupère toutes les technologies
 *     tags: [Technologies]
 *     responses:
 *       200:
 *         description: Liste des technologies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 technologies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Technology'
 */
techRouter.get(
  "/technologies",
  controllerWrapper(technologyController.getTechnologies),
);
