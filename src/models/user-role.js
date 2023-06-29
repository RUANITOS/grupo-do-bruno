import { Model } from 'sequelize'
import store from '../store.js'

class UserRole extends Model {}

UserRole.init({}, { sequelize: store, paranoid: true })

export default UserRole
