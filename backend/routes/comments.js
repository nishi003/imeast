const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/:lessonID/', commentController.createComment);
router.get('/:lessonID/', commentController.retrieveCommentList);

router.post('/:commentID/', commentController.createReply);
router.get('/:commentID/', commentController.retrieveReplyList);

router.delete('/:commentID/', commentController.destroyComment);

module.exports = router;