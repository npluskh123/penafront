import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoveUpIcon from '@mui/icons-material/MoveUp';

import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Link } from 'react-router-dom';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';

export const Post = ({
  _id,
  numberCarpet,
  surname,
  adress,
  date,
  payment,
  length,
  width,
  category,
  sum,
  telephone,
  comment,
  status,
  imageUrl,
  user,
  children,
  isFullPost,
  isLoading,
  isEditable,
  createdAt,
}) => {
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {};

  const stat = ['в работе', 'готов к отгрузке', 'получен клиентом'];

  return (
    <div
      className={clsx(
        { [styles.root0]: status == 0 },
        { [styles.root1]: status == 1 },
        { [styles.root2]: status == 2 },
      )}>
      <Link to={`/posts/${_id}/edit`}>
        {/* <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}> */}
        {isEditable && (
          <div className={styles.editButtons}>
            {/* <Link to={`/posts/${_id}/edit`}> */}
            {/* <IconButton color="primary">
              <EditIcon />
            </IconButton> */}
            {/* </Link> */}
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        {imageUrl && (
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            //alt={numberCarpet}
          />
        )}
        <div className={styles.wrapper}>
          {/* <UserInfo {...user} additionalText={createdAt} /> */}

          <div className={styles.indention}>
            <h4 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
              {isFullPost ? (
                numberCarpet
              ) : (
                <Link to={`/posts/${_id}`}>
                  №{numberCarpet} {surname} {adress}
                </Link>
              )}
            </h4>
            <h2 className={clsx(styles.info, { [styles.infoFull]: isFullPost })}>
              {isFullPost ? numberCarpet : <ul></ul>}
            </h2>
            {/* <ul className={styles.tags}>
            {surname.map((name) => (
              <li key={name}>
                <Link to={`/surname/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul> */}
            {/* {children && <div className={styles.content}>{children}</div>} */}

            <ul className={styles.postDetails}>
              <li>
                {payment}
                {!payment ? payment : <PriceCheckIcon />}
                <MoveUpIcon /> <span>{stat[status]}</span>
              </li>
            </ul>

            <ul className={styles.postDetails}>
              <li>
                <span>{date}</span>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};
