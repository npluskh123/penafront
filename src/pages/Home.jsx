import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Home = () => {
  //запрос на бэк
  const isAuth = useSelector(selectIsAuth);

  const dispathc = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status == 'loading';
  // const isTagsLoading = tags.status == 'loading';

  React.useEffect(() => {
    dispathc(fetchPosts());
    dispathc(fetchTags());
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Все" />
        <Tab label="В работе" />
        <Tab label="Готовые к отгрузке" />
        <Tab label="Завершенные" />
        <Tab label="Корзина" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={14} item>
          {(isPostsLoading ? [...Array(15)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                //title={obj.title}
                numberCarpet={obj.numberCarpet}
                surname={obj.surname}
                adress={obj.adress}
                date={obj.date}
                payment={obj.payment}
                length={obj.length}
                width={obj.width}
                category={obj.category}
                sum={obj.sum}
                telephone={obj.telephone}
                comment={obj.comment}
                status={obj.status}
                //imageUrl={obj.imageUrl}
                user={{
                  avatarUrl:
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                  fullName: 'Keff',
                }}
                createdAt={obj.createdAt}
                //viewsCount={obj.viewsCount}
                //commentsCount={3}
                //tags={['react', 'fun', 'typescript']}
                isEditable
              />
            ),
          )}
        </Grid>
        {/* <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
