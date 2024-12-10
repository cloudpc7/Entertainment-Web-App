const addUser = async (userData) => {
    try {
        const response = await fetch('/user.json');
        const users = await response.json();
        users.push(userData);
        const updatedData = JSON.stringify(users,null, 2);
        console.log(users);
    } catch (error) {
        console.error('Error adding user:', error);
    }

}

export default addUser;