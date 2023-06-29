import { Router } from 'express'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import crypto from 'crypto';

import Profile from '../models/profile.js'

const authentication = new Router()

authentication.post('/', async (req, res) => {
  const { login, password } = req.body;

  try {
    const profile = await Profile.findOne({
      where: {
         email: login 
      }
    });

    if (!profile) {
      return res.status(401).json({ error: 'Invalid login or password' });
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest(config.HASH_ALGORITHM, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
    console.log(hash)

    if (profile.password !== hash) {
      return res.status(401).json({ error: 'Invalid login or passwordteee' });
    }

    const token = jwt.sign({ id: profile.id }, config.SECRET_KEY, {
      expiresIn: '30m'
    });

    res.json({ token });
  } catch (error) {
    console.error('Failed to authenticate:', error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

export default authentication
