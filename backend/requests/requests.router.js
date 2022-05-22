import { Router } from 'express';
import * as requestsController from './requests.controller.js';

/* -------------------------------------------------------------------------- */
/*                             requests.router.js                             */
/*                       all routes related to requests                       */
/* -------------------------------------------------------------------------- */

const router = Router();

//create new request
router.post('/', requestsController.createRequest);

//get all open requests
router.get('/', requestsController.getAllOpenRequests);

//approve a request
router.post('/approve/:id', requestsController.approveRequest);

//reject a request
router.post('/reject/:id', requestsController.rejectRequest);

//get a single request by id
router.get('/:id', requestsController.getRequestById);

//delete request by id
router.delete('/:id', requestsController.deleteRequest);

export default router;
