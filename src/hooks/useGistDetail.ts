import { useEffect, useState } from 'react';

export interface Gist {
  id: string;
  description: string;
  created_at: string;
  updated_at: string;
  forks: [];
  owner: {
    login: string;
    avatar_url: string;
  };
  files: Record<string, {
    filename: string;
    language: string;
    content: string;
  }>;
}

export const useGistDetail = (gistId: string) => {
  const [gist, setGist] = useState<Gist|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGist = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        if (!response.ok) throw new Error('Failed to fetch gist');
        const data = await response.json();
        setGist(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGist();
  }, [gistId]);

  return { gist, loading, error };
};
