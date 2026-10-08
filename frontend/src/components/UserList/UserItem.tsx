import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router";

export const UserItem=({user})=>{
    const {setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
     console.log("in user item"+ user);
    const handleUserClick=()=>{setCurrentUser(user);
        navigate("dashboard");
    };
    return(
        <li onClick={handleUserClick}>{user?.name || "مستخدم بدون اسم"}</li>
    );
};
export default UserItem;