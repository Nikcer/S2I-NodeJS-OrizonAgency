const Product = require ('../models/product')

const productList = async (req, res) => {

    try{
        const products = await Product.find()
        res.status(200).json(products) 
    } catch (err){
        res.status(404).json({ message : err})
    }
}

const productById = async(req, res) => {
    
    try{
        const {id} = req.params;
        const product = await Product.findById (id)
        if (!product){
            return res.status(404).json({ message : 'Prodotto non trovato'})
        } res.status(200).json(product)
    }catch (err){
        res.status(500).json({ message : err})
    }
}
const createProduct = async (req, res) => {

    try{
        const {nome} = req.body
        const newProduct = await Product.create({nome})
        res.status(201).json(newProduct)
    } catch (err){
        res.status(500).json({ err , message : 'Impossibile creare il prodotto'})
    }

}

const updateProduct = async (req, res) => {

    try{
        const {id} = req.params;
        const {nome} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate (id ,{nome})
        if (!updatedProduct){
            return res.status(404).json({ message : 'Prodotto non trovato'})}
        res.status(200).json(updatedProduct)
    } catch (err){
        res.status(500).json({ err, message : 'Impossibile aggiornare il prodotto'})
    }
}

const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete (id)
        if (!deletedProduct){
            return res.status(404).json({ message : 'Prodotto non trovato'})}
        res.status(200).json({message : 'Prodotto eliminato correttamente'})       
    } catch (err){
        res.status(500).json({ err, message : 'Impossibile eliminare il prodotto'})
    }
}

module.exports = {
    productList,
    productById, 
    createProduct, 
    updateProduct, 
    deleteProduct
}
