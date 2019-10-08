const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const bodyparser = require('body-parser');
require('body-parser-xml')(bodyparser);
const cors = require('cors');
const helmet = require('helmet')

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port);
  app.use(cors());
  app.use(bodyparser.json());
  app.use(bodyparser.xml());
  app.use(helmet());
  
});
