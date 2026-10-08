import { useNavigate } from "react-router";

const AlbumCard = ({ album }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/my-albums/${album.id}`);
  };

  return (
    <article onClick={handleClick} className="album-card">
      <h2>{album.title}</h2>
    </article>
  );
};

export default AlbumCard;
