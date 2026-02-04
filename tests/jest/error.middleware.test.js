import { errorMiddleware } from "../../app/middlewares/error.middleware.js";
import { NotFoundError } from "../../app/errors/not-found-error.js";
import { BadRequestError } from "../../app/errors/bad-request-error.js";
import { ValidationError } from "../../app/errors/validation.error.js";
import { UnauthorizedError } from "../../app/errors/unauthorized-error.js";
import { JsonWebTokenError } from "../../app/errors/json-web-token.error.js";
import { ForbiddenError } from "../../app/errors/forbidden.error.js";
import { ConflictError } from "../../app/errors/conflict-error.js";
import { jest } from "@jest/globals";

describe("errorMiddleware", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("doit renvoyer un status 400 pour une BadRequestError", () => {
    const error = new BadRequestError("Mauvaise requête");

    errorMiddleware(error, {}, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Mauvaise requête" });
  });

  it("doit renvoyer un status 400 pour une ValidationError", () => {
    const error = new ValidationError("Le champ email est invalide");

    errorMiddleware(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Le champ email est invalide",
    });
  });

  it("doit renvoyer un status 401 pour une UnauthorizedError", () => {
    const error = new UnauthorizedError("Identifiants incorrects");

    errorMiddleware(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Identifiants incorrects",
    });
  });

  it("doit renvoyer un status 401 pour une JsonWebTokenError", () => {
    const error = new JsonWebTokenError("Token expiré");

    errorMiddleware(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token expiré",
    });
  });

  it("doit renvoyer un status 403 pour une ForbiddenError", () => {
    const error = new ForbiddenError("Accès refusé");

    errorMiddleware(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Accès refusé",
    });
  });

  it("doit renvoyer un status 404 pour une NotFoundError", () => {
    const error = new NotFoundError("Utilisateur non trouvé");

    errorMiddleware(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Utilisateur non trouvé",
    });
  });

  it("doit renvoyer un status 409 pour une ConflictError", () => {
    const error = new ConflictError("Cet email est déjà utilisé");

    errorMiddleware(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet email est déjà utilisé",
    });
  });
});
