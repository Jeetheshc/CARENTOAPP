
import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import { AdminLogin, AdminLogout, AdminProfile, AdminSignup, changeAdminPassword, changeAdminProfilePhoto,  checkAdmin, deactivateAdminAccount, updateAdminDetails } from "../controllers/adminControllers.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

//  signup and login routes
router.post('/signup',upload.single('profilePic'), AdminSignup);
router.post('/login', AdminLogin);

//  profile and authentication routes
router.get('/profile', adminAuth, AdminProfile); // You may want to add authentication middleware here
router.put('/profile-update',upload.single('profilePic'), adminAuth, updateAdminDetails);
router.put('/photo-update', adminAuth, changeAdminProfilePhoto);
router.put('/logout', adminAuth, AdminLogout);
router.get('/check-admin', adminAuth, checkAdmin);
router.put('/reset-password', adminAuth, changeAdminPassword);
router.delete('/delete-account', adminAuth, deactivateAdminAccount);

export { router as adminRouter };
