const { Router } = require('express');
const errorMiddleware = require('../middlewares/error.middleware');
const routeExist = require('../middlewares/routeExist.middleware');

const router = Router();

const init = () => {
  router.get(`/`, (req, res) => res.send("wellcome to my API-REST from ©JulioCParionaV 😎"));
  return router;
}
const notFound = () => {
  router.use("/*", routeExist);
  return router;
}
const renderError = () => {
  router.use(errorMiddleware);
  return router;
}
const generateApiRest = (route, controller) => {
  router.get(`/${route}/get`, controller.getData);
  router.get(`/${route}/get/:id`, controller.getData);
  router.post(`/${route}/post`, controller.postData);
  router.put(`/${route}/put/:id`, controller.putData);
  router.delete(`/${route}/delete/:id`, controller.deleteData);
  return router;
}

module.exports = { init, notFound, renderError, generateApiRest };