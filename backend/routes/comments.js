const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/:lessonID/', commentController.createComment);
router.get('/:lessonID/', commentController.retrieveCommentList);
router.get('/comment/:commentID/', commentController.retrieveComment);

router.post('/reply/:commentID/', commentController.createReply);
router.get('/reply/:commentID/', commentController.retrieveReplyList);

router.delete('/:commentID/', commentController.destroyComment);

module.exports = router;