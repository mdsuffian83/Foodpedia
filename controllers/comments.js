import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { userId, postId, commentMsg } = req.body;
    const user = await User.findById(userId);
    const newComment = new Comment({
      userId,
      postId,
      firstName: user.firstName,
      lastName: user.lastName,
      commentMsg,
    });
    await newComment.save();
    //newComment._id
    const post = await Post.findById(postId);
    post.postComments.push(newComment._id);
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { postComments: post.postComments },
      { new: true }
    ).populate('postComments');
    // const postComments = await Comment.find({ postId: postId });
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETE */
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      throw new Error('Comment not found');
    }
    const post = await Post.findById(deletedComment.postId);
    post.postComments = post.postComments.filter(
      comment => comment.toString() !== deletedComment._id.toString()
    );
    await post.save();
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
