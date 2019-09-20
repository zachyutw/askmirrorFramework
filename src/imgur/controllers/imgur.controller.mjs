let controller = {};
controller.getItem = async (req, res, next) => {
    return res.send({ message: 'sign in success', tokens: req.tokens, user: req.user });
};
module.exports =  controller;
