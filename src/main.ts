import app from "./applications/app";
import { logger } from "./applications/logging";

app.listen(3000, () => {
  logger.info("Server is listening on http://localhost:3000/");
});