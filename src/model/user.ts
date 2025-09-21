import mongoose, {Schema,Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;

}

const messageSchema: Schema<Message> = new Schema({
    content: { 
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    messages: Message[];
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    
}
const UserSchema: Schema<User> = new Schema({
    username: { 
        type: String,
        required: [true,"username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true,"email is required"],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true
    },
    
    password: {
        type: String,
        required:  [true,"password is required"] 
    },
    messages: [messageSchema],
    verifyCode: {
        type: String,
        required: true
    },
    verifyCodeExpiry: {
        type: Date,
        default: Date.now,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema)

export default UserModel;