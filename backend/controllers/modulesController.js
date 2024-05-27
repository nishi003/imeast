
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');


exports.createModule = async (req, res) => {
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

exports.retrieveModuleListAdmin = async (req, res) => {
    try {
        const modules = await Module.find({}, '_id title duration description image').lean();
        return res.status(200).json({ success: true, modules: modules });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


exports.retrieveModuleListUser = async (req, res) => {
    try {
        const modules = await Module.find({}, '_id title duration description image price link').lean();
        return res.status(200).json({ success: true, modules: modules });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


exports.retrieveModule = async (req, res) => {
    try {
        const moduleID = req.params.moduleID;
        const module = await Module.findById(moduleID);

        if (!module) {
            return res.status(404).json({ success: false, error: 'Module does not exist.' });
        }
        return res.status(200).json({ success: true, module: module });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


exports.patchModule = async (req, res) => {
    try {
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
                } else {
                    errors[field] = 'This field is required.';
                    isIncomplete = true;
                }
            } else {
                errors[field] = '';
            }
        };

        if (isIncomplete) {
            return res.status(400).json({ success: false, errors: errors });
        }

        for (const field in req.body) {
            module[field] = req.body[field];
        }

        await module.save();
        const newModule = await Module.findById(moduleID);
        return res.status(200).json({ success: true, changed: newModule });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


exports.destroyModule = async (req, res) => {
    try {
        const moduleID = req.params.moduleID;

        const deletedModule = await Module.findByIdAndDelete(moduleID);
        const lessonsDeleted = await Lesson.deleteMany({ moduleID: moduleID });

        if (!deletedModule) {
            return res.status(400).json({ success: false, error: 'Module does not exist.' });
        }
        return res.status(200).json({ success: true, message: 'Module deleted successfully.', module: deletedModule, lessons: lessonsDeleted.deletedCount });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

