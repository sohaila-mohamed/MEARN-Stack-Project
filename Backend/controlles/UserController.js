const _ = require('lodash');

function getAllStud(req, res) {
    console.log('Get all req', req);
    req.DB_Scheme.Student.find().then((res1) => { res.send(res1) }).
    catch((err) => {
        next(err);
    })
}

async function getUserByID(req, res) {
    //check if token matched with requested user 
    if (req.params.id !== req.user._id) return res.status(401).send("Access denied Invalid User token");
    //get user from db
    let user = await req.DB_Scheme.Student.findOne({ _id: req.params.id })
        //check if user exist or not 
    if (!user) return res.status(404).send("Not Found Invalid ID");
    //send response to the client 
    return res.send(_.pick(user, ['_id', 'username', 'email', 'age', 'city', 'profileImg']));


}

async function deleteUsrByID(req, res) {

    //check if token matched with requested user 
    if (req.params.id !== req.user._id) return res.status(401).send("Access denied Invalid User token");
    //check if user exist in db  
    let user = await req.DB_Scheme.Student.findOne({ _id: req.params.id })
    if (!user) return res.status(404).send("Not Found");
    let result = await req.DB_Scheme.Student.deleteOne({ _id: user._id })
    if (!result) return res.status(401).send("Error happened while deleting from db")
    res.send(result);
}
module.exports = {
    getAllStud,
    getUserByID,
    deleteUsrByID
}