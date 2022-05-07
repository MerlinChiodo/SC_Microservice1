import { Router } from 'express';
import * as citizenController from './citizen.controller.js';

/* -------------------------------------------------------------------------- */
/*                              citizen.router.js                             */
/*                       all routes related to citizens                       */
/* -------------------------------------------------------------------------- */
const router = Router();

//create a new citizen
router.post("/", citizenController.createCitizen);

//get a single citizen by id
router.get("/:id", citizenController.getCitizenById);

//get ids of children for a given citizen
router.get("/:id/children", citizenController.getChildren);

//check if a citizen has a proof of competence for dogowners
router.get("/:id/hasDogPermit", citizenController.hasDogPermit);

export default router;
