import { DataTypes, Model } from 'sequelize'
import store from '../store.js'
import Permission from './permission.js'
import Profile from './profile.js'

class Role extends Model {}

Role.init(
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
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { sequelize: store, paranoid: true }
)
Role.hasMany(Permission, { as: 'Role' })
Role.belongsToMany(Permission, { through: 'RolePermission', as: 'Permissions' });


export default Role
