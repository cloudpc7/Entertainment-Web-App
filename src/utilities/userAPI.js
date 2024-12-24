// userAPI.js
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    getAuth, 
  } from 'firebase/auth';
  
  export const createUser = async (auth, email, password, confirmPassword) => {

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }
  
    try {
        const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
        );
        const user = userCredential.user;

    }   catch (error) {
            return error;
        }
  };
  
  export const loginUser = async (auth, email, password) => {
    try {
      const auth = getAuth();
      if(!email) {
        throw new Error('Email cannot be empty.');
      }
     
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authorizedUser = userCredential.user;
      return authorizedUser; 
    } catch (error) {
        console.error(error);
        return error;
    }
  };