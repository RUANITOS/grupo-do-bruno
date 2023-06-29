import { Model } from 'sequelize'
import store from '../store.js'

class RolePermission extends Model {}

RolePermission.init({}, { sequelize: store, paranoid: true })

export default RolePermission
