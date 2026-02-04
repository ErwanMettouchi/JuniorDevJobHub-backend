import { Router } from "express";
import { controllerWrapper } from "../middlewares/controllerwrapper.middleware.js";
import { favoriteController } from "../controllers/favorite.controller.js";

export const favoriteRouter = Router();

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Récupère tous les favoris
 *     tags: [Favoris]
 *     responses:
 *       200:
 *         description: Liste des favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorites:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Favorite'
 */
favoriteRouter.get(
  "/favorites",
  controllerWrapper(favoriteController.getFavorites),
);
