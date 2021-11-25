exports.Logout = async (req, res) => {
    try {
      const { id } = req.decoded;
      let user = await User.findOne({ userId: id });
      user.accessToken = "";
      await user.save();
      return res.send({ success: true, message: "User Logged out" });
    } catch (error) {
      console.error("user-logout-error", error);
      return res.stat(500).json({
        error: true,
        message: error.message,
      });
    }
  };