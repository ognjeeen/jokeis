'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchJoke } from '@/utils/request';

const JokePage = () => {
  const { id } = useParams();

  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJokeData = async () => {
      if (!id) return;
      try {
        const joke = await fetchJoke(id);
        setJoke(joke);
      } catch (error) {
        console.error('Error fetching joke:', error);
      } finally {
        setLoading(false);
      }
    };

    if (joke === null) {
      fetchJokeData();
    }
  }, [id, joke]);

  return <div>JokePage</div>;
};

export default JokePage;
