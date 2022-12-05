const getUser = async (req, res) => {
    res.send('Get User');
};

const deleteUser = async (req, res) => {
    res.send('Delete User');
};

const editUser = async (req, res) => {
    res.send('Edit User');
};

module.exports = {
    getUser,
    deleteUser,
    editUser,
};
