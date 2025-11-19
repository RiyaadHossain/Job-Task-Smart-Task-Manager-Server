import { Router } from "express";
import { ActivityLogController } from "./activityLog.controllers.js";
import validateRequest from "@/app/middlewares/validate-req.js";
import { ActivityLogValidation } from "./activityLog.validator.js";

const router = Router();

router.post(
  "/",
  validateRequest(ActivityLogValidation.createActivitySchema),
  ActivityLogController.createActivity
);
router.get("/", ActivityLogController.getActivities);
router.get("/:id", ActivityLogController.getActivity);

export const ActivityLogRoutes = router;
