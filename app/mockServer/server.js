const jsonServer = require('json-server');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { buildSyncBody, savePushedData } = require('./helpers');

const adapter = new FileSync('./mockServer/mockDb.json');
const db = lowdb(adapter);
const server = jsonServer.create();
const router = jsonServer.router('./mockServer/mockDb.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/sync', (req, res) => {
  const { lastSyncedAt } = req.query;
  const body = buildSyncBody(db, lastSyncedAt);
  return res.jsonp(body);
});

server.post('/sync', (req, res) => {
  const updatedDataFromClient = req.body;
  savePushedData(db, updatedDataFromClient);

  return res.sendStatus(200);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
