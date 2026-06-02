import { Router } from "express";

import { authorizeRoles } from "../../middleware/auth";

const router = Router();
// TODO: Implement user-related routes and controllers
// router.get("/all", authorizeRoles("admin"), getAllUser);

// router.get("/delete-all", authorizeRoles("super_admin"), deleteAllUser);

export default router;