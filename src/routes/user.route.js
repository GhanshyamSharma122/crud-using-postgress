import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateProfilePicture, updateUser } from "../controllers/user.controller.js";
import validateUser from "../middlewares/inputValidator.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()
router.post("/user",validateUser,upload.single("profile_image"),createUser)
router.get("/user",getAllUsers)
router.get("/user/:id",getUserById)
router.put("/user/:id",validateUser,updateUser)
router.delete("/user/:id",deleteUser)
router.put("/user/profilepic/:id",upload.single("profile_image"),updateProfilePicture)
export default router