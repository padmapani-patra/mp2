const jwt = require('jsonwebtoken')
const Password = require('../../utils/password')
const { Auth, User } = require('../models')

const AuthService = {
    async createAuthLog(token, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                // Authenticate the logs schema
                const authLog = {
                    token: token,
                    _user_id: userId
                }

                // Create the Auth logs
                const auth = await Auth.create(authLog)

                resolve(auth)
            } catch (error) {
                reject({ error: error })
            }
        })
    },

    async signIn(email, password) {
<<<<<<< HEAD
        try {
            // Check if User exists
            const user = await User.findOne({ email: email })
            console.log(user);

            // If User isn't found
            if (!user || user.active == false) {
                return { error: 'Either user doesn\'t exist or was removed from the system' }
            }
            //Decrypt the password
            const decryptedPassword = await Password.decryptPassword(password, user.password)

            // If the psasword is wrong
            if (!decryptedPassword.password) {
                return { error: 'Please enter a valid password' }
=======
        return new Promise(async (resolve, reject) => {
            try {
                // Check if User exists
                const user = await User.findOne({ email: email })

                // If User isn't found
                if (!user || user.active == false) {
                    reject({ error: 'Either user doesn\'t exist or was removed from the system' })
                }

                //Decrypt the password
                const decryptedPassword = await Password.decryptPassword(password, user.password)
                // If the psasword is wrong
                if (!decryptedPassword.password) {
                    reject({ error: 'Please enter a valid password' })
                }
                // Create the signed token
                const token = jwt.sign(user.toJSON(), "minor-project-2")
                // Log the Auths
                this.createAuthLog(token, user._id)

                resolve({
                    user: user,
                    token: token
                })

            } catch (error) {
                reject(error)
>>>>>>> promise
            }
        })
    },
    async signUp(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                // If the email already exists
                const checkEmail = await User.findOne({ email: userData.email })

                if (checkEmail) {
                    reject({ error: 'User with email already exists.' })
                }

                // Encrypt the password
                const encryptedPassword = await Password.encryptPassword(userData.password)

                //If the password is wrong
                if (!encryptedPassword) {
                    reject({ error: 'Please choose a different password' })
                }

                // User Data
                let data = {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    full_name: userData.first_name + ' ' + userData.last_name,
                    email: userData.email,
                    password: encryptedPassword.password
                }
                console.log(data);
                // Create the new User
                let user = await User.create(data)

                // If user is not created
                if (!user) {
                    reject({ error: 'User was not created.' })
                }

                // SIgn In the current User 
                let res = await this.signIn(userData.email, userData.password)

                resolve({
                    user: res.user,
                    token: res.token
                })

            } catch (error) {
                reject({ error: error })
            }
<<<<<<< HEAD

            // Encrypt the password
            const encryptedPassword = await Password.encryptPassword(userData.password)

            //If the password is wrong
            if (!encryptedPassword) {
                return { error: 'Please choose a different password' }
            }

            // User Data
            let data = {
                first_name: userData.first_name,
                last_name: userData.last_name,
                full_name: userData.first_name + ' ' + userData.last_name,
                email: userData.email,
                password: encryptedPassword.password
            }

            // Create the new User
            let user = await User.create(data)

            // If user is not created
            if (!user) {
                return { error: 'User was not created.' }
            }

            // SIgn In the current User 
            let res = await this.signIn(userData.email, userData.password)

            return {
                user: res.user,
                token: res.token
            }

        } catch (error) {
            return { error: error }
        }
=======
        })
>>>>>>> promise
    }
}

module.exports = AuthService