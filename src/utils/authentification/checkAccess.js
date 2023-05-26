import jwt from 'jsonwebtoken';

const checkAuthorization = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).send({ error: 'You are not connected' });
	}
	const bearerToken = authorization.split(' ');
	if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
		return res.status(401).send({ error: 'Invalid token type' });
	}
	try {
		res.locals.requestor = await jwt.verify(bearerToken[1], 'SecretInternalPrivateKey');
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			return res.redirect('/');
		}
		return res.status(500).send(err);
	}
	return next();
};

export { checkAuthorization };
