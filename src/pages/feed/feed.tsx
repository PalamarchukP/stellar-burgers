import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { feedSelect, feedIsLoadingSelect } from '@slices';
import { fetchFeed } from '@thunks';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const feed = useSelector(feedSelect);
  const isLoading = useSelector(feedIsLoadingSelect);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading || !feed) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={feed.orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
