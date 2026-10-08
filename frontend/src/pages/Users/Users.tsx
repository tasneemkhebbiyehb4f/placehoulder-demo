import { useEffect, useState } from "react"
import { getUsers } from "../../services/userService";
import Navbar from "../../components/Navbar/Navbar";
import { UserList } from "../../components/UserList/UserList";

const Users = () => {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] =useState(true);
  useEffect(()=>{
    const fetchUsers = async()=>{
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };
    fetchUsers();
  },[]);

    return (
        <>
        <Navbar/>
        <main>
            <h1>Select a User</h1>
            {
                loading?(<p>Loading</p>):(<UserList users ={users}/>)
            }
        </main>
        </>
  )
}

export default Users