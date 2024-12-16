
import express from "express";
import { userSignup, userLogin, userProfile, userLogout, checkUser, changePassword, updateUserDetails, changeProfilePhoto, deactivateAccount, getAllUsers } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

// User signup and login routes
router.post('/signup',upload.single('profilePic'), userSignup);
router.post('/login', userLogin);

// User profile and authentication routes
router.get('/profile', userAuth, userProfile); // You may want to add authentication middleware here
router.put('/profile-update', userAuth, updateUserDetails);
router.put('/photo-update',upload.single('profilePic'), userAuth, changeProfilePhoto);
router.put('/logout', userAuth, userLogout);
router.get('/check-user', userAuth, checkUser);
router.put('/reset-password', userAuth, changePassword);
router.delete('/delete-account', userAuth, deactivateAccount);


export { router as userRouter };
