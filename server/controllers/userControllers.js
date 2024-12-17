
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { cloudinaryInstance } from "../config/cloudinary.js";


export const userSignup = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        // Upload profile photo to Cloudinary if provided
        let profilePic;

        if (req.file) {
            // Convert the file buffer to a base64 string for upload
            const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

            try {
                const uploadResult = await cloudinaryInstance.uploader.upload(fileBase64, {
                    folder: "profile_pics", // Specify the folder in Cloudinary
                });
                profilePic = uploadResult.secure_url; // Store the URL of the uploaded image
            } catch (error) {
                return res.status(500).json({ message: "Failed to upload profile picture", error: error.message });
            }
        } else {
            profilePic = "https://via.placeholder.com/150/000000/FFFFFF/?text=Profile";
        }
        const newUser = new User({ name, email, password: hashedPassword, phone, address, profilePic });
        await newUser.save();

        const token = generateToken(newUser, "user");
        res.cookie("token", token,{sameSite:"None", secure:true});
       // res.cookie("token", token);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
// export const userSignup = async (req, res) => {
//     try {
//         const { name, email, password, phone, address } = req.body;

//         if (!name || !email || !password || !phone || !address) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const userExist = await User.findOne({ email });
//         if (userExist) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const hashedPassword = bcrypt.hashSync(password, 10);

//         // Check if a profile picture was uploaded
//         const profilePic = req.file ? req.file.path : "https://via.placeholder.com/150/000000/FFFFFF/?text=Profile";

//         const newUser = new User({ name, email, password: hashedPassword, phone, address, profilePic });
//         await newUser.save();

//         const token = generateToken(newUser, "user");
//         res.cookie("token", token);

//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Internal server error" });
//     }
// };


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (!userExist.isActive) {
            return res.status(403).json({ message: "Account is deactivated. Please contact support." });
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }



        const token = generateToken(userExist, 'user');
        res.cookie("token", token,{sameSite:"None", secure:true});
       // res.cookie('token', token);

        res.json({ message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const userProfile = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const userProfile = await User.findById(userId).select("-password");


        res.json({ message: "user login successfully", data: userProfile });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




export const userLogout = (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const checkUser = (req, res) => {
    try {
        res.json({ message: "User authorized" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const updateUserDetails = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is populated by middleware
        const { name, phone, address } = req.body;

        if (!name || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, address },
            { new: true, runValidators: true }
        ).select("-password");

        res.json({ message: "User details updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const changeProfilePhoto = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from middleware
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload the image to Cloudinary
        const uploadedImage = (await cloudinaryInstance.uploader.upload(req.file.path)).url;


        // Update the user's profile picture URL in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadedImage.secure_url },
            { new: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile picture updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const deactivateAccount = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authentication middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isActive) {
            return res.status(400).json({ message: "Account is already deactivated" });
        }

        user.isActive = false; // Set account to inactive
        await user.save();

        res.clearCookie("token"); // Clear the auth token cookie
        res.json({ message: "Account deactivated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find().select("-password"); // Exclude the password field for security reasons

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({data:users});
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};