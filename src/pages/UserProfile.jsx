import { logout } from '../tools/auth'
import useAuthStore from "../store/authStore";

const UserProfile = () => {

    const allUserData = useAuthStore((state) => state.allUserData);

    console.log(allUserData);

    const handleLogout = async () => {
        const { error } = await logout();
        if (!error) {
            window.location.reload();
        }
    };

    return (
        <>
            <div>UserProfile</div>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}

export default UserProfile

