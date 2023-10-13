import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as bookingActions from "../../store/bookingReducer";
import "./ReserveBooking.css";

function UpdateBooking({ booking, setShowModal }) {
  const dispatch = useDispatch();
  const [dateStartArr, setDateStartArr] = useState([]);
  const [dateEndArr, setDateEndArr] = useState([]);
  const [startMonth, setStartMonth] = useState("");
  const [startDay, setStartDay] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endDay, setEndDay] = useState("");
  const [endYear, setEndYear] = useState("");
  const [successful, setSuccesful] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frontStartDate, setFrontStartDate] = useState("");
  const [frontEndDate, setFrontEndDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const startYear = booking.startDate.slice(0, 4)
    const startMonth = Number(booking.startDate.slice(5, 7) - 1)
    const startDay = booking.startDate.slice(8, 10)
    const endYear = booking.endDate.slice(0, 4)
    const endMonth = Number(booking.endDate.slice(5, 7) - 1)
    const endDay = booking.endDate.slice(8, 10)
    const dateSplitStartArr = new Date(startYear, startMonth, startDay).toLocaleDateString().split("/");
    const dateSplitEndArr = new Date(endYear, endMonth, endDay).toLocaleDateString().split("/");
    setDateStartArr(dateSplitStartArr);
    setDateEndArr(dateSplitEndArr);
  }, [booking.startDate, booking.endDate]);

  useEffect(() => {
    if (dateStartArr.length > 0) {
      setStartMonth(dateStartArr[0].length === 2 ? dateStartArr[0] : `0${dateStartArr[0]}`);
      setStartDay(dateStartArr[1].length === 2 ? dateStartArr[1] : `0${dateStartArr[1]}`);
      setStartYear(dateStartArr[2]);
    }

    if (dateEndArr.length > 0) {
      setEndMonth(dateEndArr[0].length === 2 ? dateEndArr[0] : `0${dateEndArr[0]}`);
      setEndDay(dateEndArr[1].length === 2 ? dateEndArr[1] : `0${dateEndArr[1]}`);
      setEndYear(dateEndArr[2]);
    }
  }, [dateStartArr, dateEndArr]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const startDate = `${startYear}-${startMonth}-${startDay}`;
    const endDate = `${endYear}-${endMonth}-${endDay}`;

    // sets the date to be made in the database
    setStartDate(startDate);
    setEndDate(endDate);
    // sets the date to be shown in the frontend 
    setFrontStartDate(`${startYear}, ${startMonth}, ${startDay}`)
    setFrontEndDate(`${endYear}, ${endMonth}, ${endDay}`);

    const formInfo = {
      startDate,
      endDate,
    };

    let updatedBooking;

    try {
      updatedBooking = await dispatch(
        bookingActions.updateBookingThunk(formInfo, booking.id)
      );
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }

    if (updatedBooking) {
      setSuccesful(true);
    }
  };

  return (
    <>
      {!successful && (
        <div className="booking-form-container">
          <form onSubmit={onSubmitHandler} className="form-wrapper">
            <h2>Please pick your dates to update your reservations.</h2>
            <div className="start-date-wrapper">
              <label className="start-date-label">Check In:</label>
              <select
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
              >
                <option value="" disabled>
                  Month
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
              >
                <option value="" disabled>
                  Day
                </option>
                <option value={"01"}>01</option>
                <option value={"02"}>02</option>
                <option value={"03"}>03</option>
                <option value={"04"}>04</option>
                <option value={"05"}>05</option>
                <option value={"06"}>06</option>
                <option value={"07"}>07</option>
                <option value={"08"}>08</option>
                <option value={"09"}>09</option>
                <option value={"10"}>10</option>
                <option value={"11"}>11</option>
                <option value={"12"}>12</option>
                <option value={"13"}>13</option>
                <option value={"14"}>14</option>
                <option value={"15"}>15</option>
                <option value={"16"}>16</option>
                <option value={"17"}>17</option>
                <option value={"18"}>18</option>
                <option value={"19"}>19</option>
                <option value={"20"}>20</option>
                <option value={"21"}>21</option>
                <option value={"22"}>22</option>
                <option value={"23"}>23</option>
                <option value={"24"}>24</option>
                <option value={"25"}>25</option>
                <option value={"26"}>26</option>
                <option value={"27"}>27</option>
                <option value={"28"}>28</option>
                {!(startMonth === "02") && <option value={"29"}>29</option>}
                {!(startMonth === "02") && <option value={"30"}>30</option>}
                {!(
                  startMonth === "02" ||
                  startMonth === "04" ||
                  startMonth === "06" ||
                  startMonth === "09" ||
                  startMonth === "11" ||
                  startMonth === "04"
                ) && <option value={"31"}>31</option>}
              </select>
              <select
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              >
                <option value="" disabled>
                  Year
                </option>
                <option value={"2023"}>2023</option>
                <option value={"2024"}>2024</option>
                <option value={"2025"}>2025</option>
                <option value={"2026"}>2026</option>
                <option value={"2027"}>2027</option>
                <option value={"2028"}>2028</option>
              </select>
              {errors.startDate && (
                <p className="errors booking-errors">{errors.startDate}</p>
              )}
              {errors.startDay && (
                <p className="errors booking-errors">{errors.startDay}</p>
              )}
            </div>
            <div className="end-date-wrapper">
              <label className="end-date-label">Check Out:</label>
              <select
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
              >
                <option value="" disabled>
                  Month
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select
                value={endDay}
                onChange={(e) => setEndDay(e.target.value)}
              >
                <option value="" disabled>
                  Day
                </option>
                <option value={"01"}>01</option>
                <option value={"02"}>02</option>
                <option value={"03"}>03</option>
                <option value={"04"}>04</option>
                <option value={"05"}>05</option>
                <option value={"06"}>06</option>
                <option value={"07"}>07</option>
                <option value={"08"}>08</option>
                <option value={"09"}>09</option>
                <option value={"10"}>10</option>
                <option value={"11"}>11</option>
                <option value={"12"}>12</option>
                <option value={"12"}>12</option>
                <option value={"13"}>13</option>
                <option value={"14"}>14</option>
                <option value={"15"}>15</option>
                <option value={"16"}>16</option>
                <option value={"17"}>17</option>
                <option value={"18"}>18</option>
                <option value={"19"}>19</option>
                <option value={"20"}>20</option>
                <option value={"21"}>21</option>
                <option value={"22"}>22</option>
                <option value={"23"}>23</option>
                <option value={"24"}>24</option>
                <option value={"25"}>25</option>
                <option value={"26"}>26</option>
                <option value={"27"}>27</option>
                <option value={"28"}>28</option>
                {!(endMonth === "02") && <option value={"29"}>29</option>}
                {!(endMonth === "02") && <option value={"30"}>30</option>}
                {!(
                  endMonth === "02" ||
                  endMonth === "04" ||
                  endMonth === "06" ||
                  endMonth === "09" ||
                  endMonth === "11" ||
                  endMonth === "04"
                ) && <option value={"31"}>31</option>}
              </select>
              <select
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              >
                <option value="" disabled>
                  Year
                </option>
                <option value={"2023"}>2023</option>
                <option value={"2024"}>2024</option>
                <option value={"2025"}>2025</option>
                <option value={"2026"}>2026</option>
                <option value={"2027"}>2027</option>
                <option value={"2028"}>2028</option>
              </select>
              {errors.endDate && (
                <p className="errors booking-errors">{errors.endDate}</p>
              )}
              {errors.endDay && (
                <p className="errors booking-errors">{errors.endDay}</p>
              )}
            </div>
            <button type="submit" className="booking-submit-button">
              Submit Dates
            </button>
          </form>
        </div>
      )}
      {successful && (
        <div className="success-booking-message-container">
          <h4 className="success-booking-h4">{`Dates successfully updated for `}</h4>
          <p>{`${new Date(frontStartDate)
              .toString()
              .slice(0, 10)}, ${new Date(frontStartDate)
              .toString()
              .slice(11, 15)} - ${new Date(frontEndDate)
              .toString()
              .slice(0, 10)}, ${new Date(frontEndDate).toString().slice(11, 15)}`}</p>
          <button className="ok-button" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default UpdateBooking;
