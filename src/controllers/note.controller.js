const Note= require('../models/note.model')


exports.createNote = async (req,res)=>{

    try{
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId
        });

        res.status(201).json(note);
    
    }catch (error){
        res.status(500).json({message:error.message})
    }
}

exports.getNotes = async (req,res)=>{
    try{
        const notes = await Note.find({userId: req.userId});
        res.json(notes);
    } catch(error){
        res.status(500).json({message:error.message})
    }
}


exports.delete = async (req,res)=> {

    try{
        await Note.findByIdAndDelete(req.params.id);
        res.json({message:'note deleted successfully'});
    } catch (error){
        res.status(500).json({message:error.message})
    }

}