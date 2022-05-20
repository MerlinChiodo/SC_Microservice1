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

//get all permits
router.get("/all", permitsController.getAllPermits);

//update permit information
router.put("/:id", permitsController.updatePermit);

//delete a permittype
router.delete("/:id", permitsController.deletePermit);

//citizen requests a new permit
router.post("/requestPermit", permitsController.createPermitRequest);

//admin get all open permit requests
router.get("/requests", permitsController.getAllOpenPermitRequests);

//admin approve or reject a permit request
router.put("/requests/:id", permitsController.approveOrRejectPermitRequest);

export default router;
