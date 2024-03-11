const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;    

    try {
        // Verifica que el usuario exista
        let usuario = await Usuario.findOne({ email });
        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ingresado ya se encuentra registrado en nuestro sistema'
            })
        }
        
        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt );
    
        await usuario.save(); 
        
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Porfavor comunicate con el administrador'
        })
    }
}

const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;   

    try {
        // Verifica que el usuario exista
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        // Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msn: 'Contraseña incorrecta'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mgs: 'Porfavor comunicate con el administrador'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;    

    // Generar Token
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid, 
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};