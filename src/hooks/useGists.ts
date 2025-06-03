import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';

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
  const { user } = useAuth();
  const fetchGists = async () => {
    setLoading(true);
    try {
      const url = user
        ? 'https://api.github.com/gists' // Authenticated request → gets *your* gists
        : 'https://api.github.com/gists/public'; // Unauthenticated → global public gists
      
      const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      };
      
      if (user) {
        headers.Authorization = `Bearer  ${import.meta.env.VITE_GITHUB_TOKEN}`;
      }
      
      const response = await fetch(url, { headers });

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

  useEffect(() => {
    
    fetchGists();
  }, [user]);

  return { gists, loading, error };
};
