import {Model, model, Document, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserData {
    username: string;
    password: string;
    email: string;
}

interface UserDocument extends UserData, Document {};

interface UserModel extends Model<UserDocument> {}

// schema maps to a collection
const userSchema = new Schema<UserDocument>({
    username: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    }

});

userSchema.pre<UserDocument>('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) {
        next();
    } else {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                console.log('Error hashing password for user', user.username);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

export default model<UserDocument, UserModel>('User', userSchema);