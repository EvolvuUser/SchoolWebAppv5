import { PiBookOpenUserLight } from "react-icons/pi";
// import { PiBookOpenUserLight } from "react-icons/pi";
import { FaUserGroup, FaUsers, FaUsersLine } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
// import Card from "../components/common/Card.jsx";
import Style from "../../CSS/DashbordCss/Card.module.css";
// import NewCard from "../components/common/NewCard.jsx";
import Card from "../common/Card.jsx";
import EventCard from "./EventCard.jsx";
import CardStuStaf from "../common/CardStuStaf.jsx";
import StudentsChart from "../Dashbord/Charts/StudentsChart.jsx";
import Footer from "../../Layouts/Footer.jsx";
import { FaBirthdayCake } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { HiCollection } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";
import NoticeBord from "./NoticeBord.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardContent = () => {
  const [studentData, setStudentData] = useState({
    total: 0,
    present: 0,
  });
  const [staffData, setStaffData] = useState({
    teachingStaff: 0,
    nonTeachingStaff: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        // const academicYr=localStorage.getItem("user");
        const academicYr = localStorage.getItem("academicYear");
        if (!token || !academicYr) {
          throw new Error("No authentication token or academic year found");
        }

        // Fetch student data
        const studentResponse = await axios.get(
          "http://127.0.0.1:8000/api/studentss",
          {
            headers: {
              Authorization: `Bearer ${token}`,

              "X-Academic-Year": academicYr,
            },
          }
        );

        setStudentData({
          total: studentResponse.data.count,
          present: studentResponse.data.present,
        });

        // Fetch staff data
        const staffResponse = await axios.get(
          "http://127.0.0.1:8000/api/staff",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Academic-Year": academicYr,
            },
          }
        );

        setStaffData({
          teachingStaff: staffResponse.data.teachingStaff,
          nonTeachingStaff: staffResponse.data.non_teachingStaff,
        });
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* {error && <div className="error-message">{error}</div>} */}
      <div className="flex items-start justify-between w-full  pr-6 gap-4 h-1/2 px-6">
        <div
          className={`${Style.adminDashboard} w-2/3 grid grid-cols-3 gap-x-8 gap-y-3  p-4 h-full  `}
        >
          {/* <Card
            title="Students"
            value="3256"
            color="#FF5733"
            icon={<PiBookOpenUserLight />}
          />
          <Card
            title="Employees"
            value="68"
            color="#FFC107"
            icon={<PiBookOpenUserLight />}
          /> */}
          {/* {console.log("totalstudent", studentData.total)} */}
          <CardStuStaf
            title="Student"
            TotalValue={studentData.total}
            presentValue={studentData.present}
            color="#4CAF50"
            icon={
              <FaUsersLine
                style={{
                  color: "violet",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <CardStuStaf
            title="Teachers"
            TotalValue={staffData.teachingStaff}
            // presentValue={staffData.teachingStaff}
            presentValue={"present"}
            color="#2196F3"
            icon={
              <FaUserGroup
                style={{
                  color: "#00FFFF",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <CardStuStaf
            title="Staff"
            TotalValue={staffData.nonTeachingStaff}
            // presentValue={staffData.nonTeachingStaff}
            presentValue={"Present"}
            color="#2196F3"
            icon={
              <FaUserGroup
                style={{
                  color: "#A287F3",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <Card
            title="Fee Collection Tab"
            value="3256"
            color="#FF5733"
            icon={
              <HiCollection
                style={{
                  color: "green",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <Card
            title="Ticketing Module"
            value="68"
            color="#FFC107"
            icon={
              <IoTicket
                style={{
                  color: "#30C790",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          {/* <Card
            title="Acheivements"
            value="16"
            color="#4CAF50"
            icon={
              <GiAchievement
                style={{
                  color: "violet",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          /> */}
          <Card
            title="BirthDay"
            value="3,47,000"
            color="#2196F3"
            icon={
              <FaBirthdayCake
                style={{
                  color: "cyan",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          {/* you can add more cards here just add on */}
        </div>
        <div
          //   className="w-2/5 border-2 border-solid border-red-500 h-5/6"
          className="w-1/3 border-2 border-solid  h-64 mt-6 bg-slate-100 overflow-y-hidden rounded-lg"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
          }}
        >
          <EventCard />
        </div>
      </div>

      <div className="flex items-start justify-between w-full  pr-6 gap-10 h-1/2 px-6 ">
        <div
          className=" w-2/3  gap-y-3 gap-x-3  h-full bg-slate-50 rounded-lg"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
          }}
        >
          <StudentsChart />
        </div>
        <div
          className=" w-1/3 border-2 border-solid  h-full  bg-slate-50 rounded-lg"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
          }}
        >
          {" "}
          <NoticeBord />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DashboardContent;



// this is the responsive code for the dashbord



import { PiBookOpenUserLight } from "react-icons/pi";
import { FaUserGroup, FaUsersLine } from "react-icons/fa6";
import { HiCollection } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../common/Card.jsx";
import EventCard from "./EventCard.jsx";
import CardStuStaf from "../common/CardStuStaf.jsx";
import StudentsChart from "../Dashbord/Charts/StudentsChart.jsx";
import Footer from "../../Layouts/Footer.jsx";
import NoticeBord from "./NoticeBord.jsx";

const DashboardContent = () => {
  const [studentData, setStudentData] = useState({
    total: 0,
    present: 0,
  });
  const [staffData, setStaffData] = useState({
    teachingStaff: 0,
    nonTeachingStaff: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found");
        }

        // Fetch student data
        const studentResponse = await axios.get(
          "http://127.0.0.1:8000/api/studentss",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Academic-Year": "2023-2024",
            },
          }
        );

        setStudentData({
          total: studentResponse.data.count,
          present: studentResponse.data.present,
        });

        // Fetch staff data
        const staffResponse = await axios.get(
          "http://127.0.0.1:8000/api/staff",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStaffData({
          teachingStaff: staffResponse.data.teachingStaff,
          nonTeachingStaff: staffResponse.data.non_teachingStaff,
        });
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-4 p-6">
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardStuStaf
            title="Student"
            TotalValue={studentData.total}
            presentValue={studentData.present}
            color="#4CAF50"
            icon={
              <FaUsersLine
                style={{
                  color: "violet",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <CardStuStaf
            title="Teachers"
            TotalValue={staffData.teachingStaff}
            presentValue={"present"}
            color="#2196F3"
            icon={
              <FaUserGroup
                style={{
                  color: "#00FFFF",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <CardStuStaf
            title="Staff"
            TotalValue={staffData.nonTeachingStaff}
            presentValue={"Present"}
            color="#2196F3"
            icon={
              <FaUserGroup
                style={{
                  color: "#A287F3",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <Card
            title="Fee Collection Tab"
            value="3256"
            color="#FF5733"
            icon={
              <HiCollection
                style={{
                  color: "green",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <Card
            title="Ticketing Module"
            value="68"
            color="#FFC107"
            icon={
              <IoTicket
                style={{
                  color: "#30C790",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
          <Card
            title="BirthDay"
            value="3,47,000"
            color="#2196F3"
            icon={
              <FaBirthdayCake
                style={{
                  color: "cyan",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            }
          />
        </div>
        <div className="w-full lg:w-1/3 h-64 mt-6 lg:mt-0 bg-slate-100 overflow-y-hidden rounded-lg shadow-md">
          <EventCard />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-10 p-6">
        {/* <div className="w-full lg:w-2/3 h-full bg-slate-50 rounded-lg shadow-md">
          <StudentsChart />
        </div> */}
        <div
          className=" w-2/3  gap-y-3 gap-x-3  h-full bg-slate-50 rounded-lg"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
          }}
        >
          <StudentsChart />
        </div>
        <div
          className="w-full lg:w-1/3  bg-slate-50 rounded-lg shadow-md "
          style={{ height: "320px" }}
        >
          <NoticeBord />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DashboardContent;
