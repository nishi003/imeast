const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/:lessonID/', commentController.createComment);
router.get('/:lessonID/', commentController.retrieveCommentList);
router.get('/:commentID/', commentController.retrieveComment);

router.post('/comment/:commentID/', commentController.createReply);
router.get('/:commentID/reply/', commentController.retrieveReplyList);

router.delete('/:commentID/', commentController.destroyComment);

module.exports = router;