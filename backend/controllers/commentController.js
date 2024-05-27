const Comment = require('../models/Comment');
const Notification = require('../models/notifications');
exports.addCommentAdmin = async (req, res) => {
  try {
    const lessonID = req.params.lessonID;
    let comments = await Comment.find({});
    let CommentID;
    if (comments.length>0){
        let last_comment_array = comments.slice(-1)
        let last_comment = last_comment_array[0];
        //console.log(last_comment)
        CommentID = last_comment.CommentID+1
    }
    else{
        CommentID = 0;
    }

    //comment character limit:
    limit = 500
    if (req.body.text > limit){
      const { ProductID, userId, username, text, parentCommentId } = req.body;
      const newComment = new Comment({
          CommentID: CommentID, 
          lessonID: lessonID,
          userId: userId,
          username: username, 
          text: text ,
          parentCommentId: parentCommentId});
      await newComment.save();
      res.status(201).json(newComment);
    }
    else{
      res.json({success: false, error: "the text is too long. limit of 500 characters"})
    
    }

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error adding comment', message: error });
  }
};

exports.addCommentAdmin = async (req, res) => {
  try {
    const lessonID = req.params.lessonID;
    let comments = await Comment.find({});
    let CommentID;
    if (comments.length>0){
        let last_comment_array = comments.slice(-1)
        let last_comment = last_comment_array[0];
        //console.log(last_comment)
        CommentID = last_comment.CommentID+1
    }
    else{
        CommentID = 0;
    }

    //comment character limit:
    limit = 500
    if (req.body.text > limit){
      const { ProductID, userId, username, text, parentCommentId } = req.body;
      const newComment = new Comment({
          CommentID: CommentID, 
          lessonID: lessonID,
          userId: userId,
          username: username, 
          text: text ,
          parentCommentId: parentCommentId});
      await newComment.save();
      res.status(201).json(newComment);
      
      const notification = new Notification({
        username: username,
        type: "New Comment",
        link: ""
    });
    }
    else{
      res.json({success: false, error: "the text is too long. limit of 500 characters"})
    
    }

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error adding comment', message: error });
  }
};

//get the replies of the comment
//json structure: {parentCommentId: }
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
        const comments = await Comment.find({ProductID: req.body.ProductID}).sort({_id:-1});
        console.log(comments)
        res.json(comments);
    }
    catch(error){
        res.status(500).json({error: 'Error fetching comments', message: error})
    }
};

//json req: commentID
exports.deleteComment = async(req, res) => {
    try{
        await Comment.findOneAndDelete({CommentID: req.body.CommentID})
        await Comment.deleteMany({parentCommentId: req.body.CommentID})
        res.json({success: true});
    }
    catch(error){
        res.status(500).json({error: 'Error deleting comment', message: error});
    }
};

