import { logout } from '../tools/auth'

const UserProfile = () => {

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

