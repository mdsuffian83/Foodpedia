import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const user = useSelector(state => {
    if (state.user && !state.user.error) {
      return state.user;
    }
    return null;
  });

  //{ _id, picturePath }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between">
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget
            loginUser={user}
            userId={user ? user._id : ''}
            picturePath={user ? user.picturePath : ''}
          />
          {/* userId={_id} picturePath={picturePath} */}
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}>
          {user && (
            <MyPostWidget userId={user._id} picturePath={user.picturePath} />
          )}

          <PostsWidget myUserId={user ? user._id : null} isProfile={false} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            {user && <FriendListWidget userId={user._id} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
