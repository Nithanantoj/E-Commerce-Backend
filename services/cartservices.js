const { Cart }  = require('../models/cartModel')
const {Product} = require('../models/productModel')



const deleteProduct = async(id, productId) => {

    const cart =  await Cart.findOne({userId : id});
    //console.log(cart)
    if(cart.product.length == 1 ){
        await Cart.deleteOne({userId : id})

        return "Cart deleted Successfully"
    }
    else{
        const products =  await cart.product.filter((item) => item.productId !== productId);
        try{

            cart.product = products;
            cart.save();

            return "Cart product deleted Successfully"
        }catch(err){
            console.log(err)
            return "product not deleted"
        }
    }

}

const getProducts = async(id) => {
    try{
        const cart = await Cart.findOne({userId : id});
        if(!cart)
            return "cart does not exist"
        

        const productIds = cart.product.map(product => product.productId)
        

        const products = await Product.find({ id : { $in : productIds}})
        
        var subtotal = 0;
        const productDetails = cart.product.map(item => {
            const product = products.find(p => p.id === item.productId);
            subtotal += product.price * item.quantity
            return {
                id : item.productId,
                title: product.title,
                description: product.description,
                price : product.price,
                image : product.image,
                quantity: item.quantity,
                total : (product.price * item.quantity)
            };
        })

        return {productDetails, subtotal}
    }catch(err){
        return "Error retrieving cart" 
    }
}

const deleteCart = async(user_id) => {

        await Cart.deleteOne({userId : user_id})

}

module.exports = {deleteProduct, getProducts, deleteCart}