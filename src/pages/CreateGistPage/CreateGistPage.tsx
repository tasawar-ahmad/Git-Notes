import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import styles from './CreateGistPage.module.css';

type FileInput = {
  filename: string;
  content: string;
};

export default function CreateGistPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileInput[]>([{ filename: '', content: '' }]);

  const handleAddFile = () => {
    setFiles([...files, { filename: '', content: '' }]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof FileInput, value: string) => {
    const newFiles = [...files];
    newFiles[index][field] = value;
    setFiles(newFiles);
  };

  const handleSubmit = async () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const filesObject = files.reduce<Record<string, { content: string }>>((acc, file) => {
        if (file.filename.trim()) { // avoid empty filenames
          acc[file.filename.trim()] = { content: file.content };
        }
        return acc;
      }, {});
      console.log(filesObject)
    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, files: filesObject }),
    });
  
    if (!response.ok) {
      // Handle error
      const errorData = await response.json();
      console.error('Error creating gist:', errorData);
      return;
    }
    navigate(`/user/${user?.login}`)
  };

  return (
    <div className={styles['create-container']}>
      <h2>Create Gist</h2>
      <input
        type="text"
        className={styles['description-input']}
        placeholder="This is a Gist Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {files.map((file, index) => (
        <div className={styles['file-block']} key={index}>
          <div className={styles['file-header']}>
            <input
              type="text"
              className={styles['filename-input']}
              placeholder="Filename including extension..."
              value={file.filename}
              onChange={(e) => handleChange(index, 'filename', e.target.value)}
            />
            <button className={styles['delete-btn']} onClick={() => handleRemoveFile(index)}>🗑️</button>
          </div>
          <textarea
            className={styles['file-content']}
            rows={10}
            value={file.content}
            onChange={(e) => handleChange(index, 'content', e.target.value)}
          />
        </div>
      ))}
      <div className={styles['actions']}>
        <button className={styles['add-file-btn']} onClick={handleAddFile}>Add file</button>
        <button className={styles['create-btn']} onClick={handleSubmit}>Create Gist</button>
      </div>
    </div>
  );
}
