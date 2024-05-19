const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    let comments = await Comment.find({});
    let commentID;
    if (comments.length>0){
        let last_comment_array = comments.slice(-1)
        let last_comment = last_comment_array[0];
        commentID = last_comment.id+1
    }
    const { ProductID, userId, username, text, parentCommentId } = req.body;
    const newComment = new Comment({commentID, ProductID, userId, username, text, parentCommentId});
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment', message: error });
  }
};

//get the replies of the comment
exports.getCommentsByParent = async (req, res) => {
  try {
    const comments = await Comment.find({parentCommentId: req.body.parentCommentId});
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments', message: error });
  }
};

//get all parent comments in the database
exports.getAllComments = async (req, res) =>{
    try{
        const comments = await Comment.find({parentCommentId: null}).sort({_id:-1});
        res.json(comments);
    }
    catch(error){
        res.status(500).json({error: 'Error fetching comments', message: error})
    }
};

//get comment by video 
//json structure: {ProductID: n}
exports.getCommentsbyVid = async(req, res) =>{
    try{
        const comments = await Comment.find({ProductID: req.ProductID}).sort({_id:-1});
        res.json(comments);
    }
    catch(error){
        res.status(500).json({error: 'Error fetching comments', message: error})
    }
};

//json req: commentID
exports.deleteComment = async(req, res) => {
    try{
        await Comment.findOneAndDelete({commentID: req.body.commentID})
        await Comment.deleteMany({parentCommentId: req.body.commentID})
        res.json({success: true});
    }
    catch(error){
        res.status(500).json({error: 'Error deleting comment', message: error});
    }
};

