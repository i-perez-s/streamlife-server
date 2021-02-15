import jwt from 'jsonwebtoken'


export let verificaToken = (req: any, res: any, next: any) => {
    let token = req.get('token')
    jwt.verify(token, process.env.TOKEN_SEED, (err: any, decoded: any) => {
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
