import{API_URL}from "../config/api";
export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if(!response.ok){
    throw new Error("Faild to fetch users")
  }
  return response.json();
};
