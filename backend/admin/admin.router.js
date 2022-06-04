import { Router } from 'express';
import * as adminController from './admin.controller.js';

/* -------------------------------------------------------------------------- */
/*                              admin.router.js                               */
/*                       all routes related for admins                        */
/* -------------------------------------------------------------------------- */
const router = Router();

//send an event to change the about us
router.post("/aboutus", adminController.changeAboutus);

export default router;
