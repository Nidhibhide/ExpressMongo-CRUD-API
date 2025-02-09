import { Router } from "express";
import { CreateOrder,BillOrder } from "../controller/OrderController";
import { validateCreateOrder } from "../middleware/OrderValidMid";
import Auth from "../middleware/Auth"
const router = Router();
router.route("/create").post(validateCreateOrder, CreateOrder);
router.route("/bill").get(Auth,BillOrder);

export default router;
