const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const middlewareController = {
    //verifyToken
    verifyTokenGET: (req, res, next) => {
        // console.log(req.headers['authorization']);
        const token = req.headers['authorization'];
        if (token) {
            const accessToken_1 = token.split(" ")[1];
            const accessToken = accessToken_1.substr(1, accessToken_1.length - 2)
            jwt.verify(accessToken, process.env.JWT_ACCSESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid!!!");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You 're not auth!!!");
        }
    },

    verifyTokenAndAdminAuthGET: (req, res, next) => {

        middlewareController.verifyTokenGET(req, res, () => {
            if (req.user.role == 'admin') {
                next();
            }
            else {
                return res.status(403).json("You 're not allowed to delete other!!!");
            }
        });
    },

    verifyTokenPOST: (req, res, next) => {
        const token = req.body.headers['Authorization'];
        if (token) {
            const accessToken_1 = token.split(" ")[1];
            const accessToken = accessToken_1.substr(1, accessToken_1.length - 2)
            jwt.verify(accessToken, process.env.JWT_ACCSESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid!!!");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json("You 're not auth!!!");
        }
    },

    verifyTokenAndAdminAuthPOST: (req, res, next) => {
        middlewareController.verifyTokenPOST(req, res, () => {
            if (req.user.role == 'admin') {
                next();
            }
            else {
                res.status(403).json("You 're not allowed to delete other!!!");
            }
        });
    },

};

module.exports = middlewareController