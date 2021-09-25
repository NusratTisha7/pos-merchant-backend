const {Schema,model}=require('mongoose')
const Joi=require('joi');

const productSchema=new Schema({
    name:String,
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category', 
        required:true,
    },
    price:Number,
    quantity:Number,
    unit:String,
    photo:{
        data:Buffer,
        contentType:String,
    }
        
},{timestamps:true});

productSchema.index({ 
    name:'text', 
})
module.exports.validate=product=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        category:Joi.string().required(),
        price:Joi.number().required(),
        quantity:Joi.number().required(),
        unit:Joi.string(),
    });
    return schema.validate(product);
}
module.exports.Product=model('Product',productSchema)