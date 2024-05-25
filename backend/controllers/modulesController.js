
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');


exports.addModule = async (req, res) => {
    let errors = {};
    let isIncomplete = false;

    const fieldNames = {
        'title': '',
        'duration': '',
        'description': '',
        'pdf': '',
        'image': '',
        'price': '',
        'link': '',
    };

    for (const field in fieldNames) {
        if (!req.body[field]) {
            if (field === 'pdf' || field === 'image' || field === 'link') {
                errors[field] = '';
                if (typeof req.body[field] === 'string') {
                    fieldNames[field] = req.body[field].trim();
                } else {
                    fieldNames[field] = req.body[field];
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

    if (isIncomplete) {
        return res.status(400).json({ success: false, errors: errors });
    }

    const module = new Module({
        title: fieldNames['title'],
        duration: fieldNames['duration'],
        description: fieldNames['description'],
        pdf: fieldNames['pdf'],
        image: fieldNames['image'],
        price: fieldNames['price'],
        link: fieldNames['link'],
    });

    try {
        await module.save();
        return res.status(200).json({ success: true, message: 'Module saved successfully.' });
    } catch (error) {
        errors['serverError'] = 'There was an internal server error. Please try again later.';
        return res.status(400).json({ success: false, errors: errors });
    }
};

exports.getModules = async (req, res) => {
    try {
        let modules;
        if (req.body.isAdmin) {
            modules = await Module.find({}, '_id title duration description image').lean();
        } else {
            modules = await Module.find({}, '_id title duration description image price link').lean();
        }
        return res.status(200).json({ success: true, modules: modules });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


exports.getDetails = async (req, res) => {
    try {
        const userID = req.body.userID
        const moduleID = req.params.moduleID;
        const module = await Module.findById(moduleID);

        if (!module) {
            return res.status(404).json({ success: false, error: 'Module does not exist.' });
        }

        let responseData = {};
        if (req.body.isAdmin) {
            responseData['moduleID'] = module.id;
            responseData['title'] = module.title;
            responseData['duration'] = module.duration;
            responseData['description'] = module.description;
            responseData['pdf'] = module.pdf;
            responseData['image'] = module.image;
            responseData['price'] = module.price;
            responseData['link'] = module.link;
        } else {
            const userOwns = await Purchases.findOne({ userID: userID, moduleID: moduleID });
            if (!userOwns) {
                return res.status(403).json({ success: false, error: 'You do not have permission to view this module.' });
            }

            responseData['moduleID'] = module.id;
            responseData['title'] = module.title;
            responseData['duration'] = module.duration;
            responseData['description'] = module.description;
            responseData['pdf'] = module.pdf;
            responseData['image'] = module.image;
        }
        return res.status(200).json({ success: true, module: responseData });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.patchDetails = '/module/:moduleID/', async (req, res) => {
    try {
        if (!req.body.isAdmin) {
            return res.status(403).json({ success: false, error: 'Unauthorized.' });
        }

        const moduleID = req.params.moduleID;
        const module = await Module.findById(moduleID);

        if (!module) {
            return res.status(404).json({ success: false, error: 'Module does not exist.' });
        }

        let errors = {};
        let isIncomplete = false;

        const fieldNames = {
            'title': '',
            'duration': '',
            'description': '',
            'pdf': '',
            'image': '',
            'price': '',
            'link': '',
        };

        for (const field in fieldNames) {
            if (!req.body[field]) {
                if (field === 'pdf' || field === 'image' || field === 'link') {
                    errors[field] = '';
                    if (typeof req.body[field] === 'string') {
                        module[field] = req.body[field].trim();
                    } else {
                        module[field] = req.body[field];
                    }
                } else {
                    errors[field] = 'This field is required.';
                    isIncomplete = true;
                }
            } else {
                errors[field] = '';
                if (typeof req.body[field] === 'string') {
                    module[field] = req.body[field].trim();
                } else {
                    module[field] = req.body[field];
                }
            }
        };

        if (isIncomplete) {
            return res.status(400).json({ success: false, errors: errors });
        }

        await module.save();
        return res.status(200).json({ success: true, module: module });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


exports.deleteModule = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ success: false, error: 'You do not have permission to delete this module.' });
        }

        const moduleID = req.params.moduleID;
        const deletedModule = await Module.findByIdAndDelete(moduleID);

        if (!deletedModule) {
            return res.status(404).json({ success: false, error: 'Module does not exist.' });
        }

        return res.status(200).json({ success: true, message: 'Module deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


// uri example='/videos/949383072';
exports.lessonPost = async (req, res) => {
    try {
        const moduleID = req.params.moduleID;

        //set password to view the video on vimeo
        try {
            client.request({
                method: 'PATCH',
                path: uri,
                query: {
                    'privacy': {
                        'view': 'password'
                    },
                    'password': 'helloworld'
                }
            }, function (error, body, status_code, headers) {
                console.log(uri + ' will now require a password to be viewed on Vimeo.')
            })
        } catch (error) {
            res.json({ success: false, error: error })
        }

        //whitelist imeast as the only player
        try {
            vimeoClient.request({
                method: 'PUT',
                path: uri + '/privacy/domains/imeast.ca'
            }, function (error, body, status_code, headers) {
                //console.log(uri + ' will only be embeddable on "http://example.com".')
                vimeoClient.request({
                    method: 'PATCH',
                    path: uri,
                    query: {
                        'privacy': {
                            'embed': 'whitelist'
                        }
                    }
                }, function (error, body, status_code, headers) {
                    console.log(error)
                })
            })

        } catch (error) {
            res.json({ success: false, error: error })
        };


        const lesson = new Lesson({
            moduleid: moduleID,
            title: req.body.title,
            video_embed_link: req.body.video_URI
        });

    }
    catch (error) {
        res.json({ success: flase, error: error })
    }
}