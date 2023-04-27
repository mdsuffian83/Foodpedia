import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  // ShareOutlined,
  Send,
  Delete,
  Edit,
  // SendAndArchive,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Grid,

  // Item,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import EditPostWidget from './EditPostWidget';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, deletePost } from 'state';

const PostWidget = ({
  postId,
  loginUserId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  postComments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentMsg, setCommentMsg] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const loggedInUserId = useSelector(state => {
    if (state.user && !state.user.error) {
      return state.user._id;
    }
    return '';
  });
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const submitComment = async () => {
    //
    const response = await fetch(`http://localhost:3001/comment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        postId: postId,
        commentMsg: commentMsg,
      }),
    });
    const updatedPost = await response.json();
    console.log('post comment=>', updatedPost);
    dispatch(setPost({ post: updatedPost }));
  };
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePostApi = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(deletePost({ post: updatedPost }));
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <WidgetWrapper m="2rem 0">
      {/* {loginUserId !== postUserId && (
        <Friend
        loginUserId = {loginUserId}
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
      )} */}
      <Friend
        loginUserId={loggedInUserId}
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{postComments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {loggedInUserId && loggedInUserId === postUserId && (
          <IconButton onClick={() => deletePostApi()}>
            <Delete />
          </IconButton>
        )}
        {loggedInUserId && loggedInUserId === postUserId && (
          <IconButton onClick={() => toggleEditMode()}>
            <Edit />
          </IconButton>
        )}
      </FlexBetween>
      {isEditMode && (
        <EditPostWidget
          postId={postId}
          postDesc={description}
          toggleEditMode={() => toggleEditMode()}></EditPostWidget>
      )}
      {isComments && (
        <Box mt="0.5rem">
          <Grid container spacing={1}>
            <Grid>
              <>
                <TextField
                  className="commentbox"
                  id="standard-basic"
                  label="Comment"
                  variant="standard"
                  value={commentMsg}
                  onChange={e => setCommentMsg(e.target.value)}
                  style={{ width: '380px' }}
                />
              </>
            </Grid>
            <Grid xs="auto">
              <>
                <IconButton onClick={() => submitComment()}>
                  <Send />
                </IconButton>
              </>
            </Grid>
          </Grid>
          <Divider />
          {postComments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: 'primary',
                  mb: '0.5rem',
                }}>
                {comment.firstName}
              </Typography>
              <Typography
                sx={{ fontSize: '1rem', color: 'text.primary', pl: '1rem' }}>
                {comment.commentMsg}
              </Typography>
            </Box>
          ))}
          {/* {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))} */}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
