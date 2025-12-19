import bcrypt from "bcryptjs";
import { AuthError } from "../../utils/app-error";
import { AuthRepository } from "./auth.repository";
import { loginValidation, signUpValidation } from "./auth.schema";
import { generateAccessToken, generateRefreshToken, JwtPayload } from "../../utils/jwt";
import { Roles } from "@repo/db";


export class AuthService{
    constructor(private authRepo: AuthRepository) {}

    async login ( data: loginValidation){
        const user = await this.authRepo.findByEmail(data.email);
        
        //check user 
        if(!user){
            throw new AuthError("Invalid credentials", 401);
        }
        //check password
        const isValidPassword = await bcrypt.compare(data.password, user.password)
        if(!isValidPassword){
            throw new AuthError("Invalid Credentials", 401);
        }
        
        const payload : JwtPayload = { userId: user.id, role: user.role};
        const accessToken = generateAccessToken(payload);
        console.log("login service");
        const refreshToken = generateRefreshToken(payload);
        
        //check role TODO: Add this to middleware 

        //create session

        return {
            userId: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            isAppreoved: user.isApproved,
            accessToken,
            refreshToken
        }

    }
    

    async signUp (data: signUpValidation){
        const user = await this.authRepo.findByEmail(data.email)
        
         if(user){
            throw new AuthError("User Already Exists!, try login", 401);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        // new user object
        const userData = {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            role: data.role ? (data.role as Roles) : Roles.sales,
        };

        const newUser = await this.authRepo.createUser(userData);

        return {
            message: "Signup up successful",
            userId: newUser.id,
            email: newUser.email,
            username: newUser.username,
            role:newUser.role,
            isApproverd: newUser.isApproved
        }
    }
}

