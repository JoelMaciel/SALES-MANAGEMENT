import { Router } from "express";
import UserController from "../controllers/UserController";
import { Joi, Segments, celebrate } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import uploadConfig from "@config/upload";
import UserAvatarController from "../controllers/UserAvatarController";
import multer from "multer";

const usersRoutes = Router();
const usersController = new UserController();
const userAvatarController = new UserAvatarController();

const updload = multer(uploadConfig);

usersRoutes.get("/", isAuthenticated, usersController.index);

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

usersRoutes.patch(
  "/avatar",
  isAuthenticated,
  updload.single("avatar"),
  userAvatarController.update,
);

export default usersRoutes;
