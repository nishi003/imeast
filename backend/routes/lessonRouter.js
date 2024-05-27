const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

//for lessons
router.post('/:moduleID/lesson', lessonController.postLesson);

router.get('admin/:moduleID/lesson', lessonController.getLessonAdmin);
router.get('admin/:moduleID/lesson', lessonController.getLessonUser);

router.get('admin/lesson/:lessonID', lessonController.getLessonDetailAdmin);
router.get('user/lesson/:lessonID', lessonController.getLessonDetailUser);

router.patch('lesson/:lessonID', lessonController.patchLesson)

module.exports = router;