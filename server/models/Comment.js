import mongoose from "mongoose";
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
    {
        creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
        postId: {type: Schema.Types.ObjectId, required: true, ref: 'Post'},
        description: {type: String, required: true, minlength: 5, maxlength: 100}
    },
    { timestamps: true, toJSON: { virtuals: true } }
)


CommentSchema.virtual('post',
{
    justOne: true,
    foreignField: '_id',
    localField: 'postId',
    ref: 'Post'
})
CommentSchema.virtual('creator',
{
    justOne: true,
    foreignField: '_id',
    localField: 'creatorId',
    ref: 'Account'
})
