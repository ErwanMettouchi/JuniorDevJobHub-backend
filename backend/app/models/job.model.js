import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../data/client.js";

export class Job extends Sequelize.Model {}

Job.init(
  {
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remote: {
      type: DataTypes.ENUM("full", "partial", "none", "not_specified"),
      defaultValue: "not_specified",
    },
    contractType: {
      type: DataTypes.ENUM("CDI", "CDD", "stage", "alternance", "freelance"),
      allowNull: true,
    },
    salaryMin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    salaryMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      url: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "job",
    timestamps: true,
  },
);
