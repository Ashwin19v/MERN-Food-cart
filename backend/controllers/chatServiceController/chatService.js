const Chat = require("../../models/chatServiceModel/Chat");


exports.getMessages = async (req, res) => {
  try {
    const { userId, userModel, otherId, otherModel } = req.query; // userModel and otherModel can be 'User' or 'Admin'

    const messages = await Chat.find({
      $or: [
        {
          from: userId,
          fromModel: userModel,
          to: otherId,
          toModel: otherModel,
        },
        {
          from: otherId,
          fromModel: otherModel,
          to: userId,
          toModel: userModel,
        },
      ],
    }).sort({ createdAt: 1 });
    res
      .status(200)
      .json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    console.error("Error in getMessages:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: err.message,
    });
  }
};
