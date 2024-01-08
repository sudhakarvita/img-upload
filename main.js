const express = require('express')
const mongoose = require("mongoose")
const app = express()
const multer =require("multer")
const dotenv = require("dotenv")
const fs = require("fs")
const Imgmodel = require('./img-model.js')
dotenv.config()

mongoose.connect(process.env.DB_URL)
    .then( console.log('db connected'))
    .catch(err =>{
            console.log('error',err)
    })

app.use(express.json());

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     if(!fs.existsSync('upload'))
    //   {
    //     fs.mkdirSync('upload')
    //   }

    //   cb(null, 'upload/');
    // },
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    var data = {
        fullname:req.body.fullname,
        imagePath:req.file.filename
    }
    console.log(data);
    try{
        const images = await Imgmodel.create(data)
       return res.status(200).json(images)
    }catch(err){
       return res.status(500).json({err:'error'})
    }
  });

  //multiple files uploads

  app.post('/uploadfiles', upload.array('files'), async (req, res) => {
    if (!req.files) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filenames = req.files.map(files => files.filename);

    const data = {
        fullname: req.body.fullname,
        imagePath: filenames
    };

    console.log(data);

    try {
        const images = await Imgmodel.create(data);
        return res.status(200).json(images);
    } catch (err) {
        return res.status(500).json({ err: 'error' });
    }
});


//port

app.listen(8000,()=>{
    console.log(`port on ${process.env.port}`)
});