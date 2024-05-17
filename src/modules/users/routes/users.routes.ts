import { Router } from "express";
import UserController from "../controllers/UserController";
import { Joi, Segments, celebrate } from "celebrate";

const usersRoutes = Router();
const usersController = new UserController();

usersRoutes.get("/", usersController.index);

usersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRoutes;