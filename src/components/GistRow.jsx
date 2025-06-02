import '../styles/GistRow.css';

const GistRow = ({ user }) => (
  <tr className="gist-row">
    <td className="gist-user">
      <img src={user.avatar} alt="avatar" className="avatar" />
      <span>{user.name}</span>
    </td>
    <td className="gist-cell">Notebook Name</td>
    <td className="gist-cell">
      <span className="keyword-pill">Keyword</span>
    </td>
    <td className="gist-cell">Last updated a few hours ago</td>

  </tr>
);

export default GistRow;
