import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  commentMsg: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,

  },
  lastName: {
    type: String,

  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
