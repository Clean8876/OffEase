import EmployeeModel from "../models/UserModel.js";
import { generateTokken,cookieToken } from "../uitlis/generatetoken.js";
import bcrypt from 'bcrypt'




export const register = async (req, res) =>{
    try {
        const {Firstname,
            Lastname,
            email,
            password,
            confirmPassword,
            dob,
            department,
            role,
            profilePictureUrl
            } = req.body;
        if (
			!Firstname ||
			!Lastname ||
			!email ||
			!password ||
			!confirmPassword ||
			!dob ||
            !department ||
            !role 
            
		) {
			return res.status(403).json({
				message: "All Fields are required",
			});
		}
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"password are not matched please try  again"
            })

        }

        const userExist = await EmployeeModel.findOne({email});
        if(userExist){
            return  res.status(400).json({message:'user exsist'})
        }
        const newUser =  new EmployeeModel({Firstname,
        Lastname,
        email,  
        password,
        role:role,
        dob,
        department:department,    
        profilePictureUrl,
        
        })
        await newUser.save()
        return res.status(201).json({message:'succesfully Regesterd',newUser

        });
   
	



    }
    catch(err){
        console.error('error in register',err.message);
        return res.status(500).json({message:err.message})
    }
}

 export const AuthUser = async(req,res)=>{
    try{
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  // Generate token
    const token = generateTokken(user.email, user._id,user.role);

  // Set token in cookie
  cookieToken(res, token);

  // Respond with user details and token
  return res.status(200).json({
      message: 'Authentication successful',
      token,
      user:user
      ,
  });
} catch (err) {
  console.error('Error during authentication', err.message);
  return res.status(500).json({ message: err.message });
}
}
