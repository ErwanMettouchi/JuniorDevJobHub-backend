import { jest } from "@jest/globals";
import { NotFoundError } from "../../app/errors/not-found-error.js";

// On remplace le vrai module associations.js par un faux (mock)
// Au lieu d'appeler la vraie base de données, Job.findAll et Job.findByPk
// seront des fonctions factices qu'on peut contrôler dans nos tests
jest.unstable_mockModule("../../app/models/associations.js", () => ({
  Job: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

// On importe les versions mockées APRÈS avoir déclaré le mock
const { Job } = await import("../../app/models/associations.js");
const { jobController } =
  await import("../../app/controllers/job.controller.js");

describe("Job Controller", () => {
  describe("Récupérer un job", () => {
    test("Quand le job n'est pas trouvé, renvoie une NotFoundError", async () => {
      // On simule req, res et next
      const req = { params: { id: 10 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      // On dit à findByPk de renvoyer null (= aucun job trouvé)
      Job.findByPk.mockResolvedValueOnce(null);

      // On appelle le controller
      await jobController.getOneJob(req, res, next);

      // On récupère l'erreur passée à next()
      const [error] = next.mock.calls[0];

      // On vérifie que c'est bien une NotFoundError avec le bon message
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.name).toBe("NotFoundError");
      expect(error.message).toBe("Job non trouvé");
    });
  });
});
