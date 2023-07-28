import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import validator from "../utils/validator.js";
import jwtUtils from "../utils/jwt.js";
import throwError from "../utils/error.js";

const userServices = {

    async register(data) {
        const { username, password } = data;

        const validateUsername = await validator.username(username);
        const validatePassword = validator.password(password);
        const encryptedPassword = await bcrypt.hash(validatePassword,10); 

        const userDoc = new User({
            username: validateUsername,
            password: encryptedPassword
        })

        const user = await userDoc.save();
        const token = jwtUtils.generateToken({_id: user._id});

        return { token };
    },

    async login(data) {
        const { username, password } = data;
        const user = await User.findOne({ username: username });

        if(!user) {
            return throwError(404, "username not registered");
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password); 

        if(!isPasswordMatch) {
            return throwError(404, "password is incorrect")
        }

        const token = jwtUtils.generateToken({_id: user._id});
        return { token };
    },

    async updateUser(id, data) {
   
        const { username, password } = data;
        const userId = validator.mongooseId(id);
        
        const updatedData = {};

        if(username) {
            const validateUsername = await validator.username(username);
            updatedData.username = validateUsername;
        }
        if(password) {
            const pw = validator.password(password);
            const encryptedPassword = await bcrypt.hash(pw,10);
            updatedData.password = encryptedPassword;
        }

        return User.findByIdAndUpdate(userId,{...updatedData},{ select: '_id'})
    }

}

export default userServices;