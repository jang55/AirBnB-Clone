import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotActions from "../../store/spotsReducer";
import "./LocationForm.css";

function UpdateLocationForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { locationId } = useParams();

  // const placeHolderSpotInfo = {...currentSpot};

  //all the states used in the form
  const [currentSpot, setCurrentSpot] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
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
  const [image3, setImage3] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let spotState;
    (async () => {
      spotState = await dispatch(spotActions.loadOneSpotThunk(locationId));
      setCurrentSpot(spotState);
    })().then(() => setIsLoaded(true));
  }, [dispatch, locationId]);

  useEffect(() => {
    setAddress(currentSpot?.address);
    setCity(currentSpot?.city);
    setCountry(currentSpot?.country);
    setState(currentSpot?.state);
    setLat(currentSpot?.lat);
    setLng(currentSpot?.lng);
    setName(currentSpot?.name);
    setDescription(currentSpot?.description);
    setPrice(currentSpot?.price);

    const images = currentSpot?.SpotImages;
    const previewImages = images?.filter(image => image.preview === true);
    if(previewImages) setPreviewImage(previewImages[previewImages.length - 1].url);

    const nonpreviewImages = images?.filter(image => image.preview === false);
    const setImageFuncs = [setImage0, setImage1, setImage2, setImage3];

    if (nonpreviewImages) {
      nonpreviewImages.forEach((image, i) => {
        if (i < setImageFuncs.length) {
          const setImageFunc = setImageFuncs[i];
          setImageFunc(image.url);
        }
      })
    }
  }, [currentSpot]);


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
    const imgs = { previewImage, image0, image1, image2, image3 };
    Object.keys(imgs).forEach((imgKey) => {
      const imgURL = imgs[imgKey];
      if (!isValidImg(imgURL)) {
        newErrors = {
          ...newErrors,
          [imgKey]: { url: "Image URL's must end in .png, .jpg, or.jpeg" },
        };
      }
    });

    let updatedSpot = null;

    const submitDetails = async () => {
      try {
        updatedSpot = await dispatch(
          spotActions.updateSpotThunk(formInfo, locationId)
        );
      } catch (err) {
        const data = await err.json();
        if (data && data.errors) {
          newErrors = { ...newErrors, ...data.errors };
        }
      }
    };
    await submitDetails();
    
    setErrors(newErrors);
    setIsRequired(true);
    
    if (updatedSpot && Object.values(newErrors).length === 0) {
      history.push(`/locations/${updatedSpot.id}`);
    }
  };

  return (
    <>
      {isLoaded && (
        <div className="form-container">
          <form className="create-spot-form" onSubmit={submitHandler}>
            <h1>Update your Spot</h1>
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
                    className="create-form-inputs"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </label>
                <div id="country-errors">
                  {errors.country && <p className="errors">{errors.country}</p>}
                </div>
                <label id="address-label" className="form-label">
                  Street Address
                  <input
                    type="text"
                    id="address"
                    placeholder="Street Address"
                    className="create-form-inputs"
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
                    className="create-form-inputs"
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
                    className="create-form-inputs"
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
                    className="create-form-inputs"
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
                    className="create-form-inputs"
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
                Mention the best features of your space, any special amentities
                like fast wifi or parking, and what you love abut the
                neighborhood.
              </p>
              <label className="form-label">
                <textarea
                  type="text"
                  id="description"
                  placeholder="Please write a description at least 30 characters"
                  value={description}
                  className="create-form-inputs"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <div>
                {errors.description && (
                  <p className="errors" id="description-error">
                    Description needs a minimum of 30 characters
                  </p>
                )}
              </div>
            </div>
            <div className="section-wrapper">
              <h3>Create a title for your spot</h3>
              <p>
                Catch guests attention with a spot title that highlights what
                makes your place special.
              </p>
              <label className="form-label">
                <input
                  type="text"
                  id="name"
                  placeholder="Name of your spot"
                  className="create-form-inputs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <div>
                {errors.name && <p className="errors">{errors.name}</p>}
              </div>
            </div>
            <div className="section-wrapper">
              <h3>Set a base price for your spot</h3>
              <p>
                Competitive pricing can help tour listing stand out and rank
                higher in search results.
              </p>
              <label className="form-label price-label">
                ${" "}
                <input
                  type="text"
                  id="price"
                  placeholder="Price per a night (USD)"
                  className="create-form-inputs"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <div>
                {errors.price && <p className="errors">{errors.price}</p>}
              </div>
            </div>
            <div className="section-wrapper">
              <h3>Liven up your spot with photos</h3>
              <p>Submit a link at least one photo to publish your spot.</p>
              <label className="form-label">
                <input
                  type="text"
                  className="create-form-inputs"
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
                  className="create-form-inputs"
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
                  className="create-form-inputs"
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
                  className="create-form-inputs"
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
              <label className="form-label">
                <input
                  type="text"
                  className="create-form-inputs"
                  placeholder="Image URL"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                />
              </label>
              <div>
                {errors.image3?.url && (
                  <p className="errors">{errors.image3?.url}</p>
                )}
              </div>
            </div>
            <div id="create-button-container">
              <button type="submit" id="create-button">
                Update your Spot
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateLocationForm;
