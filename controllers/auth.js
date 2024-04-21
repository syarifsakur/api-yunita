const user = require("../models/user")
const artikel = require("../models/artikel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports={

    register:async(req,res)=>{
        const {namaLengkap,noHp,birthDate,email,password}=req.body;

        if(!namaLengkap || !password || !email || !birthDate || !noHp){
            return res.status(400).json({message:"username,email,password,foto,tempat tanggal lahir,jenis kelamin tidak boleh kosong!"})
        }       
        if(password.length < 8){
            return res.status(400).json({message:"password minimal 8 karakter"})
        }
        if(!email.includes("@")){
            return res.status(400).json({message:"harus dengan format @"})
        }
        try {
            const cekuser = await user.findAll()
            if(cekuser.email === email){
                return res.json({message:"email sudah terdaftar"})
            }
            
            const users = await user.findOne({where:{email:email}})
            if(users){
                console.log("email sudah terdaftar")
                return res.status(400).json({message:"email sudah terdaftar"})
            }
            
            const hashPassword = await bcrypt.hash(password,10)
            const akun= await user.create({
                namaLengkap:namaLengkap,
                noHp:noHp,
                birthDate:birthDate,
                email:email,
                password:hashPassword,
            })
            return res.status(201).json({message:"registrasi berhasil",data:akun})
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    },

    login:async(req,res)=>{
        const {email,password} = req.body
        if(!email && !password){
            return res.status(400).json({message:"email atau password tidak boleh kosong!"})
        }       
        if(!password){
            return res.status(400).json({message:"password tidak boleh kosong!"})
        }
        if(!email){
            return res.status(400).json({message:"email tidak boleh kosong!"})
        }
        if(!email.includes("@")){
            return res.status(400).json({message:"harus dengan format @"})
        }

        try {
            const usernames = await user.findOne({
                where:{
                    email:email
                }})
            if(!usernames){
                return res.status(404).json({message:"email tidak terdaftar"})
            }
            const passwords = await bcrypt.compare(password, usernames.password)
            if(!passwords){
                return res.status(404).json({message:"password salah!"})
    }
            //create jwt
            const token=jwt.sign({
                id:usernames.id
            },
            "qwertyuiop",
            {expiresIn:'1d'})

            await usernames.update({token:token}) 
            
            res.cookie("token",token,{
                httpOnly:true,
                maxAge: 24 * 60 * 60 * 1000
            })
            
            return res.status(200).json({message:"login berhasil!",id:usernames.id,token:token})
            
        } catch (error) {
            return res.status(500).json({message:"error",error})
        }
        
    },

    addArtikel:async(req,res)=>{
        const {dokter,judul}= req.body;
        const foto = req.file;

        try {
            const fotoPath = `${req.protocol}://${req.get('host')}/${foto.path}`;
            const fotos = fotoPath.replace(/\\/g, '/')
            const response = await artikel.create({
                foto:fotos,
                dokter:dokter,
                judul:judul
            })

            return res.status(201).json({message:"berhasil add artikel",response})
        } catch (error) {
            return res.status(500).json({message:"internal server error",error})
        }
    },

    getArtikel:async(req,res)=>{
        try {
            const response = await artikel.findAll()

            return res.status(200).json({message:"succes",artikel:response})
        } catch (error) {
            return res.status(500).json({message:"internal server error"})
        }
    }

}