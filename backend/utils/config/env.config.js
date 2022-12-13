require('dotenv').config();

const {
  DB_DEPLOY,
  DB_NAME,
  DB_MAIL,
  DB_PASS,
  PORT,
} = process.env;

const testData = [
  { key: "DB_DEPLOY", value: DB_DEPLOY },
  { key: "DB_NAME", value: DB_NAME },
  { key: "DB_MAIL", value: DB_MAIL },
  { key: "DB_PASS", value: DB_PASS },
];
testData.forEach(e => {
  if(!e.value) throw new Error(`[${e.key}] has not been assigned.`);
});

module.exports = {
  DB_DEPLOY,
  DB_NAME,
  DB_MAIL,
  DB_PASS,
  PORT: +PORT || 3001
};