import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateProfilePicService, updateUserService } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

//standardized response function
const handleResponse=(res,status,message,data=null)=>{
   return res.status(status).json(
        {
            status,
            message,
            data,
        }
    )
}
export const createUser=async (req,res ,next)=>{
    const {name,email}=req.body
    const avatarLocalPath=req.file.path 
    try {
        const profile_image=await uploadOnCloudinary(avatarLocalPath)
        const newUser=await createUserService(name,email,profile_image.url)
        return handleResponse(res,201,"user created successfully",newUser)
    } catch (error) {
        next(error)
    }
}
export const getAllUsers=async (req,res ,next)=>{
    try {
        const users=await getAllUsersService()
        handleResponse(res,201,"users fetched successfully",users)
    } catch (error) {
        next(error)
    }
}
export const getUserById=async (req,res ,next)=>{
    try {
        const user=await getUserByIdService(req.params.id)
        if(!user) return handleResponse(res,404,"user not found")
        handleResponse(res,201,"user fetched successfully",user)
    } catch (error) {
        next(error)
    }
}
export const updateUser=async (req,res ,next)=>{
    const {name,email}=req.body
    try {
        const updatedUser=await updateUserService(req.params.id,name,email)
        if(!updatedUser) return handleResponse(res,404,"user not found")
        handleResponse(res,201,"user updated successfully",updatedUser)
    } catch (error) {
        next(error)
    }
}
export const deleteUser=async (req,res ,next)=>{
    try {
        const deletedUser=await deleteUserService(req.params.id)
        if(!deletedUser) return handleResponse(res,404,"user not found")
        handleResponse(res,201,"user deleted successfully",deletedUser)
    } catch (error) {
        next(error)
    }
}
export const updateProfilePicture=async (req,res,next)=>{
    try{
        const avatarLocalPath=req.file.path
        const avatar=await uploadOnCloudinary(avatarLocalPath)
        const updateProfile=await updateProfilePicService(req.params.id,avatar.url)
        if(!updateProfile) return handleResponse(res,404,"user not found")
        handleResponse(res,200,"profile pic updated successfully",updateProfile)
    }catch(error){
        next(error)
    }
}