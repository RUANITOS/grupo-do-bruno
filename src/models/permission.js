import { DataTypes, Model } from 'sequelize'
import store from '../store.js'
import Role from './role.js'

class Permission extends Model {}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { sequelize: store, paranoid: true }
)


export default Permission
