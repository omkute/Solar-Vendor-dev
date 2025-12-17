import { Express, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema, signupSchema } from "./auth.schema";
import { success } from "zod";


export class AuthController{
    constructor( private authService: AuthService){}

    login = async ( req: Request, res: Response)=>{
        try {
        //parse input login data 
        const data = loginSchema.parse(req.body);

        const result = await this.authService.login(data);

        res.status(200).json({
            success: true,
            data: result
        })
            
        } catch (error) {
            console.log(error);
            
        }
    }
    signUp = async ( req: Request, res: Response)=>{
        try {
        //parse input signup data
        const data = signupSchema.parse(req.body);

        const result = await this.authService.signUp(data);

        res.status(200).json({
            success: true,
            data: result
        })
        } catch (error) {
            console.log(error);
            
        }
    }
}