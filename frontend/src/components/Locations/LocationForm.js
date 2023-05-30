import { useState } from "react";
import "./LocationForm.css";
import { useHistory } from "react-router-dom";

function LocationForm() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const history = useHistory();

  const reset = () => {
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setLat("");
    setLng("");
    setName("");
    setDescription("");
    setPrice("");
    setPreviewImage("");
    setImage1("");
    setImage2("");
    setImage3("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsRequired(true);

    // setIsRequired(false);
    // reset();
    // history.push("/locations/1")
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <h1>Create a new Spot</h1>
        <div>
          <h3>Where's your place located?</h3>
          <p>
            Guests will only get your exact address once they book a
            reservation.
          </p>
          <div className="address-wrapper section-wrapper">
            <label id="country-label" className="form-label">
              Country
              <input
                type="text"
                id="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <div id="country-errors">
                {isRequired && (country.length < 1 ? <p className="errors">Country is required</p> : "")}
                {country.length < 1 && <p className="errors">Country is required</p>}
              </div>
            </label>
            <label id="address-label" className="form-label">
              Street Address
              <input
                type="text"
                id="address"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <div id="address-errors">
                {isRequired && (address.length < 1 ? <p className="errors">Address is required</p> : "")}
            </div>
            <label id="city-label" className="form-label">
              City
              <input
                type="text"
                id="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <div id="city-errors">
                {isRequired && (city.length < 1 ? <p className="errors">City is required</p> : "")}
            </div>
            <label id="state-label" className="form-label">
              State
              <input
                type="text"
                id="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <div id="state-errors">
                {isRequired && (state.length < 1 ? <p className="errors">State is required</p> : "")}
            </div>
            <label id="lat-label" className="form-label">
              Latitude
              <input
                type="text"
                id="lat"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
            <div id="lat-errors">
                {isRequired && (lat.length < 1 ? <p className="errors">Latitude is required</p> : "")}
            </div>
            <label id="lng-label" className="form-label">
              Longitude
              <input
                type="text"
                id="lng"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
            <div id="lng-errors">
                {isRequired && (lng.length < 1 ? <p className="errors">Longitude is required</p> : "")}
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love abut the neighborhood.
          </p>
          <label className="form-label">
            <textarea
              type="text"
              id="description"
              placeholder="Please write a description at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {isRequired && (country.length < 1 ? <p className="errors">Country is required</p> : "")}
        </div>
        <div className="section-wrapper">
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests attention with a spot title that highlights what makes
            your place special.
          </p>
          <label className="form-label">
            <input
              type="text"
              id="name"
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {isRequired && (country.length < 1 ? <p className="errors">Country is required</p> : "")}
        </div>
        <div className="section-wrapper">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help tour listing stand out and rank higher
            in search results.
          </p>
          <label className="form-label price-label">
            ${" "}
            <input
              type="text"
              id="price"
              placeholder="Price per a night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {isRequired && (country.length < 1 ? <p className="errors">Country is required</p> : "")}
        </div>
        <div className="section-wrapper">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link at least one photo to publish your spot.</p>
          <label className="form-label">
            <input
              type="text"
              className="image"
              placeholder="Preview Image URL"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </label>
          {isRequired && (country.length < 1 ? <p className="errors">Country is required</p> : "")}
          <label className="form-label">
            <input
              type="text"
              className="image"
              placeholder="Image URL"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
            />
          </label>
          <label className="form-label">
            <input
              type="text"
              className="image"
              placeholder="Image URL"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
          </label>
          <label className="form-label">
            <input
              type="text"
              className="image"
              placeholder="Image URL"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
            />
          </label>
        </div>
        <div id="create-button-container">
          <button type="submit" id="create-button">
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default LocationForm;
