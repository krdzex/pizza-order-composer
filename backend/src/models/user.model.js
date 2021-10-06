import mongoose from "mongoose";
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
    name: {
        type: String, trim: true,
        required: "Name is required",
        unique: "Name already exists",
        match: [/^[a-zA-Z0-9]*$/, "No special characters allowed"],
    },
    email: {
        type: String, trim: true,
        unique: "Email already exists",
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required",
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String
})



UserSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
}).get(() => { return this._password })

UserSchema.virtual("confirmPassword").set(function (password) {
    this._confirmPassword = password
}).get(function () { return this._confirmPassword })


UserSchema.path("hashed_password").validate(function (v) {
    if (this.isNew && !this._password) {
        this.invalidate("password", "Password is required")
    }
    if (this._password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords need to match.');
    }
}, null)

UserSchema.path("name").validate(function (v) {
    if (this.name.length > 10) {
        this.invalidate("name", "Name cant be longer then 10 characters")
    }
}, null)

UserSchema.path("email").validate(function (v) {
    if (this.email.length > 15) {
        this.invalidate("email", "email cant be longer then 15 characters")
    }
}, null)


UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
        } catch (err) {
            return ""
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ""
    }
}

export default mongoose.model("User", UserSchema);