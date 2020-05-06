const bcrypt = require('bcrypt')

const users = [
    {id:1,idAccount:'1760082',displayName:'Nguyen Phuoc Khanh',password:'$2b$10$fVXyRyquZuSD0OL/LYPxHuZ..UMsFa9tePSHUgzwAJo5V5d.y5QUS',phone:'+84 344488931',mail:'npkhanh17ck1@gmail.com'}
];
function findUserById(id){
    return users.find(u=>u.id===id)
}
function findUserByIdAccount(idAccount){
    return users.find(u=>u.idAccount===idAccount)
}
function hassPassword(password){
    return bcrypt.hashSync(password,10);
}
function verifyPassword(passwordHash,password)
{
    return bcrypt.compareSync(passwordHash,password)
}
module.exports = {
    findUserById,
    findUserByIdAccount,
    hassPassword,
    verifyPassword
}