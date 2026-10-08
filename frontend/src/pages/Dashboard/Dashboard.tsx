import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/userContext";

export const Dashboard = () => {
    const { currentUser } =
        useContext(UserContext);

    return (
        <>
            <Navbar />

            <main>
                <h1>
                    Welcome, {currentUser?.name}
                </h1>

                <p>
                    Username: {currentUser?.username}
                </p>
                   <p>
                    Username: {currentUser?.email}
                </p>
            </main>
        </>
    );
};

export default Dashboard;