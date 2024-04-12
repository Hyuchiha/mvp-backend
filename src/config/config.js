const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),

    PARSE_ID: Joi.string().required(),
    PARSE_KEY: Joi.string().required(),
    PARSE_URL: Joi.string().required(),
    PARSE_MASTER_KEY: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,

  parse: {
    id: envVars.PARSE_ID,
    key: envVars.PARSE_KEY,
    url: envVars.PARSE_URL,
    masterKey: envVars.PARSE_MASTER_KEY,
  },
};
