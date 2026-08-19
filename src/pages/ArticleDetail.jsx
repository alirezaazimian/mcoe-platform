import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { djangoApi } from '@/api/djangoApi';
import ArticleLayout from '@/components/ui/ArticleLayout';

export default function ArticleDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);

  djangoApi.articles
    .get(id)
    .then(async (data) => {
      setItem(data);

      const allArticles = await djangoApi.articles.list();

      const relatedItems = allArticles
        .filter(
          (article) =>
            String(article.id) !== String(id)
        )
        .slice(0, 3);

      setRelated(relatedItems);
    })
    .catch((error) => {
      console.error(
        'Failed to load article detail:',
        error
      );

      setItem(null);
      setRelated([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [id]);

  return <ArticleLayout item={item} type="article" related={related} loading={loading} />;
}