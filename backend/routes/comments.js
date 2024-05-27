const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('admin/:lessonID/comment', commentController.addCommentAdmin);
router.post('user/:lessonID/comment', commentController.addCommentUser);
router.get('/getreplies', commentController.getCommentsByParent);

router.get('/allcomments', commentController.getAllComments);
router.get('/getcommentsbyvid', commentController.getCommentsbyVid);
router.post('/deletecomment', commentController.deleteComment);

module.exports = router;