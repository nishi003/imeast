

const Purchases = require('../models/Purchase');
const Notification = require('../models/notifications');
const Transaction = require('../models/Transaction');

exports.purchasePost = async (req, res) => {
    try {
        const userID = req.body.userID;
        const moduleID = req.body.moduleID;

        const purchase = new Purchases({
            userID: userID,
            moduleID: moduleID
        });

        try {
            await purchase.save()
        } catch (error) {
            console.log("error saving purchase")
        }

        //get username from userid:
        const user = await User.findById(userId);
        const firstName = user ? user.firstName : null;
        const module = await Module.findById(moduleId);
        const price = module ? module.price : null;

        //send a notification
        const notification = new Notification({
            username: username,
            type: "Purchased Module" + String(moduleID),
            link: ""
        });

        //add to transaction
        const transaction = new Transaction({
            username: firstName,
            moduleID: moduleID,
            price: price,
            status: "Completed"
        });

    }
    catch (err) {
        console.log(err)
    }

}
