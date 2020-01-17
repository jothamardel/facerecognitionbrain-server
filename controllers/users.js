
const handleUsers = (req, res, db) => {
    res.json("It is working")
    // db.select('*').from('users').then(data => {
    //     res.json(data); 
    // });
    
}

module.exports = {
    handleUsers: handleUsers
}


