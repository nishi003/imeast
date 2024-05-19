const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/add', commentController.addComment);
router.get('/:id', commentController.getCommentsByParent);

router.get('/allcomments', commentController.getAllComments);
router.get('/getcommentsbyvid', commentController.getCommentsbyVid);
router.get('/deleteComment', commentController.deleteComment);

module.exports = router;