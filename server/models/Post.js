import mongoose from "mongoose";
const Schema = mongoose.Schema

export const PostSchema = new Schema(
    {
        team: { type: String, required: true, minlength: 2 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        title: { type: String, required: true, minlength: 5, maxlength: 20 },
        img: { type: String, required: true },
        description: { type: String, required: true, minlength: 10, maxlength: 200 },
        date: { type: String, required: true, },
        votes: { type: Number, required: true, default: 0 },
        blank: { type: String, }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('postInfo', {
    justOne: true,
    foreignField: '_id',
    localField: 'creatorId',
    ref: 'Account'
})