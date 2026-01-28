const User = require('../models/user.model')
const bcypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        
       const exist= await User.findOne({email});

       if(exist){
        return res.status(400).json({message:'User already exist'})
       }
        const hashedpassword = await bcypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedpassword
        });

        res.status(201).json({message:'user registered successfully'});

 
    } catch (error){
        res.status(500).json({message:error.message})
    }
}


exports.login = async (req,res)=>{

    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});

        if(!user){
          return res.status(400).json({message:'invalid credentials email'})
        }

        const match= await bcypt.compare(password,user.password);
        if(!match){
           return res.status(400).json({message:'invalid credentials password'})
        }
        const token = jwt.sign(
            {userId: user._id},process.env.JWT_SECRET,{expiresIn:'1d'}
        );

        res.json({token});
    } catch(error){
        res.status(500).json({message: error.message})
    }

};