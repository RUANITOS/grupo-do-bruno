import { DataTypes, Model } from 'sequelize'
import store from '../store.js'

import RolePermission from './role-permission.js'

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
    description: {
      type: DataTypes.STRING
    }
  },
  { sequelize: store, paranoid: true }
)

RolePermission.belongsTo(Permission, { as: 'permission' })

export default Permission
