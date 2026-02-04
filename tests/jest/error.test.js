import { ConflictError } from "../../app/errors/conflict-error.js";
import { NotFoundError } from "../../app/errors/not-found-error.js";
import { UnauthorizedError } from "../../app/errors/unauthorized-error.js";

describe("Custom error classes", () => {
  // ====================
  // TEST 1 : Nom des erreurs
  // ====================
  it("ConflictError doit avoir le name 'ConflictError'", () => {
    const error = new ConflictError("Email déjà utilisé");
    expect(error.name).toBe("ConflictError");
  });

  it("NotFoundError doit avoir le name 'NotFoundError'", () => {
    const error = new NotFoundError("Ressource non trouvée");
    expect(error.name).toBe("NotFoundError");
  });

  it("UnauthorizedError doit avoir le name 'UnauthorizedError'", () => {
    const error = new UnauthorizedError("Action non autorisée");
    expect(error.name).toBe("UnauthorizedError");
  });

  // ====================
  // TEST 2 : Message d'erreur
  // ====================
  it("ConflictError doit contenir le message passé", () => {
    const error = new ConflictError("Email déjà utilisé");
    expect(error.message).toBe("Email déjà utilisé");
  });

  it("NotFoundError doit contenir le message passé", () => {
    const error = new NotFoundError("Ressource non trouvée");
    expect(error.message).toBe("Ressource non trouvée");
  });

  it("UnauthorizedError doit contenir le message passé", () => {
    const error = new UnauthorizedError("Action non autorisée");
    expect(error.message).toBe("Action non autorisée");
  });

  // ====================
  // TEST 3 : Instance d'erreur
  // ====================

  it("ConflictError doit être une instance de Error", () => {
    const error = new ConflictError("test");
    expect(error).toBeInstanceOf(Error);
  });

  it("NotFoundError doit être une instance de Error", () => {
    const error = new NotFoundError("test");
    expect(error).toBeInstanceOf(Error);
  });

  it("UnauthorizedError doit être une instance de Error", () => {
    const error = new UnauthorizedError("test");
    expect(error).toBeInstanceOf(Error);
  });
});
