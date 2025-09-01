import User from "../models/user.model.js";

export const signup = async (req , res) => {

    const {nickname,codename,dateofbirth,location,firstname} = req.body;

    const existuser = await User.findOne({nickname});
    if(existuser){
        res.status(400).json({message:"nick name is taken"})
        return;
    }
    
    const existuser2 = await User.findOne({codename});
    if(existuser2){
        res.status(400).json({message:"codename is taken"})
        return;
    }
    const newuser = new User({
        nickname,
        codename,
        dateofbirth,
        location,
        firstname
    })
    await newuser.save();
    res.status(201).json({ message: 'user created', user: { nickname, codename, firstname } });
}