import{API_URL}from "../config/api";
export const getUserAlbums = async (userId) => {
    const response = await fetch(
        `${API_URL}/albums?userId=${userId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch albums");
    }

    return response.json();
};

export const getAlbumPhotos = async (albumId) => {
    const response = await fetch(
        `${API_URL}/photos?albumId=${albumId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch photos");
    }

    return response.json();
};
export const getAlbum = async (albumId) => {
    const response = await fetch(
       `${API_URL}/albums/${albumId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch album");
    }

    return response.json();
};