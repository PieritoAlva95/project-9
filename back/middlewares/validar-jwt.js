const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next)=>{
    //leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(404).json({
            ok:false,
            msg:'no existe token'
        });
    }


    try {
    
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid; //puedo enviar este id a la petición opcional
        next();

    } catch (error) {
        console.log(error);

        return res.status(404).json({
            ok:false,
            msg:'token no valido'
        });
    }
   
}

module.exports = {
    validarJWT
}