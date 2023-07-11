import { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } from "../constants/http_status"

const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

export default (req: any, res: any, next:any) => {
    const authToken = req.header('Authorization');
    const token = authToken?.replace('Bearer ','');
    if(!token) return res.status(HTTP_UNAUTHORIZED).send({ error: 'Please authenticate.'});
    try {   
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) 
        req.user = decoded
    } catch (e) {
        res.status(HTTP_UNAUTHORIZED).send({ error: 'Please authenticate.'});
    }

    return next();
}