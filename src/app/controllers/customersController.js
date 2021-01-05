const userService = require('../models/services/userService')

module.exports.index = async(req, res, next) => {

    const data = await userService.getList(1, 10);
    console.log(data);

    const numberOfPage = Math.ceil(parseFloat(data.count / 10.0));

    res.render('customers/customersShow', {
        users: data.users,
        numberOfPage: numberOfPage
    });
}

module.exports.getEditPage = async(req, res, next) => {
    const id = req.params.id;
    const user = await userService.getUserProfile(id);
    console.log(user);
    res.render('customers/customersEdit', { user: user });
}