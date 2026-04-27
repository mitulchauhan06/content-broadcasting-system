import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Content = sequelize.define("Content", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  file_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  file_type: {
    type: DataTypes.STRING,
  },

  file_size: {
    type: DataTypes.INTEGER,
  },

  uploaded_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("uploaded", "pending", "approved", "rejected"),
    defaultValue: "pending",
  },

  rejection_reason: {
    type: DataTypes.TEXT,
  },

  approved_by: {
    type: DataTypes.INTEGER,
  },

  approved_at: {
    type: DataTypes.DATE,
  },

  rotation_order: {
  type: DataTypes.INTEGER,
},

duration: {
  type: DataTypes.INTEGER, // in minutes
},


    start_time: {
        type: DataTypes.DATE,
    },

    end_time: {
        type: DataTypes.DATE,
    }



}, {
  timestamps: true
});

export default Content;