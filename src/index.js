import express from 'express'
import store from './store.js'
import router from './router.js'
import config from './config.js'
import Permission from './models/permission.js'
import Profile from './models/profile.js'
import Role from './models/role.js'
import crypto from 'crypto';

console.log("passou1111")

const app = express()
console.log("passou")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
console.log("passou3")

app.use('/', router)

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`)
})

const createPermissionIfNotExists = async (name, access) => {
  const existingPermission = await Permission.findOne({ where: { name } });
  if (!existingPermission) {
    await Permission.create({ name, access });
    console.log(`Permission ${name} created`);
  } else {
    console.log(`Permission ${name} already exists, skipping...`);
  }
};

await store.sync({ alter: true });

const models = ['location', 'movement-item', 'movement', 'resource'];

// Itera sobre os modelos e cria as permissões correspondentes
let i = 0;
for (const model of models) {
  try {
    const sku = `XYZ-${i}`;
    await createPermissionIfNotExists(sku, `${model}_create`);
    await createPermissionIfNotExists(`${sku}-${i + 1}`, `${model}_read`);
    await createPermissionIfNotExists(`${sku}-${i + 2}`, `${model}_update`);
    await createPermissionIfNotExists(`${sku}-${i + 3}`, `${model}_delete`);
  } catch (error) {
    console.error(`Failed to create permissions for ${model}: ${error}`);
  }
  i += 4;
}

// Criação do perfil de administrador
const createAdminProfile = async () => {
  try {
    const existingProfile = await Profile.findOne({ where: { name: 'adm' } });
    if (!existingProfile) {
      const encoder = new TextEncoder();
      const data = encoder.encode("adminpassword");
      const hashBuffer = await crypto.subtle.digest(config.HASH_ALGORITHM, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
    

      const adminProfile = await Profile.create({
        name: 'adm',
        email: 'admin@example.com',
        password: hash,
        type: 'admin'
      });
      console.log('Admin profile created');
    } else {
      console.log('Admin profile already exists, skipping...');
    }
  } catch (error) {
    console.error('Failed to create admin profile:', error);
  }
};

// Criação da função com todas as permissões
const createRoleWithAllPermissions = async () => {
  try {
    const existingRole = await Role.findOne({ where: { name: 'admin' } });
    if (!existingRole) {
      const permissions = await Permission.findAll();
      const role = await Role.create({
        name: 'admin',
        description: 'Administrator role'
      });
      await role.addPermissions(permissions);
      console.log('Role with all permissions created');
    } else {
      console.log('Role with all permissions already exists, skipping...');
    }
  } catch (error) {
    console.error('Failed to create role with all permissions:', error);
  }
};




await createAdminProfile();
await createRoleWithAllPermissions();

console.log('Permissions and profiles creation completed');
