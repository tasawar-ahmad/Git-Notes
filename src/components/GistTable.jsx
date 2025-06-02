import '../styles/GistTable.css';
import GistRow from './GistRow';

const dummyUsers = Array(9).fill({
  name: 'John Doe',
  avatar: 'src/assets/user-profile.jpg',
});

const GistTable = () => (
  <div>
    <table className="gist-table">
      <thead className="gist-table-head">
        <tr>
          <th className="gist-th">Name</th>
          <th className="gist-th">Notebook Name</th>
          <th className="gist-th">Keyword</th>
          <th className="gist-th">Updated</th>
          <th className="gist-th">Actions</th>
        </tr>
      </thead>
      <tbody>
        {dummyUsers.map((user, idx) => (
          <GistRow key={idx} user={user} />
        ))}
      </tbody>
    </table>
  </div>
);

export default GistTable;
