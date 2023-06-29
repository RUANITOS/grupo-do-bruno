import { DataTypes, Model } from 'sequelize'
import store from '../store.js'
import Role from './role.js'

class Profile extends Model {}
Profile.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { sequelize: store, paranoid: true }
)
Profile.tableName = "Profile";
console.log(`aaaaaaaaaaaaaaaaaa  ${Profile.name}`)
Role.belongsToMany(Profile, { through: 'ProfileRole', as: 'profilessss', tableName: 'ProfileRole' });
Profile.belongsToMany(Role, { through: 'ProfileRole', as: 'roles', tableName: 'ProfileRole' });


export default Profile
