const Room = require('../Models/Room');

module.exports = {
    destroy: async(req, res) => {
        const { id } = req.params;

        const room = await Room.deleteOne({ _id: id });

        res.json(room);
    },
    index: async (req, res) => {
        const rooms = await Room.find();

        res.json(rooms);
    },
    show: async(req, res) => {
        const { id } = req.params;

        const room = await Room.findById(id);

        res.json(room);
    },
    store: async (req, res) => {
        const { name, questionList, answerList } = req.body;

        const room = await Room.create({
            name,
            questionList, answerList
        })

        res.json(room);
    },
    update: async(req, res) => {
        const { id } = req.params;
        const { name, questionList } = req.body;

        let updateDocument = {}
        if(name)
            updateDocument.name = name;
        if(questionList)
            updateDocument.questionList = questionList;

        const room = await Room.updateOne({
            _id: id
        }, updateDocument);

        res.json(room)
    }
}