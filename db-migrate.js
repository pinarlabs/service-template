const dotenv = require('dotenv');

dotenv.config();
const { spawnSync } = require('child_process');

const url = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const child = spawnSync('node_modules/.bin/sequelize',['db:migrate', '--url', url]);

console.log(child.stdout.toString());
console.log(child.stderr.toString());

process.exit(child.status);