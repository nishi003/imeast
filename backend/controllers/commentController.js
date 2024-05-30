const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Lesson = require('../models/Lesson');

exports.createComment = async (req, res) => {
	try {
		const lessonID = req.params.lessonID;
		const userID = req.body.userID;

		const user = await User.findById(userID);

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
			return res.status(400).json({ success: false, error: 'This lesson does not exist.' });
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
		try {
			await comment.save();
		} catch (error) {
			console.log('Error saving: ', error.message);
		}

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
		const comments = await Comment.find({ lessonID: lessonID, parentCommentID: null }).sort({ timestamp: -1 });
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

		if (!req.body.content) {
			return res.status(200);
		}

		let displayName;
		if (user.isAdmin) {
			displayName = 'Admin';
		} else {
			displayName = user.firstName + ' ' + user.lastName;
		}

		const reply = new Comment({
			lessonID: comment.lessonID,
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
		const commentID = req.params.commentID;
		const replies = await Comment.find({ parentCommentID: commentID }).sort({ timestamp: -1 });
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