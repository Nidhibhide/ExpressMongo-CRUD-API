import { Router } from "express";
import { CreateOrder,BillOrder } from "../controller/OrderController";
import { validateCreateOrder } from "../middleware/OrderValidMid";
const router = Router();
router.route("/create").post(validateCreateOrder, CreateOrder);
router.route("/bill").get(BillOrder);

export default router;
