import { DataTypes, Model } from 'sequelize'
import store from '../store.js'

import UserRole from './user-role.js'
import RolePermission from './role-permission.js'

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    }
  },
  { sequelize: store, paranoid: true }
)

UserRole.belongsTo(Role, { as: 'role' })
RolePermission.belongsTo(Role, { as: 'role' })

export default Role
