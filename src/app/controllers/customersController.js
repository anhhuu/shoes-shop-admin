const roleMongooseModel = require('../models/mongooseModels/roleMongooseModel');
const userService = require('../models/services/userService')

module.exports.index = async(req, res, next) => {
    const page = req.query.page;
    const data = await userService.getList(page, 10);

    const numberOfPage = Math.ceil(parseFloat(data.count / 10.0));

    res.render('customers/customersShow', {
        users: data.users,
        numberOfPage: numberOfPage,
        page: !page ? 1 : page
    });
}

module.exports.getEditPage = async(req, res, next) => {
    const id = req.params.id;
    const user = await userService.getUserProfile(id);
    const role = await roleMongooseModel.findById(user.role_id);
    user.role_id = role;
    console.log(user);
    res.render('customers/customersEdit', { account: user });
}

module.exports.changeBlockedStatus = async(req, res, next) => {
    const id = req.body.user_id;
    const isBlocked = req.body.isBlocked;

    await userService.updateBlockedStatus(id, isBlocked);

    res.redirect('/customers/id/' + id);
}