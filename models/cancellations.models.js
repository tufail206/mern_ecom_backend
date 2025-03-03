import { Schema,model } from "mongoose";
const cancellationSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    productId:{type:Schema.Types.ObjectId,ref:'Product'},
    reason:{type:String},
    cancelledAt:{type:Date,default:Date.now}
})
module.exports= model('Cancellation',cancellationSchema)