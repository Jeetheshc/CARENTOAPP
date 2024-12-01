import e from "express"
import { addNewCar, deactivateCar, editCarDetails, getAllCar, showCarDetails, updateCarPhotos } from "../controllers/carControllers.js";
import { carProviderAuth } from "../middlewares/providerAuth.js";
import { upload } from "../middlewares/multer.js";


const router = e.Router();

// Add a new car
router.post("/add",upload.array("carimages", 5), addNewCar);

router.get("/cars", getAllCar);


// Edit car details
router.put("/edit/:carId",carProviderAuth, editCarDetails);

// Deactivate a car
router.put("/deactivate/:carId", carProviderAuth, deactivateCar);

// Show car details
router.get("/:carId", showCarDetails);

// edit car photos
router.put("/editphotos:carId",upload.array("carimages", 5), updateCarPhotos);


export { router as carRouter };



