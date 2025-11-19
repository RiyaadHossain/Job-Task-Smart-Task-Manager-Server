import { Router } from "express";
import { TaskController } from "@modules/task/task.controllers.js";
import validateRequest from "@/app/middlewares/validate-req.js";
import { TaskValidation } from "@modules/task/task.validator.js";

const router = Router();

router.post(
  "/",
  validateRequest(TaskValidation.createTaskSchema),
  TaskController.createTask
);
router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTask);
router.put(
  "/:id",
  validateRequest(TaskValidation.updateTaskSchema),
  TaskController.updateTask
);

router.post("/reassign", TaskController.reassignTask)

router.delete("/:id", TaskController.deleteTask);

export const TaskRoutes = router;
