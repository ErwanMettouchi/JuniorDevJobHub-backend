import { Sequelize } from "sequelize";
import { Job } from "../models/associations.js";
import { NotFoundError } from "../errors/not-found-error.js";

export const jobController = {
  getAllJobs: async (_, res, next) => {
    const jobs = await Job.findAll();

    if (jobs.length <= 0) {
      return next(new NotFoundError("Jobs non trouvés"));
    }

    res.status(200).json({ jobs });
  },
};
