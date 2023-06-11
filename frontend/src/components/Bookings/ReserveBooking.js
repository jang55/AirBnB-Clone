import { useState } from "react";
import { useDispatch } from "react-redux";
import * as bookingActions from "../../store/bookingReducer";
import "./ReserveBooking.css";

function ReserveBooking({ spot }) {
  const dispatch = useDispatch();
  const [startMonth, setStartMonth] = useState(new Date().toJSON().slice(5, 7));
  const [startDay, setStartDay] = useState(new Date().toJSON().slice(8, 10));
  const [startYear, setStartYear] = useState(new Date().toJSON().slice(0, 4));
  const [endMonth, setEndMonth] = useState(new Date().toJSON().slice(5, 7));
  const [endDay, setEndDay] = useState(new Date().toJSON().slice(8, 10));
  const [endYear, setEndYear] = useState(new Date().toJSON().slice(0, 4));
  const [successful, setSuccesful] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const startDate = `${startYear}-${startMonth}-${startDay}`;
    const endDate = `${endYear}-${endMonth}-${endDay}`;

    setStartDate(startDate);
    setEndDate(endDate);

    const formInfo = {
      startDate,
      endDate,
    };

    let booking;

    try {
      booking = await dispatch(
        bookingActions.createBookingThunk(formInfo, spot.id)
      );
    } catch (err) {
      console.log(err);
      const data = await err.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }

    if (booking) {
      setSuccesful(true);
    }
  };

  return (
    <>
      {!successful && (<div className="booking-form-container">
        <h2>Pick your dates to book.</h2>
        <form onSubmit={onSubmitHandler} className="form-wrapper">
          <div className="start-date-wrapper">
            <label className="start-date-label">Start Date:</label>
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
              <option value={"29"}>29</option>
              <option value={"30"}>30</option>
              <option value={"31"}>31</option>
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
            {errors.startDate && <p className="errors booking-errors">{errors.startDate}</p>}
          </div>
          <div className="end-date-wrapper">
            <label className="end-date-label">End Date:</label>
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
            <select value={endDay} onChange={(e) => setEndDay(e.target.value)}>
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
              <option value={"29"}>29</option>
              <option value={"30"}>30</option>
              <option value={"31"}>31</option>
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
            {errors.endDate && <p className="errors booking-errors">{errors.endDate}</p>}
          </div>
          <button type="submit" className="booking-submit-button">Submit Dates</button>
        </form>
      </div>)}
      {successful && <h2>{`Successfully Booked for dates starting on ${startDate} and ending on ${endDate}`}</h2>}
    </>
  );
}

export default ReserveBooking;
