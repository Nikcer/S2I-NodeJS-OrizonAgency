const User = require('../models/user');

const userList = async (req, res) => {

    try{
        const users = await User.find()
        res.status(200).json(users) 
    } catch (err){
        res.status(404).json({ message : err})
    }
}

const userById = async(req, res) => {
    
    try{
        const {id} = req.params;
        const user = await User.findById (id)
        if (!user){
            return res.status(404).json({ message : 'Utente non trovato'})
        } res.status(200).json(user)
    }catch (err){
        res.status(404).json({ message : "Utente non trovato"})
    }
}

const createUser = async (req, res) => {
    
       
    try { 
        const {nome, cognome, email}= req.body
        const newUser = await User.create ({nome, cognome, email});         
        res.status(201).json(newUser)
    } catch (err){
        res.status(500).json({err, message: 'Impossibile creare il nuovo utente'})
       }

    }

const updateUser = async (req, res) => { 
    try{
        const {id} = req.params
        const {nome, cognome, email}= req.body;
        const updatedUser = await User.findByIdAndUpdate (id, {nome, cognome, email} )
        if (!updatedUser){
            return res.status(404).json({ message : 'Utente non trovato'})
        }
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json({ err, message: "Impossibile aggiornare l'utente"})
    }

    }

const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete (id)
        
        if (!deletedUser){
            return res.status(404).json({ message : 'Prodotto non trovato'})}
        res.status(200).json({message : 'Utente cancellato correttamente'})       
    } catch (err){
        res.status(500).json({ err, message : "Impossibile cancellare l'utente"})
    }
}

module.exports = {
    userList,
    userById,
    createUser,
    updateUser,
    deleteUser
}