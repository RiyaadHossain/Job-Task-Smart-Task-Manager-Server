import { Router } from "express";
import { MemberController } from "@modules/member/member.controllers.js";
import validateRequest from "@/app/middlewares/validate-req.js";
import { MemberValidation } from "@modules/member/member.validator.js";

const router = Router();

router.post(
  "/",
  validateRequest(MemberValidation.createMemberSchema),
  MemberController.createMember
);
router.get("/", MemberController.getMembers);
router.post(
  "/project/:projectId/auto-assign",
  MemberController.autoAssignByProject
);

router.get("/project/:projectId", MemberController.getMembersByProject);
router.get("/:id", MemberController.getMember);
router.put(
  "/:id",
  validateRequest(MemberValidation.updateMemberSchema),
  MemberController.updateMember
);
router.delete("/:id", MemberController.deleteMember);

export const MemberRoutes = router;
