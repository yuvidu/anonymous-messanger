import User from "../models/user.model.js";

export const signup = async (req , res) => {
    console.log("Incoming body:", req.body);   

    const {nickname,codename,dateofbirth,location,firstname} = req.body;

    const existuser = await User.findOne({nickname,codename});
    if(existuser){
        res.status(400).json({message:"nick name and code name is taken"})
        console.log("Nickname and codename taken:", nickname, codename);
        return;
    }
   
    const newuser = new User({
        nickname,
        codename,
        dateofbirth:dateofbirth||null,
        location:location||null,
        firstname:firstname||null
    })
    await newuser.save();
    res.status(201).json({ message: 'user created', user: { nickname, codename, firstname } });
}

export const login = async (req , res) => {
    const {nickname,codename} = req.body;
    try {

        const userexistence = await User.findOne({nickname,codename});
        if(!userexistence){
            res.status(400).json({message:"user not found"})
            return;
        }
        res.status(200).json({message:"login successfull",
            user:{ nickname: userexistence.nickname,
            codename: userexistence.codename,
            firstname: userexistence.firstname}
        })
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log("Error during login:", error);   
    }
}