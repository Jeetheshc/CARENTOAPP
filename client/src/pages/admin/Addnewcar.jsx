import React, { useState } from 'react';
import axios from 'axios';

export const Addnewcar = () => {
  // State variables
  const [providerName, setProviderName] = useState("");
  const [providerMobileNo, setProviderMobileNo] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [providerAadharNumber, setProviderAadharNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [carType, setCarType] = useState("");
  const [features, setFeatures] = useState(""); // Comma-separated string
  const [location, setLocation] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carImage, setCarImage] = useState(null); // For image upload

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("providerName", providerName);
    formData.append("providerMobileNo", providerMobileNo);
    formData.append("providerEmail", providerEmail);
    formData.append("providerAddress", providerAddress);
    formData.append("providerAadharNumber", providerAadharNumber);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("pricePerDay", pricePerDay);
    formData.append("carType", carType);
    formData.append("features", features); // Comma-separated string
    formData.append("location", location);
    formData.append("carNumber", carNumber);
    formData.append("carImage", carImage); // The image file

    try {
      const response = await axios.post("/cars/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Car added successfully");
        // Clear form on success or navigate
        setProviderName("");
        setProviderMobileNo("");
        setProviderEmail("");
        setProviderAddress("");
        setProviderAadharNumber("");
        setBrand("");
        setModel("");
        setYear("");
        setPricePerDay("");
        setCarType("");
        setFeatures("");
        setLocation("");
        setCarNumber("");
        setCarImage(null);
      }
    } catch (error) {
      alert("An error occurred while adding the car.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Provider Name</label>
          <input
            type="text"
            className="form-control"
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Provider Mobile No.</label>
          <input
            type="text"
            className="form-control"
            value={providerMobileNo}
            onChange={(e) => setProviderMobileNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Provider Email</label>
          <input
            type="email"
            className="form-control"
            value={providerEmail}
            onChange={(e) => setProviderEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Provider Address</label>
          <input
            type="text"
            className="form-control"
            value={providerAddress}
            onChange={(e) => setProviderAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Provider Aadhar Number</label>
          <input
            type="text"
            className="form-control"
            value={providerAadharNumber}
            onChange={(e) => setProviderAadharNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            className="form-control"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price Per Day</label>
          <input
            type="number"
            className="form-control"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Car Type</label>
          <input
            type="text"
            className="form-control"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Features (Comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Car Number</label>
          <input
            type="text"
            className="form-control"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Car Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setCarImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Car</button>
      </form>
    </div>
  );
};
