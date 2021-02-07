import jwt from 'jsonwebtoken'
import {tokenSeed} from '../config'

export const verificaToken = (req, res, next) => {
    let token = req.get('token')
    jwt.verify(token, tokenSeed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decoded.usuario
        next()
    })
}
