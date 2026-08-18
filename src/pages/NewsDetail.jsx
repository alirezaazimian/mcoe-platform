import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { djangoApi } from '@/api/djangoApi';
import ArticleLayout from '@/components/ui/ArticleLayout';

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

  djangoApi.news
    .get(id)
    .then(async (data) => {
      setItem(data);

      const allNews = await djangoApi.news.list();

      const relatedItems = allNews
        .filter(
          (newsItem) =>
            String(newsItem.id) !== String(id)
        )
        .slice(0, 3);

      setRelated(relatedItems);
    })
    .catch((error) => {
      console.error(
        'Failed to load news detail:',
        error
      );

      setItem(null);
      setRelated([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [id]);

  return <ArticleLayout item={item} type="news" related={related} loading={loading} />;
}