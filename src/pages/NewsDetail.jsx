import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ArticleLayout from '@/components/ui/ArticleLayout';

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.News.get(id)
      .then(async (data) => {
        setItem(data);
        const all = await base44.entities.News.filter({ status: 'published' }, '-publish_date', 10);
        setRelated(all.filter(r => r.id !== id).slice(0, 3));
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  return <ArticleLayout item={item} type="news" related={related} loading={loading} />;
}