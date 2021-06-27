import { createServer } from "http";

import { createExpressApp } from "./express-app";
import { configureIO } from "./io";

const PORT = 3300;

const app = createExpressApp();

const httpServer = createServer(app);

configureIO(httpServer);

httpServer.listen(PORT, () => {
  console.log("listening on port:", PORT);
});
