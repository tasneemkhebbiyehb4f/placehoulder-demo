import { useContext, useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import AlbumCard from "../../components/Albums/AlbumCard";

import { UserContext } from "../../context/userContext";
import { getUserAlbums } from "../../services/albumsService";

const Albums = () => {
  const { currentUser } = useContext(UserContext);

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchAlbums = async () => {
      try {
        const data = await getUserAlbums(currentUser.id);

        setAlbums(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please select a user first.</p>;
  }

  return (
    <>
      <Navbar />

      <main>
        <h1>My Albums</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="albums-grid">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Albums;
