import { Model, DataTypes } from "sequelize";

export default class RunningContextModel extends Model { 
  public static modelDefinition = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    organizations: {
      type: DataTypes.STRING,
      allowNull: false
    },

    dryRun: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cronRunning: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }

  public id!: string;
  public organizations: string;
  public dryRun: boolean;
  public cronRunning: boolean;

};

