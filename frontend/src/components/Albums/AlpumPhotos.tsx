import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router";

import Navbar from "../../components/Navbar/Navbar";

import { UserContext } from "../../context/userContext";

import { getAlbum, getAlbumPhotos } from "../../services/albumsService";

const AlbumPhotos = () => {
  const { albumId } = useParams();

  const { currentUser } = useContext(UserContext);

  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!currentUser || !albumId) {
      return;
    }

    const fetchAlbumData = async () => {
      try {
        const albumData = await getAlbum(albumId);

        const isOwner = Number(currentUser?.id) === Number(albumData.userId);

        if (!isOwner) {
          setAccessDenied(true);
          return;
        }

        setAlbum(albumData);

        const photosData = await getAlbumPhotos(albumId);

        setPhotos(photosData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId, currentUser]);

  if (!currentUser) {
    return <p>Please select a user first.</p>;
  }

  if (accessDenied) {
    return (
      <>
        <Navbar />

        <main>
          <h1>Access Denied</h1>
          <p>This album does not belong to the current user.</p>
        </main>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        <h1>{album?.title}</h1>

        <div className="photos-grid">
          {photos.map((photo) => (
            <article key={photo.id} className="photo-card">
              <img src={photo.thumbnailUrl} alt={photo.title} />

              <p>{photo.title}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default AlbumPhotos;
