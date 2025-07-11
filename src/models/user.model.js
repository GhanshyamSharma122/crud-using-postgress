import pool from "../config/db.js";
export const getAllUsersService=async()=>{
    const result =await pool.query("select * from users")
    return  result.rows
}
export const getUserByIdService=async(id)=>{
    const result=await pool.query("select * from users where id = $1",[id])
    return result.rows[0]
}
export const createUserService=async(name,email,profile_url)=>{
    const result=await pool.query ("insert into users(name,email,profile_url) values ($1,$2,$3) returning *",
        [name,email,profile_url])
        return result.rows[0]
}
export const updateUserService=async(id,name,email)=>{
    const result=await pool.query("update users set name=$1,email =$2 where id=$3 returning *",
        [name,email,id])
    return result.rows[0]
}
export const deleteUserService=async(id)=>{
    const result=await pool.query("delete from users where id=$1 returning *",[id])
    return result.rows[0]
}
export const updateProfilePicService=async (id,profile_url)=>{
    const result =await pool.query("update users set profile_url=$1 where id=$2 returning *",[profile_url,id])
    return result
}