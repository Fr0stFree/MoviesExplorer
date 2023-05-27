const express = require('express');
const { celebrate } = require('celebrate');

const { errorCatcher } = require('../core/utils');
const { createSchema, deleteSchema } = require('./schemas');
const { retrieveAll, create, remove } = require('./controllers');

const router = express.Router();

router.get('/', errorCatcher(retrieveAll));
router.post('/', celebrate(createSchema), errorCatcher(create));
router.delete('/:_id', celebrate(deleteSchema), errorCatcher(remove));

module.exports = router;
