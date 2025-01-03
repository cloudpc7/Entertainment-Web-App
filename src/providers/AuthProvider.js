import { useAuth } from '../utilities/useAuth';
import AuthContext from '../AuthContext';


export const AuthProvider = ({ children }) => {
    const authValues = useAuth();
    return (
        <AuthContext.Provider value={authValues}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;