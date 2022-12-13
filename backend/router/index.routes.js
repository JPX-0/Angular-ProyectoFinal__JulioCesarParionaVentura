const { Router } = require('express');
const CONTROLLER = require('../controllers/index.controller');
const ROUTE = require('./collections.routes');

const apiRoutes = Router();

apiRoutes.use(ROUTE.generateApiRest("user", CONTROLLER.user));
apiRoutes.use(ROUTE.generateApiRest("course", CONTROLLER.course));
apiRoutes.use(ROUTE.generateApiRest("commission", CONTROLLER.commission));
apiRoutes.use(ROUTE.init());
apiRoutes.use(ROUTE.notFound());
apiRoutes.use(ROUTE.renderError());

module.exports = apiRoutes;