const User = require('../models/User');
const Purchase = require('../models/Purchase');
const jwt = require("jsonwebtoken")

function decodeJwt(token) {
    try {
        const decoded = jwt.verify(token, 'imEast_tokenEncryptionKey');
        return decoded;
    } catch (error) {
        console.error('Error decoding JWT:', error.message);
        return null;
    }
}

exports.currentuser = async (req, res) => {
    const token = req.body.access;
    const user = await User.findById(decodeJwt(token).user.id);

    const info = {
        userID: user.id,
        isAdmin: user.isAdmin,
    };

    return res.status(200).json({ success: true, info: info });
};

exports.adminSignup = async (req, res) => {
    let errors = {};
    let isIncomplete = false;

    const fieldNames = {
        'email': '',
        'password': '',
    };

    for (const field in fieldNames) {
        if (!req.body[field]) {
            errors[field] = 'This field is required.';
            isIncomplete = true;
        }
        else {
            fieldNames[field] = req.body[field].trim();
        }
    }

    const existingUser = await User.findOne({ email: fieldNames['email'] });
    if (existingUser) {
        errors['email'] = 'This email is already registered.';
        isIncomplete = true;
    }

    if (isIncomplete) {
        return res.status(400).json({ success: false, errors: errors });
    }

    const user = new User({
        isAdmin: true,
        image: null,
        firstName: null,
        lastName: null,
        email: fieldNames['email'],
        phoneNumber: null,
        password: fieldNames['password'],
        sex: null,
        birthday: null,
        registeredCollege: null,
        licenseNumber: null,
        practiceLocation: null,
        professionType: null,
        practicePeriod: null,
        other: null,
    });

    try {
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'imEast_tokenEncryptionKey');
        return res.status(201).json({ success: true, token: token });
    } catch (error) {
        errors['serverError'] = error.message;
        return res.status(400).json({ success: false, errors: errors });
    }
}

exports.userSignup = async (req, res) => {
    let errors = {};
    let isIncomplete = false;

    const fieldNames = {
        'firstName': '',
        'lastName': '',
        'sex': '',
        'birthday': '',
        'email': '',
        'phoneNumber': '',
        'pw1': '',
        'pw2': '',
        'registeredCollege': '',
        'licenseNumber': '',
        'practiceLocation': '',
        'professionType': '',
        'practicePeriod': '',
        'other': '',
    };

    for (const field in fieldNames) {
        if (!req.body[field]) {
            if (field === 'other') {
                if (req.body['professionType'] && req.body['professionType'] === 'other') {
                    errors[field] = 'This field is required.';
                    isIncomplete = true;
                } else {
                    errors['other'] = '';
                }
            } else {
                errors[field] = 'This field is required.';
                isIncomplete = true;
            }
        } else {
            errors[field] = '';
            if (typeof req.body[field] === 'string') {
                fieldNames[field] = req.body[field].trim();
            } else {
                fieldNames[field] = req.body[field];
            }
        }
    };

    if (fieldNames['pw1'] !== '' && fieldNames['pw1'] !== '') {
        if (fieldNames['pw1'] !== fieldNames['pw2']) {
            errors["pw2"] = "The passwords you entered do not match.";
            isIncomplete = true;
        }
        if (fieldNames['pw1'].length < 8) {
            errors["pw1"] = "The password must be at least 8 characters long.";
            isIncomplete = true;
        }
    }

    if (fieldNames['birthday']) {
        const today = new Date();
        const birthday = new Date(req.body.birthday);

        let age = today.getFullYear() - birthday.getFullYear();
        const birthMonth = birthday.getMonth();
        const todayMonth = today.getMonth();

        if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < birthday.getDate())) {
            age--;
        }

        if (age < 18) {
            errors["birthday"] = "You must be at least 18 years old.";
            isIncomplete = true;
        }
    }

    const existingUser = await User.findOne({ email: fieldNames['email'] });
    if (existingUser) {
        errors['email'] = 'This email is already registered.';
        isIncomplete = true;
    }

    if (isIncomplete) {
        return res.status(400).json({ success: false, errors: errors });
    }

    const user = new User({
        isAdmin: false,
        image: null,
        firstName: fieldNames['firstName'],
        lastName: fieldNames['lastName'],
        email: fieldNames['email'],
        phoneNumber: fieldNames['phoneNumber'],
        password: fieldNames['pw1'],
        sex: fieldNames['sex'],
        birthday: fieldNames['birthday'],
        registeredCollege: fieldNames['registeredCollege'],
        licenseNumber: fieldNames['licenseNumber'],
        practiceLocation: fieldNames['practiceLocation'],
        professionType: fieldNames['professionType'],
        practicePeriod: fieldNames['practicePeriod'],
        other: fieldNames['other'],
    });

    try {
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'imEast_tokenEncryptionKey'); //may also somehow put this into .env
        return res.status(201).json({ success: true, token: token });
    } catch (error) {
        errors['serverError'] = 'There was an internal server error. Please try again later.';
        return res.status(400).json({ success: false, errors: error.message });
    }
};


