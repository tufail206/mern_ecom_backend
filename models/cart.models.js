import { Schema,model } from "mongoose";
const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    image: {
        type: String,
         default:"/image/placeholder.png",
    },
    //select sub-image 3
   subImage:{
    type: [String],
    default:["/image/placeholder.png","/image/placeholder.png","/image/placeholder.png"]
   }
   ,
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
     totalPrice:{
        type:Number,
        default:0
     }
},{timestamps:true})
module.exports= model('Cart', cartSchema);