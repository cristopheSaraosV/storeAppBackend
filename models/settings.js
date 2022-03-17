const { Schema, model } = require('mongoose');

const SettingsSchema = Schema({    
    saleLow : {
        type: Number,
        required: [true, 'The sale low is required' ]
    },   
    saleHight : {
        type: Number,
        required: [true, 'The sale hight is required' ]
    },   
    productHight : {
        type: Number,
        required: [true, 'The product hight is required' ]
    }
});

SettingsSchema.methods.toJSON = function(){
    const {__v,_id, ...settings} = this.toObject();
    settings.uid = _id;
    return settings
}

module.exports = model( 'Settings',SettingsSchema )