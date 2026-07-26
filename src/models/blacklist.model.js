const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [ture,"Token is required to be added in blacklist"],
    },
},{
    timestamps: true
})

const tokenBlacklistModel = mongoose.model("blacklistToken",blacklistTokenSchema)

module.exports = tokenBlacklistModel