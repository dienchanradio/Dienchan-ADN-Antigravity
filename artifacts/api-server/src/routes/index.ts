import { Router, type IRouter } from "express";
import healthRouter from "./health";
import registrationsRouter from "./registrations";
import adminAuthRouter from "./admin-auth";
import postsRouter from "./posts";
import storageRouter from "./storage";
import siteSettingsRouter from "./site-settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(registrationsRouter);
router.use(adminAuthRouter);
router.use(postsRouter);
router.use(storageRouter);
router.use(siteSettingsRouter);

export default router;
