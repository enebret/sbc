const Joi = require("joi");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const User = require("./user.model");
//Validate user schema
const userSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }
    //Check if the email has been already registered.
    var user = await User.findOne({
      email: result.value.email,
    });
    if (user) {
      return res.json({
        error: true,
        message: "Email is already in use",
      });
    }
    const hash = await User.hashPassword(result.value.password);
    const id = uuid(); 
    result.value.userId = id;
   result.value.password = hash;
    let code = Math.floor(100000 + Math.random() * 900000);                              
    let expiry = Date.now() + 60 * 1000 * 15;  
    //const sendCode = await sendEmail(result.value.email, code);
    const sendMail = () =>{
      const data = {
        to: user.email,
        from: email,
        template: 'reset-password-email',
        subject: 'Password Reset Confirmation',
        context: {
          name: user.fullName.split(' ')[0]
        }
      };

      smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return res.json({ message: 'Password reset' });
        } else {
          return done(err);
        }
      });
    }
    if (sendCode.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send verification email.",
      });
    }
    result.value.emailToken = code;
    result.value.emailTokenExpires = new Date(expiry);
    const newUser = new User(result.value);
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Registration Success",
    });
  } catch (error) {
    console.error("signup-error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
  }
};

sendMail()