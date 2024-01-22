const Song = require("../models/Song");

module.exports.getSong = async(req,res) => {
    try{
        const{title, singer}=req.body;
        if (title){
        const songs =  await Song.find({title});
        return res.json({songs})
        }

        const songs =  await Song.find();
        return res.json({songs});    
    }catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports.createSong = async(req,res) => {
    const{title,singer,file}=req.body;

    const newsong =  await Song.create({title,singer,file}).save()
    return res.json({song: newsong});
}