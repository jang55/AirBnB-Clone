import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotActions from "../../store/spotsReducer";
import * as imageActions from "../../store/imageReducer";
import "./LocationForm.css";

function LocationForm() {
  //all the states used in the form
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image0, setImage0] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [previewImage, setPreviewImage] = useState(""); //preview image
  const [isRequired, setIsRequired] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  //reset all values
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
    setImage0("");
    setImage1("");
    setImage2("");
    setPreviewImage("");
  };

  //submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    let newErrors = {};

    //gets all the information from the from
    const formInfo = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    if (previewImage === "") {
      newErrors = {
        ...newErrors,
        previewImage: { required: "Preview image is required" },
      };
    }

    const isValidImg = (imgURL) => {
      if (!imgURL) {
        return true;
      }
      //valid url endings;
      const imgEndings = ["png", "jpg", "jpeg"];
      //splits it by a period to get an array of the string
      const imgURLSplit = imgURL.split(".");
      const imgURLEnding = imgURLSplit[imgURLSplit.length - 1];
      //if url is given and ending is not valid, place an error for the image
      if (!imgEndings.includes(imgURLEnding)) {
        return false;
      }
      //return if all is well
      return true;
    };

    const imgs = { previewImage, image0, image1, image2 };
    Object.keys(imgs).forEach((imgKey) => {
      const imgURL = imgs[imgKey];
      if (!isValidImg(imgURL)) {
        newErrors = {
          ...newErrors,
          [imgKey]: { url: "Image URL's must end in .png, .jpg, or.jpeg" },
        };
      }
    });

    let newSpot = null;

    const submitDetails = async () => {
      try {
        newSpot = await dispatch(spotActions.addSpotThunk(formInfo));
      } catch (err) {
        const data = await err.json();
        if (data && data.errors) {
          newErrors = {...newErrors, ...data.errors};
        }
      }

      // Add images to spot
      if (newSpot) {
        Object.keys(imgs).forEach( async (imgKey) => {
            const imgURL = imgs[imgKey];
            if (imgURL.length > 0) {
              const imageBody = { url: imgURL, preview: true };
              await dispatch(
                imageActions.addSpotImageThunk(imageBody, newSpot.id)
              ).catch(async (err) => {
                const data = await err.json();
                if (data && data.errors) {
                  newErrors = {...newErrors, [imgKey] : { ...data.errors}};
                }
              });
            }
        })
      }
    };

    await submitDetails();

    if (Object.values(newErrors).length > 0 && newSpot) {
      await dispatch(spotActions.deleteSpotThunk(newSpot.id)); 
    }

    setErrors(newErrors);
    setIsRequired(true);
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
                {errors.country && <p className="errors">{errors.country}</p>}
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
              {errors.address && <p className="errors">{errors.address}</p>}
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
              {errors.city && <p className="errors">{errors.city}</p>}
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
              {errors.state && <p className="errors">{errors.state}</p>}
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
              {isRequired &&
                (lat.length < 1 ? (
                  <p className="errors">Latitude is required</p>
                ) : (
                  <p className="errors">{errors.lat}</p>
                ))}
              {/* {errors.lat && <p className="errors">{errors.lat}</p>} */}
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
              {isRequired &&
                (lng.length < 1 ? (
                  <p className="errors">Longitude is required</p>
                ) : (
                  <p className="errors">{errors.lng}</p>
                ))}
              {/* {errors.lng && <p className="errors">{errors.lng}</p>} */}
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
          <div>
            {errors.description && (
              <p className="errors">
                Description needs a minimum of 30 characters
              </p>
            )}
          </div>
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
          <div>{errors.name && <p className="errors">{errors.name}</p>}</div>
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
          <div>{errors.price && <p className="errors">{errors.price}</p>}</div>
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
          <div>
            {errors.previewImage?.required && (
              <p className="errors">{errors.previewImage?.required}</p>
            )}
            {errors.previewImage?.url && (
              <p className="errors">{errors.previewImage?.url}</p>
            )}
          </div>
          <label className="form-label">
            <input
              type="text"
              className="image"
              placeholder="Image URL"
              value={image0}
              onChange={(e) => setImage0(e.target.value)}
            />
          </label>
          <div>
            {errors.image0?.url && (
              <p className="errors">{errors.image0?.url}</p>
            )}
          </div>
          <label className="form-label">
            <input
              type="text"
              className="image"
              placeholder="Image URL"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
            />
          </label>
          <div>
            {errors.image1?.url && (
              <p className="errors">{errors.image1?.url}</p>
            )}
          </div>
          <label className="form-label">
            <input
              type="text"
              className="image"
              placeholder="Image URL"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
          </label>
          <div>
            {errors.image2?.url && (
              <p className="errors">{errors.image2?.url}</p>
            )}
          </div>
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
