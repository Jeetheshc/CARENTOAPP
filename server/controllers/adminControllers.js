
import Admin from "../models/adminmodel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

export const AdminSignup = async (req, res) => {
    try {
        const { name, email, password, phone, profilePic } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const AdminExist = await Admin.findOne({ email });
        if (AdminExist) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path)).url;
        const newAdmin = new Admin({ name, email, password: hashedPassword, phone, profilePic:imageUrl });
        await newAdmin.save();

        const token = generateToken(newAdmin, "Admin");

        res.cookie("token", token)


        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const AdminExist = await Admin.findOne({ email });
        if (!AdminExist) {
            return res.status(400).json({ message: "Admin does not exist" });
        }

        if (!AdminExist.isActive) {
            return res.status(403).json({ message: "Account is deactivated. Please contact support." });
        }

        const isPasswordMatch = await bcrypt.compare(password, AdminExist.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }



        const token = generateToken(AdminExist, 'Admin');
        res.cookie('token', token);

        res.json({ message: "Admin logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const AdminProfile = async (req, res, next) => {
    try {

        const AdminId = req.Admin.id;
        const AdminProfile = await Admin.findById(AdminId).select("-password");


        res.json({ message: "Admin login successfully", data: AdminProfile });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const AdminLogout = (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: "Admin logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const checkAdmin = (req, res) => {
    try {
        res.json({ message: "Admin authorized" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const updateAdminDetails = async (req, res) => {
    try {
        const AdminId = req.Admin.id; // Assuming req.Admin is populated by middleware
        const { name, phone, address } = req.body;

        if (!name || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            AdminId,
            { name, phone, address },
            { new: true, runValidators: true }
        ).select("-password");

        res.json({ message: "Admin details updated successfully", data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const changeAdminPassword = async (req, res) => {
    try {
        const AdminId = req.Admin.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const Admin = await Admin.findById(AdminId);
        if (!Admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, Admin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        Admin.password = bcrypt.hashSync(newPassword, 10);
        await Admin.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const changeAdminProfilePhoto = async (req, res) => {
    try {
        const AdminId = req.Admin.id;
        const { profilePic } = req.body;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture URL is required" });
        }
        const uploadedImage = (await cloudinaryInstance.uploader.upload(req.file.path)).url;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadedImage.secure_url },
            { new: true }
        ).select("-password");

        res.json({ message: "Profile photo updated successfully", data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


export const deactivateAdminAccount = async (req, res) => {
    try {
        const AdminId = req.Admin.id; // Get Admin ID from authentication middleware

        const Admin = await Admin.findById(AdminId);
        if (!Admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (!Admin.isActive) {
            return res.status(400).json({ message: "Account is already deactivated" });
        }

        Admin.isActive = false; // Set account to inactive
        await Admin.save();

        res.clearCookie("token"); // Clear the auth token cookie
        res.json({ message: "Account deactivated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
