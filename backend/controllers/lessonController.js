
const Lesson = require('../models/Lesson');
const Comment = require('../models/Comment');
const Vimeo = require('vimeo').Vimeo;

// uri example='/videos/949383072';
function getApiUri(vimeoUrl) {
    const videoIdMatch = vimeoUrl.match(/vimeo\.com\/(\d+)/);
    if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        return `/videos/${videoId}`;
    } else {
        return null;
    }
};

exports.createLesson = async (req, res) => {
    try {
        let errors = {};
        let isIncomplete = false;
        const moduleID = req.params.moduleID;

        const fieldNames = {
            'title': '',
            'description': '',
            'videoURL': '',
            'videoHTMLEmbed': '',
            'thumbnail': '',
        };

        for (const field in fieldNames) {
            if (!req.body[field]) {
                if (field === 'thumbnail' || field === 'videoHTMLEmbed') {
                    errors[field] = '';
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

        //vimeo sdk setup
        let vimeoClient = new Vimeo(process.env.VIMEO_CLIENTID, process.env.VIMEO_CLIENTSECRET, process.env.VIMEO_ACCESS_TOKEN);

        try {
            const response = await new Promise((resolve, reject) => {
                vimeoClient.request({ method: 'GET', path: '/tutorial' }, (error, body, status_code, headers) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ body, status_code, headers });
                    }
                });
            });
        } catch (error) {
            console.error("Error during fetch: " + error.message);
        }

        const uri = getApiUri(fieldNames['videoURL']);
        if (!uri) {
            return res.status(400).json({ success: false, errors: 'Invalid Vimeo URL' });
        }

        //disable view on vimeo *need to pay for account
        try {
            const response = await new Promise((resolve, reject) => {
                vimeoClient.request({
                    method: 'PATCH', path: uri,
                    query: { 'privacy': { 'view': 'anybody' } } // change anybody to disable **REQUIRES PAYMENT**
                }, (error, body, status_code, headers) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ body, status_code, headers });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({ success: false, error: "error changing privacy settings on vimeo" });
        }

        //whitelist imeast as the only player
        try {
            const response = await new Promise((resolve, reject) => {
                vimeoClient.request({ method: 'PUT', path: uri + '/privacy/domains/imeast.ca' }, (error, body, status_code, headers) => {
                    if (error) {
                        reject(error);
                    } else {
                        vimeoClient.request({ method: 'PATCH', path: uri, query: { 'privacy': { 'embed': 'whitelist' }, 'embed': { 'buttons': { share: false, embed: false, like: false } } } },
                            (error, body, status_code, headers) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve({ body, status_code, headers });
                                }
                            })
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({ success: false, error: "error getting html embed code" });
        }

        //get embed text
        try {
            const response = await new Promise((resolve, reject) => {
                vimeoClient.request({ method: 'GET', path: uri + '/privacy/domains/imeast.ca' }, (error, body, status_code, headers) => {
                    if (error) {
                        reject(error);
                    } else {
                        vimeoClient.request({ method: 'GET', path: uri, query: { embed: '' } }, (error, body, status_code, headers) => {
                            if (error) {
                                reject(error);
                            } else {
                                if (body && body.embed && body.embed.html) {
                                    console.log(body.embed.html);
                                    fieldNames['videoHTMLEmbed'] = body.embed.html;
                                }
                                resolve({ body, status_code, headers });
                            }
                        })
                        resolve({ body, status_code, headers });
                    }
                })
            });
        } catch (error) {
            return res.status(400).json({ success: false, error: "error getting html embed code" });
        }

        const lesson = new Lesson({
            moduleID: moduleID,
            title: fieldNames['title'],
            video_URL: fieldNames['video_URL'],
            videoHTMLEmbed: fieldNames['videoHTMLEmbed'],
            thumbnail: fieldNames['thumbnail'],
            description: fieldNames['description'],
        });

        try {
            console.log(lesson);
            await lesson.save();
            return res.json({ success: true, message: "yipee! lesson saved", embed: fieldNames['videoHTMLEmbed'] });
        } catch (error) {
            return res.json({ success: false, message: "error saving lesson to database", error: error.message });
        }
    }
    catch (error) {
        res.json({ success: false, error: error })
    }
};

exports.retrieveLessonList = async (req, res) => {
    try {
        const moduleID = req.params.moduleID;
        const lessons = await Lesson.find({ moduleID: moduleID }).lean();
        return res.status(200).json({ success: true, lessons: lessons });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.retrieveLesson = async (req, res) => {
    try {
        const lessonID = req.params.lessonID;
        const lesson = await Lesson.findById(lessonID);
        return res.status(200).json({ success: true, lesson: lesson });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateLesson = async (req, res) => {
    try {
        const lessonID = req.params.lessonID;
        const lesson = await Lesson.findById(lessonID);

        //title, video embed link, thumbnail, description
        for (const field in req.body) {
            lesson[field] = req.body[field];

            if (field === "video_URL") {

                lesson['video_URL'] = req.body["video_URL"]

                //vimeo sdk setup
                let Vimeo = require('vimeo').Vimeo;
                let vimeoClient = new Vimeo(process.env.VIMEO_CLIENTID, process.env.VIMEO_CLIENTSECRET, process.env.VIMEO_ACCESS_TOKEN);
                //check vimeo sdk status
                vimeoClient.request({
                    method: 'GET',
                    path: '/tutorial'
                }, function (error, body, status_code, headers) {
                    if (error) {
                        console.log(error);
                    }
                })

                //disable view on vimeo *need to pay for account
                try {
                    vimeoClient.request({
                        method: 'PATCH',
                        path: uri,
                        query: {
                            'privacy': {
                                'view': 'disable'
                            },
                        }
                    }, function (error, body, status_code, headers) { })
                } catch (error) {
                    res.json({ success: false, error: "error changing privacy settings on vimeo", error: error })
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
                                },
                                'embed': {
                                    'buttons': {
                                        share: false,
                                        embed: false,
                                        like: false,
                                    }
                                }

                            }
                        }, function (error, body, status_code, headers) {
                            //console.log("whitelist logs start here")
                            //console.log(error, body, status_code, headers)
                        })
                    })
                } catch (error) {
                    res.json({ success: false, error: "whitelist failed" })
                }

                //get embed text
                try {
                    vimeoClient.request({
                        method: 'GET',
                        path: uri + '/privacy/domains/imeast.ca'
                    }, function (error, body, status_code, headers) {
                        // console.log(uri + ' will only be embeddable on "http://example.com".')
                        vimeoClient.request({
                            method: 'GET',
                            path: uri,
                            query: {
                                embed: ''
                            }
                        }, function (error, body, status_code, headers) {
                            // Extract embed HTML from the response body
                            if (body && body.embed && body.embed.html) {
                                const videoHtmlEmbed = body.embed.html;
                                lesson['videoHtmlEmbed'] = videoHtmlEmbed;
                                console.log("New Embed HTML:", videoHtmlEmbed);
                            }
                        })
                    })

                } catch (error) {
                    res.json({ success: false, error: "error getting html embed code", error: error })
                };

            }

            await lesson.save();
            const newLesson = await Lesson.findById(lessonID)
            return res.status(200).json({ success: true, changed: newLesson });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: "lesson does not exist" });
    }
};

exports.destroyLesson = async (req, res) => {
    try {
        const lessonID = req.params.lessonID;

        const deletedLesson = await Lesson.findByIdAndDelete(lessonID);
        const deletedComments = await Comment.find({ lessonID: lessonID });

        for (const comment of deletedComments) {
            await Notification.deleteMany({ type: 'comment', typeID: comment._id });
        }
        await Comment.deleteMany({ lessonID: lessonID });
        return res.status(200).json({ success: true, message: 'Lesson and associated comments and notifications deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.retrieveLessonList = async (req, res) => {
    try {
        const moduleID = req.params.moduleID;

        const lessons = await Lesson.find({ moduleID: moduleID });
        return res.status(200).json({ success: true, lessons: lessons });

    } catch (error) {
        console.log('retrieveLessonList: ' + error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};