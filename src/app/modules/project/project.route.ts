import { Router } from "express";
import { ProjectController } from "@modules/project/project.controllers.js";
import validateRequest from "@/app/middlewares/validate-req.js";
import { ProjectValidation } from "@modules/project/project.validator.js";

const router = Router();

router.post(
  "/",
  validateRequest(ProjectValidation.createProjectSchema),
  ProjectController.createProject
);
router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProject);
router.put(
  "/:id",
  validateRequest(ProjectValidation.updateProjectSchema),
  ProjectController.updateProject
);
router.delete("/:id", ProjectController.deleteProject);

export const ProjectRoutes = router;
