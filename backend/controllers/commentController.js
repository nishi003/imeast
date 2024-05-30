const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Lesson = require('../models/Lesson');

exports.createComment = async (req, res) => {
	try {
		const lessonID = req.params.lessonID;
		const userID = req.body.userID;

		const user = await User.findById(userID);

		console.log(req.body);
		if (!user) {
			console.log('createComment: user DNE');
			return res.status(400).json({ success: false, error: 'This user does not exist.' });
		}

		if (!req.body.content) {
			return res.status(200);
		}

		let name;
		if (user.isAdmin) {
			name = 'Admin';
		} else {
			name = user.firstName + ' ' + user.lastName;
		}

		const lesson = await Lesson.findById(lessonID);
		if (!lesson) {
			return res.status(400).json({success: false, error: 'This lesson does not exist.'});
		}
		const moduleID = lesson.moduleID;

		const comment = new Comment({
			lessonID: lessonID,
			userID: userID,
			displayName: name,
			isAdmin: user.isAdmin,
			content: req.body.content.trim(),
			parentCommentID: null,
		});
		await comment.save();

		if (!user.isAdmin) {
			const notification = new Notification({
				displayName: name,
				read: false,
				type: 'comment',
				typeID: comment._id,
				link: `/admin/module/${moduleID}/lesson/${lessonID}/`
			});
			await notification.save();
		}
		return res.status(200).json({ success: true });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.retrieveCommentList = async (req, res) => {
	try {
		const lessonID = req.params.lessonID;
		const comments = await Comment.find({ lessonID: lessonID, parentCommentID: null });
		return res.status(200).json({ success: true, comments: comments });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.retrieveComment = async (req, res) => {
	try {
		const commentID = req.params.commentID;
		const comment = await Comment.findById(commentID);

		if (!comment) {
			return res.status(404).json({ success: false, error: 'Comment not found.' });
		}
		const user = await User.findById(comment.userID);
		if (!user) {
			return res.status(404).json({ success: false, error: 'User not found.' });
		}
		let hasReplies = false;
		const replies = await Comment.find({ parentCommentID: commentID });
		if (replies.length > 0) {
			hasReplies = true;
		}
		const name = 'Admin';
		if (!user.isAdmin) {
			name = user.firstName + ' ' + user.lastName;
		}
		const returnComment = {
			'name': name,
			'hasReplies': hasReplies,
			'isAdmin': user.isAdmin,
		}

		return res.status(200).json({ success: true, comment: returnComment });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.createReply = async (req, res) => {
	try {
		const commentID = req.params.commentID;
		const userID = req.body.userID;

		const comment = await Comment.findById(commentID);
		if (!comment) {
			return res.status(400).json({ success: false, error: 'Could not find comment.' });
		}

		const user = await User.findById(userID);
		if (!user) {
			console.log('createComment: user DNE');
			res.status(400).json({ success: false, error: 'This user does not exist.' });
		}

		let displayName;
		if (user.isAdmin) {
			displayName = 'Admin';
		} else {
			displayName = user.firstName + ' ' + user.lastName;
		}

		const reply = new Comment({
			lessonID: commentID.lessonID,
			userID: userID,
			isAdmin: user.isAdmin,
			displayName: displayName,
			content: req.body.content.trim(),
			parentCommentID: commentID,
		});
		await reply.save();
		return res.status(200).json({ success: true });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.retrieveReplyList = async (req, res) => {
	try {
		const commentID = req.params.lessonID;
		const replies = Comment.find({ parentCommentID: commentID });
		return res.status(200).json({ success: true, replies: replies });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

exports.destroyComment = async (req, res) => {
	try {
		const commentID = req.params.commentID;

		const deletedComment = await Comment.findByIdAndDelete(commentID);
		const deletedReplies = await Comment.deleteMany({ parentCommentID: deletedComment });
		const deletedNotification = await Notification.deleteOne({ type: 'comment', typeID: commentID });

		if (!deletedComment) {
			return res.status(400).json({ success: false, error: 'Comment does not exist' });
		}
		return res.status(200).json({ success: true, message: 'Comment deleted successfully', replies: deletedReplies, notifcation: deletedNotification });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

// exports.addCommentAdmin = async (req, res) => {
// 	try {
// 		const lessonID = req.params.lessonID;
// 		let comments = await Comment.find({});
// 		let CommentID;
// 		if (comments.length > 0) {
// 			let last_comment_array = comments.slice(-1)
// 			let last_comment = last_comment_array[0];
// 			//console.log(last_comment)
// 			CommentID = last_comment.CommentID + 1
// 		}
// 		else {
// 			CommentID = 0;
// 		}

// 		//comment character limit:
// 		limit = 500
// 		if (req.body.text > limit) {
// 			const { ProductID, userId, username, text, parentCommentId } = req.body;
// 			const newComment = new Comment({
// 				CommentID: CommentID,
// 				lessonID: lessonID,
// 				userId: userId,
// 				username: username,
// 				text: text,
// 				parentCommentId: parentCommentId
// 			});
// 			await newComment.save();
// 			return res.status(201).json(newComment);
// 		}
// 		else {
// 			return res.json({ success: false, error: "the text is too long. limit of 500 characters" })

// 		}

// 	} catch (error) {
// 		console.log(error.message)
// 		return res.status(500).json({ error: 'Error adding comment', message: error });
// 	}
// };

// exports.addCommentAdmin = async (req, res) => {
// 	try {
// 		const lessonID = req.params.lessonID;
// 		let comments = await Comment.find({});
// 		let CommentID;
// 		if (comments.length > 0) {
// 			let last_comment_array = comments.slice(-1)
// 			let last_comment = last_comment_array[0];
// 			//console.log(last_comment)
// 			CommentID = last_comment.CommentID + 1
// 		}
// 		else {
// 			CommentID = 0;
// 		}

// 		//comment character limit:
// 		limit = 500
// 		if (req.body.text > limit) {
// 			const { ProductID, userId, username, text, parentCommentId } = req.body;
// 			const newComment = new Comment({
// 				CommentID: CommentID,
// 				lessonID: lessonID,
// 				userId: userId,
// 				username: username,
// 				text: text,
// 				parentCommentId: parentCommentId
// 			});
// 			await newComment.save();

// 			const notification = new Notification({
// 				username: username,
// 				type: "New Comment",
// 				link: ""
// 			});

// 			await notification.save();
// 			return res.status(201).json(newComment);
// 		}
// 		else {
// 			return res.json({ success: false, error: "the text is too long. limit of 500 characters" })

// 		}

// 	} catch (error) {
// 		return res.status(500).json({ success: false, error: error.message });
// 	}
// };

//get the replies of the comment
//json structure: {parentCommentId: }
// exports.getCommentsByParent = async (req, res) => {
// 	try {
// 		const comments = await Comment.find({ parentCommentId: req.body.parentCommentId });
// 		res.status(200).json({ comments });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error fetching comments', message: error });
// 	}
// };

//get all parent comments in the database
// exports.getAllComments = async (req, res) => {
// 	try {
// 		const comments = await Comment.find({ parentCommentId: null }).sort({ _id: -1 });
// 		res.json(comments);
// 	}
// 	catch (error) {
// 		res.status(500).json({ error: 'Error fetching comments', message: error })
// 	}
// };

//get comment by video
//json structure: {ProductID: n}
// exports.getCommentsbyVid = async (req, res) => {
// 	try {
// 		const comments = await Comment.find({ ProductID: req.body.ProductID }).sort({ _id: -1 });
// 		console.log(comments)
// 		res.json(comments);
// 	}
// 	catch (error) {
// 		res.status(500).json({ error: 'Error fetching comments', message: error })
// 	}
// };

//json req: commentID
// exports.deleteComment = async (req, res) => {
// 	try {
// 		await Comment.findOneAndDelete({ CommentID: req.body.CommentID })
// 		await Comment.deleteMany({ parentCommentId: req.body.CommentID })
// 		res.json({ success: true });
// 	}
// 	catch (error) {
// 		res.status(500).json({ error: 'Error deleting comment', message: error });
// 	}
// };

