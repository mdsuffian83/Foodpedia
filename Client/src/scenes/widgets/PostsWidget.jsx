import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = ({ myUserId, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const token = useSelector(state => state.token);

  const getPosts = async () => {
    const response = await fetch('http://localhost:3001/posts', {
      method: 'GET',
      // headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log('all posts==>', data);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${myUserId}/posts`,
      {
        method: 'GET',
        // headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log('user posts==>', data);
    dispatch(setPosts({ posts: data }));
  };

  console.log('POSTS=>', posts);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    
  }, [posts]);

  return (
    <>
      {posts &&
        !posts.error &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            postComments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              // loginUserId={myUserId ? myUserId : ''}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              postComments={postComments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
