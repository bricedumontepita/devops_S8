import moment from "moment";

import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import AuthorizedClient from "../utils/authentification/AuthorizedClient.js";
import Rights from "../utils/authentification/Rights.js";
import AuthorizationCodeList from "../utils/authentification/AuthorizationCodeList.js";
import TrainerService from '../services/TrainerService.js';

const authorize = (req, res) => {
  const queryParams = req.query;

  if (!AuthorizedClient[queryParams.client_id]) {
    return res.status(401).send({ error: 'Application is not authorized' });
  }

  if (!queryParams.redirect_uri) {
    return res.status(400).send({ error: 'No redirect URI provided' });
  }

  if (!Rights.includes(queryParams.scopes)) {
    return res.status(400).send({ error: "User scope provided doesn't exist" });
  }

  const authorizationCode = uuidv4();
  const expiratesAt = new Date();
  expiratesAt.setMinutes(expiratesAt.getMinutes() + 10);

  AuthorizationCodeList.push({ clientId: queryParams.client_id, authorizationCode, expiratesAt });

  return res.redirect(`${queryParams.redirect_uri}?authorization_code=${authorizationCode}`);
};

const token = async (req, res) => {
  const queryParams = req.query;
  const { login, password, scopes } = req.body;

  if (!AuthorizedClient[queryParams.client_id]
    || AuthorizedClient[queryParams.client_id] !== queryParams.client_secret) {
    return res.status(401).send({ error: 'Application is not authorized' });
  }

  const authorization = AuthorizationCodeList.find(
    (element) => element.clientId === queryParams.client_id,
  );

  if (!authorization || authorization.authorizationCode !== queryParams.code) {
    return res.status(401).send({ error: 'Invalid authorization code' });
  }

  const now = new Date();
  if (now > authorization.expiratesAt) {
    return res.status(401).send({ error: 'Authorization code expired' });
  }

  const user = await TrainerService.getUserByLogin(login);

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  if (!TrainerService.areSamePassword(password, user.password)) {
    return res.status(401).send({ error: 'Login or password incorrect' });
  }

  const accessToken = jwt.sign(
    { id: user.id, scopes },
    'SecretInternalPrivateKey',
    { expiresIn: '10m' },
  );
  return res.status(200).send({ accessToken, tokenType: 'Bearer', expiresIn: '10m' });
};

export default {
  authorize,
  token
};
