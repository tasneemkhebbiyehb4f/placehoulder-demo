import UserItem from "./UserItem";
export const UserList =({users}) =>{
    return(
        <ul>
            {
                users.map((user)=>(<UserItem user={user} >
                </UserItem>))
            }
        </ul>
    );
};