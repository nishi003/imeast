const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

//for lessons
router.post('/:moduleID/lesson/', lessonController.createLesson);
router.get('/:moduleID/lesson/', lessonController.retrieveLessonList);

router.get('/:lessonID/', lessonController.retrieveLesson);
router.patch('/:lessonID/', lessonController.updateLesson);
router.delete('/:lessonID/', lessonController.destroyLesson);

router.get('/:moduleID/lesson/', lessonController.retrieveLessonList);

module.exports = router;