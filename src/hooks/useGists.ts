import { useEffect, useState } from 'react';

export interface Gist {
  id: string;
  description: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  files: Record<string, {
    filename: string;
    language: string;
  }>;
}

export const useGists = () => {
  const [gists, setGists] = useState<Gist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGists = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.github.com/gists', {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch gists');
        }

        const data = await response.json();
        setGists(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGists();
  }, []);

  return { gists, loading, error };
};
