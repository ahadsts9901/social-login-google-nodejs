import mongoose from "mongoose";

// user schema ( mongoose )
const userSchema = new mongoose.Schema({
    profilePhoto: {
        type: String,
        default: null,
    },
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        provider: String
    },
    password: {
        type: String,
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        default: null,
    },
    dateOfBirth: {
        type: Date,
        default: null,
    }
});

userSchema.pre('save', function (next) {

    // convert the email to lowercase before saving
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();

});

// give a collection name
export const userModel = mongoose.model("social-login", userSchema);

// user object will like this
export const sampleUser = `{
    "firstName": "John", 
    "lastName": "Doe", 
    "email": "john@example.com",
    "password": "s4e5br2th4j242342h342b4vhv...werwdf32",
    "provider": "gmail",
    "isAdmin": false,
    "isDisabled": false,
    "isSuspended": false,
    "isEmailVerified": false,
    "profilePhoto": "https://example.com/profile.jpg"
    "createdOn": "2022-01-01T00:00:00.000Z"
}`