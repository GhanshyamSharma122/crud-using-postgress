import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import validateUser from "../middlewares/inputValidator.middleware.js";
const router=Router()
router.post("/user",validateUser,createUser)
router.get("/user",getAllUsers)
router.get("/user/:id",getUserById)
router.put("/user/:id",validateUser,updateUser)
router.delete("/user/:id",deleteUser)
export default router