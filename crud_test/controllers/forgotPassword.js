exports.ForgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.send({
          status: 400,
          error: true,
          message: "Cannot be processed",
        });
      }
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.send({
          success: true,
          message:
            "If that email address is in our database, we will send you an email to reset your password",
        });
      }
      let code = Math.floor(100000 + Math.random() * 900000);
      let response = await sendEmail(user.email, code);
      if (response.error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't send mail. Please try again later.",
        });
      }
      let expiry = Date.now() + 60 * 1000 * 15;
      user.resetPasswordToken = code;
      user.resetPasswordExpires = expiry; // 15 minutes
      await user.save();
      return res.send({
        success: true,
        message:
          "If that email address is in our database, we will send you an email to reset your password",
      });
    } catch (error) {
      console.error("forgot-password-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
   };

   