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
//format for id will change in the future
router.get("/:id", citizenController.getCitizenById);

//get ids of children for a given citizen
router.get("/:id/children", citizenController.getChildren);

//check if a citizen is allowed to keep large/dangerous dogs
router.get("/:id/hasDogPermit", citizenController.hasDogPermit);

export default router;
