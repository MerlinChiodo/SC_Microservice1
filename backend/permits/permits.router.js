import { Router } from "express";
import * as permitsController from "./permits.controller.js";

/* -------------------------------------------------------------------------- */
/*                              permits.router.js                             */
/*                       all routes related to permits                        */
/* -------------------------------------------------------------------------- */
const router = Router();

//create a new permit
router.post("/", permitsController.createPermit);

//get all permits
router.get("/", permitsController.getAllPermits);

//delete a permittype
router.delete("/:id", permitsController.deletePermit);

//citizen requests a new permit
router.post("/requestPermit", permitsController.createPermitRequest);

//admin get all open permit requests
router.get("/open", permitsController.getAllOpenPermitRequests);

//admin approve or reject a permit request
router.put("/open/:id", permitsController.approveOrRejectPermitRequest);

//get information about a permit
router.get("/:id", permitsController.getPermitById);

//update permit information
router.put("/:id", permitsController.updatePermit);

export default router;