exports.login = async (req, res) => {
    let errors = {};
    let isIncomplete = false;

    const fieldNames = {
        'email': '',
        'password': '',
    };

    for (const field in fieldNames) {
        if (!req.body[field]) {
            errors[field] = 'This field is required.';
            isIncomplete = true;
        } else {
            errors[field] = '';
            if (typeof req.body[field] === 'string') {
                fieldNames[field] = req.body[field].trim();
            } else {
                fieldNames[field] = req.body[field];
            }
        }
    };

    if (isIncomplete) {
        return res.status(400).json({ success: false, errors: errors });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        errors['valid'] = 'This email is not registered with imEast.';
        return res.status(400).json({ success: false, errors: errors });
    }

    const correctPassword = user.comparePassword(fieldNames['password']);

    if (!correctPassword) {
        errors['valid'] = 'Email and password combination do not match our records.';
        return res.status(400).json({ success: false, errors: errors });
    }

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'imEast_tokenEncryptionKey');

    return res.status(200).json({ success: true, access: token });
};

exports.user = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).lean();
        return res.status(200).json({ success: true, users: users });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.userPurchases = async (req, res) => {
    try {
        const user = await User.findById(req.body.userID);
        if (!user) {
            return res.status(400).json({ success: false, error: 'User not found.' });
        }
        const purchases = await Purchase.find({ userID: req.body.userID });
        const numberOfPurchases = purchases.length;
        return res.status(200).json({ success: true, purchases: numberOfPurchases });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.userDetails = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findById(userID);

        return res.status(200).json({ success: true, user: user });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.userPatch = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findById(userID);

        let errors = {};
        let isIncomplete = false;

        console.log(req.body);

        for (const field in req.body) {
            if (req.body[field] == '') {
                if (field === 'image') {
                    errors[field] = '';
                } else if (field === 'professionType' && req.body[field] === 'other') {
                    if (req.body['other'] === '') {
                        errors['other'] = 'This field is required.';
                        isIncomplete = true;
                    } else {
                        errors['other'] = '';
                    }
                } else {
                    if (field === 'other' && req.body['professionType'] !== 'other') {
                        errors[field] = '';
                    } else {
                        errors[field] = 'This field is required.';
                        isIncomplete = true;
                    }
                }
            } else {
                errors[field] = '';
            }
        }

        if ('birthday' in req.body) {
            const today = new Date();
            const birthday = new Date(req.body.birthday);

            let age = today.getFullYear() - birthday.getFullYear();
            const birthMonth = birthday.getMonth();
            const todayMonth = today.getMonth();

            if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < birthday.getDate())) {
                age--;
            }

            if (age < 18) {
                errors["birthday"] = "You must be at least 18 years old.";
                isIncomplete = true;
            }
        }

        if (isIncomplete) {
            console.log(errors);
            return res.status(400).json({ success: false, errors: errors });
        }

        for (const field in req.body) {
            user[field] = req.body[field];
            if (field === 'professionType' && req.body[field] !== 'other') {
                user['other'] = '';
            }
        }

        await user.save();
        const newUser = await User.findById(userID);
        return res.status(200).json({ success: true, changed: newUser });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

