const express = require('express');
const { celebrate } = require('celebrate');

const { errorCatcher } = require('../core/utils');
const { auth } = require('../middleware');
const { registerSchema, loginSchema, updateSchema } = require('./schemas');
const {
	create,
	login,
	retrieveSelf,
	updateSelf,
} = require('./controllers');

const router = express.Router();

router.post('/signup', celebrate(registerSchema), errorCatcher(create));
router.post('/signin', celebrate(loginSchema), errorCatcher(login));
router.get('/users/me', auth, errorCatcher(retrieveSelf));
router.patch('/users/me', auth, celebrate(updateSchema), errorCatcher(updateSelf));

module.exports = router;
