import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { controllerWrapper } from "../middlewares/controllerwrapper.middleware.js";

export const userRouter = Router();

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Un compte avec cet email existe déjà
 */
userRouter.post("/signup", controllerWrapper(userController.signup));

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Email ou mot de passe incorrect
 */
userRouter.post("/login", controllerWrapper(userController.login));
