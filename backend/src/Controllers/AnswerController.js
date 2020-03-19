const Room = require('../Models/Room');

module.exports = {
    store: async (req, res) => {
        const { id, answers } = req.body;

        const room = await Room.updateOne({
            _id: id
        }, {
            $push: {
                answerList: [ answers ],
            }
        });

        res.json(room)
    }
}