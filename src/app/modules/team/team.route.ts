import { Router } from "express";
import { TeamController } from "./team.controllers.js";
import validateRequest from "@/app/middlewares/validate-req.js";
import { TeamValidation } from "./team.validator.js";

const router = Router();

router.post(
  "/",
  validateRequest(TeamValidation.createTeamSchema),
  TeamController.createTeam
);
router.get("/", TeamController.getTeams);
router.get("/:id", TeamController.getTeam);
router.put(
  "/:id",
  validateRequest(TeamValidation.updateTeamSchema),
  TeamController.updateTeam
);
router.delete("/:id", TeamController.deleteTeam);

export const TeamRoutes = router;
