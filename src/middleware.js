import jwt from 'jsonwebtoken';
import config from './config.js';

import Profile from './models/profile.js';
import Permission from './models/permission.js';

const middleware = (requiredPermission) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header required' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, config.SECRET_KEY);
      const profile = await Profile.findByPk(decodedToken.id, {
        include: Permission
      });
      if (!profile) {
        return res.status(401).json({ error: 'Profile not found' });
      }
      if (!hasPermission(profile, requiredPermission)) {
        return res.status(403).json({ error: 'Insufficient permission' });
      }
      req.profile = profile;
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

const hasPermission = (profile, requiredPermission) => {
  // Verifica se o perfil possui a permissão necessária
  const permissions = profile.permissions;
  const matchingPermissions = permissions.filter(permission => permission.name === requiredPermission);
  return matchingPermissions.length > 0;
};

export default middleware;
