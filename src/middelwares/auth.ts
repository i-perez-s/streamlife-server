import jwt from 'jsonwebtoken'
import { tokenSeed } from '../config'

export let verificaToken = (req: any, res: any, next: any) => {
    let token = req.get('token')
    jwt.verify(token, tokenSeed, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decoded.user
        next()
    })
}
