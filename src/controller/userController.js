//const { createUser } = require('../../controller/userController');
const prisma = require('../database');
const { param } = require('../routes/userRouter');

exports.createUser= async (req,res)=>{
    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                email:req.body.email
            }
        });
        if(existingUser){
           return res.status(201).json({message:"User already exist!"});
        }
        const user = await  prisma.user.create({data:req.body});
        console.log(user);
        return res.status(200).json({message:"User created!"});
    } catch (error) {
        console.log("Cant create user",error);
        return res.status(500).json({message:"Errror creating the user"});
    }
}

exports.getAllUsers= async (req,res)=>{
    try {
        const users =await prisma.user.findMany();
        
        return res.status(200).json(users);
    } catch (error) {
        console.log("Failed to get the data!");
        return res.status(500).json({message:"Cant get the users data!"});
    }
}


exports.getUserWithId= async (req,res)=>{
    console.log("hello");
    const {id}= req.params;
    try {
        const users = await prisma.user.findFirst({
            where:{
                id:parseInt(id)
            }
        });
        if(!users){
            return res.status(404).json({message:"Cant find the user with the id"});
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log("cant find user!",error);
        return res.status(500).json({message:"Cant find user!"});
    }

}

exports.deleteUser= async (req,res)=>{
    const {id}= req.params;
    
    try {
        const userID=parseInt(id) 
        if(isNaN(userID)){
            return res.status(404).json({message:"In valid id format!"});
        }
        const user = await prisma.user.findUnique({
            where:{
                id:userID
            }
        });
        console.log(userID);
        
        console.log(user);
        if(!user){
            return res.status(500).json({message:"User not found for this id"});
        }
        await prisma.user.delete({
            where:{id:userID}
        });
        return res.status(200).json({message:"User successfully deleted!"});
    } catch(error) {
        console.log("error!",error);
        return res.status(500).json({message:"Error!"});
    } 
        
}


exports.editUser =async (req,res)=>{
    const {id} = req.params;
    const updateData = req.body;
    const userID = parseInt(id);
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userID
            }
        });
        console.log(user);
        if(!user){
            return res.status(404).json({message:"cant find the user with the ID"});
        }
        const updatedUser=await prisma.user.update({
            where:{
                id:userID
            },
            data:updateData
        });
        console.log(updatedUser);
        return res.status(200).json({message:"User details successfully updated!"});
    } catch (error) {
        console.error("Error update the user details!",error);
        return res.status(500).json({message:"Error while update the user details!"});
    }
}