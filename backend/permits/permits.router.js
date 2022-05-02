import { Router } from "express";
import * as permitsController from "./permits.controller.js";

/* -------------------------------------------------------------------------- */
/*                              permits.router.js                             */
/*                       all routes related to permits                        */
/* -------------------------------------------------------------------------- */
const router = Router();

//create a new permit
router.post("/", permitsController.createPermit);

//get information about a permit
router.get("/:id", permitsController.getPermitById);

//update permit information
router.put("/:id", permitsController.updatePermit);

//delete a permittype
router.delete("/:id", permitsController.deletePermit);

export default router;