import express from "express";
import { upload } from "../utils/upload.js";
import { 
    uploadContent, getAllContent , getMyContent
      } from "../controllers/contentController.js";
      
import { verifyToken, authorizeRoles } from "../middlewares/authMiddleware.js";

import { getLiveContent } from "../controllers/contentLiveController.js";

import { approveContent , rejectContent } from "../controllers/contentApprovalController.js";
const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  authorizeRoles("teacher"),
  upload.single("file"),
  uploadContent
);

router.patch(
    "/approve/:id",
     verifyToken, 
     authorizeRoles("principal"),
      approveContent);


router.patch(
    "/reject/:id", 
    verifyToken, 
    authorizeRoles("principal"),
     rejectContent);

     router.get(
  "/my-content",
  verifyToken,
  authorizeRoles("teacher"),
  getMyContent
);


 router.get("/live/:teacherId", getLiveContent);

 router.get("/", getAllContent);



export default router;