import React, { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./EventCard.module.css"; // Import CSS module
import { MdOutlineArrowDropDown } from "react-icons/md";

const EventCard = () => {
  const API_URL = import.meta.env.VITE_API_URL; // url for host
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const [error, setError] = useState(null);

  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const academicYr = localStorage.getItem("academicYear");
        console.log("academic year", academicYr);
        console.log("token is", token);

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          // `http://127.0.0.1:8000/api/events`,
          `${API_URL}/api/events`,
          {
            params: {
              month: selectedMonth + 1, // API expects 1-based month index
              year: currentYear,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Academic-Year": academicYr,
              // "X-Academic-Year": "2023-2024",
            },
          }
        );

        setEvents(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [selectedMonth]); // Fetch when selectedMonth changes

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const filteredEvents = events.filter(
    (event) => new Date(event.start_date).getMonth() === selectedMonth
  );

  return (
    <div className={`  border-2 border-solid h-64 bg-slate-100`}>
      <div className="  m-auto header p-1 flex justify-between items-center bg-gray-200 rounded-t-lg mb-3">
        <span className="lg:text-lg sm:text-xs sm:font-semibold text-gray-500 mb-1">
          Events_List
        </span>

        {/* <div
        className={`${Styles.header} `}
        style={{ fontWeight: "800", fontSize: "1.3em" }}
      > */}
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="   text-sm text-gray-700 font-semibold hover:cursor-pointer bg-gray-50 mb-1 border border-gray-400"
          // className={`  hover:cursor-pointer gap-x-2`}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label} {currentYear}
            </option>
          ))}
        </select>
        {/* <MdOutlineArrowDropDown /> */}
      </div>
      <div
        className={`${Styles.eventsList} rounded-lg pb-20 sm:pb-20  bg-gray-100 px-2`}
      >
        {filteredEvents.map((event, index) => (
          <div key={index} className={`${Styles.eventCard} rounded-lg `}>
            <div
              className={` h-full w-1/4  bg-gray-500   text-cyan-900 text-lg rounded-l-lg  flex flex-col items-center justify-between     `}
              style={{ background: "#00FFFF", color: "#C3347D" }}
            >
              <span className=" relative top-4">
                {new Date(event.start_date).getDate() + 1}{" "}
                {new Date(event.start_date).toLocaleString("default", {
                  month: "long",
                })}
              </span>
              <br />
              <span className=" relative bottom-4">{event.start_time}</span>
            </div>

            <div className={Styles.details}>
              <h5
                className="sm:text-xs"
                style={{
                  // fontSize: "1.1em",
                  fontWeight: "550",
                  // marginTop: "1em",
                  color: "#00FFFF",
                }}
              >
                {event.title}{" "}
                <span
                  style={{ color: "#C334A2" }}
                >{` (class-${event.class_name})`}</span>
              </h5>
              <div className="mb-3">
                <div
                  className={`${Styles.discription}{mb-0 p-0 text-sm  sm:mb-1 mt-0 text-gray-800}`}
                  // dangerouslySetInnerHTML={{ __html: event.event_desc }}
                >
                  {event.event_desc}
                </div>
                <p
                  style={{
                    fontSize: ".9em",
                    color: "gray",
                    marginTop: "2px",
                    marginLeft: "5px",
                    marginBottom: "-10px",
                  }}
                >
                  {" "}
                  {/* {new Date(event.end_date).getDate() + 1}{" "}
                  {new Date(event.end_date).toLocaleString("default", {
                    month: "long",
                  })} */}
                  {/* The event will conclude on March 8th, 2024, at 12:00 PM. */}
                  {`The event will conclude on ${
                    new Date(event.end_date).getDate() + 1
                  } ${new Date(event.end_date).toLocaleString("default", {
                    month: "long",
                  })} at ${event.end_time}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
