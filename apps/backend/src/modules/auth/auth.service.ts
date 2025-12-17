import { AuthError } from "../../utils/app-error";
import { AuthRepository } from "./auth.repository";
import { loginValidation, signUpValidation } from "./auth.schema";

export class AuthService{
    constructor(private authRepo: AuthRepository) {}

    async login ( data: loginValidation){
        const user = await this.authRepo.findByEmail(data.email);
        //check user 
        if(!user){
            throw new AuthError("Invalid credentials", 401)
        }
        //check password
        //check role
        //create session

        return {
            userId: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            isAppreoved: user.isApproved,
        }

    }
    

    async signUp (data: signUpValidation){
        const user = await this.authRepo.findByEmail(data.email)
        
         if(!user){
            throw new AuthError("User Already Exists!, try login", 401);
        }

        const userToCreate: Omit<AuthR, "id"> = {
      email: data.email,
      username: data.username,
      password: data.password, // hash in real app
      role: data.role ?? "sales", // ✅ DEFAULT ROLE
    };

        return{
            meaa:"signupsuccess"
        }
    }
}