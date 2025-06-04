import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';

export interface GistFile {
  filename: string;
  language: string;
  content: string; // new
}

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
    content: string;
  }>;
}

export const useGists = (fetchPublic = true, page = 1, perPage = 8) => {
  const [gists, setGists] = useState<Gist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(100);
  const { user } = useAuth();

  const fetchFileContent = async (rawUrl: string): Promise<string> => {
    const res = await fetch(rawUrl);
    if (!res.ok) throw new Error('Failed to fetch file content');
    return await res.text();
  };

  const fetchGists = async () => {
    setLoading(true);
    try {
      const url = fetchPublic
      ? `https://api.github.com/gists/public?per_page=${perPage}&page=${page}` // Unauthenticated → global public gists
      : `https://api.github.com/gists?per_page=${perPage}&page=${page}`; // Authenticated request → gets *your* gists

      const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      };
      
      if (!fetchPublic) {
        headers.Authorization = `Bearer  ${import.meta.env.VITE_GITHUB_TOKEN}`;
      }
      
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error('Failed to fetch gists');
      }
      console.log(response.headers.get('Link'))
      const linkHeader = response.headers.get('Link');
      if (linkHeader) {
        const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (lastPageMatch) {
          setTotalPages(Number(lastPageMatch[1]));
        }
      }
      const data = await response.json();
      // For each gist, fetch each file's content in parallel
      const gistsWithContent = await Promise.all(
        data.map(async (gist: any) => {
          const filesWithContent: Record<string, GistFile> = {};

          await Promise.all(
            Object.entries(gist.files).map(async ([filename, file]: [string, any]) => {
              try {
                const content = await fetchFileContent(file.raw_url);
                filesWithContent[filename] = {
                  filename: file.filename,
                  language: file.language,
                  content,
                };
              } catch (e) {
                // On error, fallback to empty content or handle differently
                filesWithContent[filename] = {
                  filename: file.filename,
                  language: file.language,
                  content: '',
                };
              }
            })
          );

          return {
            id: gist.id,
            description: gist.description,
            updated_at: gist.updated_at,
            owner: gist.owner,
            files: filesWithContent,
          };
        })
      );
      setGists(gistsWithContent);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGists();
  }, [user, page]);

  return { gists, loading, error, totalPages };
};
