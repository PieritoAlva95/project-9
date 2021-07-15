const {response} = require('express');
const Oferta = require('../models/oferta');



const crearOferta = async(req, res = response) => {
    const uid = req.uid;
    const oferta = new Oferta({
        usuario: uid,
        ...req.body
    });

    try {
        const ofertaDB = await oferta.save();
        res.json({
            ok: true,
            medico: ofertaDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'consulte  con el administrador'
        })
    }
}

//ver información de una solo oferta 

const verOfertaUnica = async (req, res = response) =>{

    try {
    const id  = req.params.id;
    const ofertaDB = await Oferta.findById(id);
      
    if (!ofertaDB) {
        return res.status(404).json({
            ok: true,
            msg: 'Oferta no encontrado por id',
        });
    }

    res.json({
        ok:true,
         ofertaDB
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'consulte  con el administrador'
        })
    }
}

//ver todas las ofertas  de un usuario

//FALTA


//ver todas las ofertas 
const verOfertas= async(req, res) =>{

    const desde = Number(req.query.desde) || 0;
    const [ ofertas, total ] = await Promise.all([
        Oferta
            .find()
            .skip( desde ),
            // .limit( 5 ),

            Oferta.countDocuments()
    ]);


    res.json({
        ok: true,
        ofertas,
        total
    });

 
}

const verOfertasByUser = async(req, res) => {
    const listaOfertas = await Oferta.find({usuario:req.params.id});
    res.json(listaOfertas);
}


const actualizarOferta = async(req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;
    try {
        const ofertaDB = await Oferta.findById(id);
        
        if (!ofertaDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Oferta no encontrado por id',
            });
        }

        const cambioOferta = {
            ...req.body,
            usuario: uid
        }

        const ofertaActualizado = await Oferta.findByIdAndUpdate(id, cambioOferta, {new:true});
        
        res.json({
            ok:true,
            oferta: ofertaActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'consulte  con el administrador'
        })
    }
}

const borrarOferta = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        const oferta = await Oferta.findById( id );
        if ( !oferta ) {
            return res.status(404).json({
                ok: true,
                msg: 'oferta no encontrado por id',
            });
        }
        await Oferta.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Oferta borrado'
        }); 

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    crearOferta,
    actualizarOferta,
    verOfertaUnica,
    verOfertas,
    borrarOferta,
    verOfertasByUser
}