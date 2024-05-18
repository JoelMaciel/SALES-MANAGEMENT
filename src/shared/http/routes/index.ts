import productsRouter from "@modules/products/routes/products.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRoutes from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/api/products", productsRouter);
routes.use("/api/users", usersRoutes);
routes.use("/api/sessions", sessionsRouter);
routes.use("/api/password", passwordRouter);

export default routes;
