const express = require('express');
const router = express.Router();
const commentController = require('../controllers/notifController');

router.post('/add', commentController.addComment);
router.get('/getreplies', commentController.getCommentsByParent);

router.get('/allcomments', commentController.getAllComments);
router.get('/getcommentsbyvid', commentController.getCommentsbyVid);
router.post('/deletecomment', commentController.deleteComment);

module.exports = router;