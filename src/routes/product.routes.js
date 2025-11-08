import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import { allowRoles } from '../middlewares/roles.js';
import { ROLES } from '../constants/roles.js';
import { validate } from '../middlewares/validate.js';
import { create, list, validators } from '../controllers/product.controller.js';

const router = Router();
router.get('/', validate(validators.listSchema), list);
router.post('/', protect, allowRoles(ROLES.ADMIN), validate(validators.createSchema), create);
export default router;
