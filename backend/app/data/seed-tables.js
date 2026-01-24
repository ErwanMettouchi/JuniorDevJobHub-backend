import {
  Job,
  ViewedJob,
  Application,
  Favorite,
  Technology,
  User,
} from "../models/associations.js";
import { sequelize } from "./client.js";

async function seed() {
  try {
    // Users
    const users = await User.bulkCreate([
      {
        email: "alice@example.com",
        password: "$2b$10$hashedpassword123456789",
        firstName: "Alice",
        lastName: "Dupont",
      },
      {
        email: "bob@example.com",
        password: "$2b$10$hashedpassword987654321",
        firstName: "Bob",
        lastName: "Martin",
      },
    ]);
    console.log("Users created");

    // Technologies
    const technologies = await Technology.bulkCreate([
      { name: "JavaScript", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "PostgreSQL", category: "database" },
      { name: "React", category: "frontend" },
      { name: "Docker", category: "devops" },
    ]);
    console.log("Technologies created");

    // Jobs
    const jobs = await Job.bulkCreate([
      {
        company: "TechCorp",
        title: "Développeur Full Stack Junior",
        location: "Paris",
        remote: "partial",
        contractType: "CDI",
        salaryMin: 35000,
        salaryMax: 42000,
        description:
          "Rejoignez notre équipe pour développer des applications web modernes.",
        url: "https://techcorp.fr/jobs/fullstack-junior",
        source: "LinkedIn",
        isActive: true,
      },
      {
        company: "StartupIA",
        title: "Développeur Backend Node.js",
        location: "Lyon",
        remote: "full",
        contractType: "CDI",
        salaryMin: 38000,
        salaryMax: 45000,
        description:
          "Développez des APIs performantes pour notre plateforme IA.",
        url: "https://startupia.io/careers/backend",
        source: "WelcomeToTheJungle",
        isActive: true,
      },
    ]);
    console.log("Jobs created");

    // Associate technologies with jobs
    await jobs[0].addTechnologies([
      technologies[0],
      technologies[1],
      technologies[3],
    ]);
    await jobs[1].addTechnologies([
      technologies[1],
      technologies[2],
      technologies[4],
    ]);
    console.log("Job-Technology associations created");

    // Applications
    await Application.bulkCreate([
      {
        userId: users[0].id,
        jobId: jobs[0].id,
        status: "applied",
        note: "Candidature envoyée via le site",
      },
      {
        userId: users[1].id,
        jobId: jobs[1].id,
        status: "interview",
        note: "Entretien prévu la semaine prochaine",
      },
    ]);
    console.log("Applications created");

    // Favorites
    await Favorite.bulkCreate([
      { userId: users[0].id, jobId: jobs[1].id },
      { userId: users[1].id, jobId: jobs[0].id },
    ]);
    console.log("Favorites created");

    // Viewed Jobs
    await ViewedJob.bulkCreate([
      { userId: users[0].id, jobId: jobs[0].id },
      { userId: users[0].id, jobId: jobs[1].id },
      { userId: users[1].id, jobId: jobs[1].id },
    ]);
    console.log("ViewedJobs created");

    console.log("Seeding terminé avec succès !");
  } catch (error) {
    console.error("Erreur lors du seeding:", error);
  } finally {
    await sequelize.close();
  }
}

seed();
