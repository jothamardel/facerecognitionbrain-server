
const handleUsers = (req, res, db) => {
    db.select('*').from('users').then(data => {
        res.json(data); 
    });
    
}

module.exports = {
    handleUsers: handleUsers
}