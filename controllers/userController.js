const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// login callback
const loginController = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // const user = await userModel.findOne({ email, password });
    // if (!user) {
    //   return res.status(404).send("User Not Found");
    // }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Incorrect password",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    // const newUser = new userModel(req.body);
    // await newUser.save();

    const { password, ...userData } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user with the hashed password
    const newUser = new userModel({
      ...userData,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
