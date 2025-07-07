import pool from "../config/db.js";
const createUserTable=async () => {
    const queryText=`
    create table if not exists users(
    id serial primary key,
    name varchar(100) not null,
    email varchar(100) unique not null,
    profile_url varchar(100) not null,
    created_at timestamp default now()
)
`
try {
    pool.query(queryText)
    console.log("user table created if not exists")
} catch (error) {
    console.log("error creating users table",error)
}
}
export default createUserTable