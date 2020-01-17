const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '0124e25ee74f495f8d426b49219d797e'
   });
 
const handleApiCall = (req, res) => {

    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
            .then(data => {
                res.json(data)
                
            })
            .catch(error => res.status(400).json('unable to work with API'))
}   

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(error => res.status(400).json('unable to get entrie(s)'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}