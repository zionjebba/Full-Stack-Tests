import { NextFunction, Request, Response, Router } from "express";
import {
  createInquiry,
  getInquiriesByProduct,
  getMyInquiries,
} from "../controllers/inquiryController";
import { inquiryValidator } from "../middlewares/validators/productInquiryValidator";
import { validationResult } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware";
import { requireFarmerRole } from "../middlewares/requireFarmerRole";

const router = Router();

/**
 * @openapi
 * /api/inquiries:
 *   post:
 *     summary: Create a new inquiry for a product
 *     tags: [Inquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - buyerEmail
 *               - message
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product ID being inquired about
 *               buyerEmail:
 *                 type: string
 *                 description: The email address of the buyer
 *               message:
 *                 type: string
 *                 description: The inquiry message
 *     responses:
 *       201:
 *         description: Inquiry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Inquiry created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     product:
 *                       type: string
 *                     buyerEmail:
 *                       type: string
 *                     message:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
router.post(
  "/",
  inquiryValidator,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
  createInquiry
);

/**
 * @openapi
 * /api/inquiries/{productId}:
 *   get:
 *     summary: Get all inquiries for a specific product
 *     tags: [Inquiries]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Inquiries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Inquiries retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
/**
 * @openapi
 * /api/inquiries/my-inquiries:
 *   get:
 *     summary: Get all inquiries for current farmer's products
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Farmer inquiries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Farmer inquiries retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/my-inquiries", authMiddleware, requireFarmerRole, getMyInquiries);

router.get("/:productId", getInquiriesByProduct);

export default router;
