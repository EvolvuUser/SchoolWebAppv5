// // //  Finallly working navbar dynamically
// import { useEffect, useState } from "react";
// import { Navbar, Nav, NavDropdown, NavItem } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaHome, FaUserCircle } from "react-icons/fa";
// import { CiLogout } from "react-icons/ci";
// import { LiaEdit } from "react-icons/lia";
// import "./NabarstyleBootstrap.css";
// import authManage from "../utils/PrivateRoute";
// import styles from "../CSS/Navbar.module.css";
// import { LuSchool } from "react-icons/lu";
// import { RxHamburgerMenu } from "react-icons/rx";
// import Sidebar from "./Sidebar";
// import RecursiveDropdown from "./RecursiveDropdown";

// import AdminNavBar from "./AdminNavBar";
// import { toast } from "react-toastify";
// import "./styles.css";
// function NavBar() {
//   const API_URL = import.meta.env.VITE_API_URL; //thsis is test url
//   const navigate = useNavigate();
//   const [isSidebar, setIsSidebar] = useState();
//   const [instituteName, setInstituteName] = useState("");
//   const [academicYear, setAcademicYear] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuDropdownOpen, setMenuDropdownOpen] = useState({});
//   // const [inputValueGR, setInputValueGR] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   // const [sessionData, setsessionData] = useState({});
//   const [sessionData, setSessionData] = useState({});
//   const [userProfileName, setuserProfilName] = useState("");
//   const [inputValueGR, setInputValueGR] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // const navigate = useNavigate();
//   const [schoolName, setSchoolName] = useState("");

//   const [navItems, setNavItems] = useState([]);
//   const [roleId, setRoleId] = useState(""); // Add roleId state
//   function getCurrentDate() {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, "0");
//     const monthIndex = today.getMonth();
//     const year = String(today.getFullYear()).slice();

//     const monthName = months[monthIndex];

//     return `${day} ${monthName} ${year}`;
//   }
//   // const handleSelect = (eventKey) => {
//   //   setSelectedYear(eventKey);
//   //   localStorage.setItem("academicYear", eventKey);
//   //   const academicYear = localStorage.getItem("academicYear");
//   //   console.log("this is selected academicYear", academicYear);
//   // };

//   // const handleSelect = async (eventKey) => {
//   //   setSelectedYear(eventKey);
//   //   localStorage.setItem("academicYear", eventKey);
//   //   const academic_yr = localStorage.getItem("academicYear");

//   //   try {
//   //     const token = localStorage.getItem("authToken");
//   //     if (!token || !academic_yr) {
//   //       throw new Error("No authentication token or academic year found");
//   //     }

//   //     console.log("api claing");
//   //     const response = await axios.put(
//   //       `${API_URL}/api/updateAcademicYear`,
//   //       {
//   //         academic_yr: eventKey,
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );
//   //     console.log("the response data", response.data.success);
//   //     if (response.data.success) {
//   //       console.log("Academic year updated successfully");
//   //       window.location.reload();
//   //     }
//   //   } catch (error) {
//   //     console.log("error aa rhi hai ");
//   //     console.error("Error updating academic year:", error);
//   //   }
//   // };

//   const handleSelect = async (eventKey) => {
//     setSelectedYear(eventKey);

//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       console.error("No authentication token found");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_URL}/api/update_academic_year`,
//         {
//           academic_year: eventKey,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.setItem("authToken", response.data.token);
//       // Refresh the page after updating the token
//       window.location.reload();
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 100);
//     } catch (error) {
//       console.error("Error updating academic year:", error);
//     }
//   };
//   // Take user name so call user prpofile api
//   useEffect(() => {
//     const fetcUSerProfilehData = async () => {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         throw new Error("No authentication token is found");
//       }
//       // console.log("jfdshfoisafhaios");
//       try {
//         const response = await axios.get(`${API_URL}/api/editprofile`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // console.log("the userporfile__________", response.data);
//         const staff = response.data.user?.get_teacher;
//         setuserProfilName(staff?.name);
//         console.log(
//           "the userupdate profile inside the navbar compoenent",
//           staff
//         );
//       } catch (error) {
//         toast.error(error.response.data.message);
//         console.error(
//           "Error fetching profile data inside navbar component:",
//           error
//         );
//       }
//     };

//     fetcUSerProfilehData();
//   }, [API_URL]);

//   // for GR number setup
//   // Function to handle search based on GR number
//   const handleSearch = async () => {
//     console.log("GR Number Entered:", inputValueGR); // Debugging

//     if (!inputValueGR) {
//       toast.error("Please enter a GR number!");
//       console.log("Error: Empty GR Number"); // Debugging
//       return;
//     }

//     // Check if inputValueGR contains only digits
//     if (!/^\d+$/.test(inputValueGR)) {
//       toast.error("Invalid GR number! Please enter a valid numeric value.");
//       console.log("Error: Invalid GR Number Format"); // Debugging
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.get(
//         `${API_URL}/api/student_by_reg_no/${inputValueGR}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const studentList = response?.data?.student || [];
//       console.log("Student List:", studentList); // Debugging

//       if (studentList.length === 0) {
//         alert("Not students found with tis gr no");
//         toast.error("No student found with this GR number.");
//         console.log("Error: No student found"); // Debugging
//       } else {
//         navigate(`/StudentSearchUsingGRN`, {
//           state: { studentData: studentList[0] },
//         });
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Error fetching student details."
//       );
//       console.log("API Error:", error?.response?.data?.message); // Debugging
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle keypress (Enter) in the input field
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // Function to handle the view of student details
//   const handleView = (student) => {
//     navigate(`/student/view/${student.student_id}`, {
//       state: { student: student },
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         console.error("No authentication token found");
//         return;
//       }

//       try {
//         // Fetch session data
//         const sessionResponse = await axios.get(`${API_URL}/api/sessionData`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const name = sessionResponse?.data?.custom_claims?.school_name;
//         if (name) {
//           setSchoolName(name);
//           document.title = name; // ✅ Dynamically set the HTML title
//         }
//         setSessionData(sessionResponse.data);
//         setSelectedYear(sessionResponse?.data?.custom_claims?.academic_year);
//         setRoleId(sessionResponse?.data?.user?.role_id); // Store role_id
//         // setRoleId("A"); // Store role_id
//         // Fetch academic year data
//         const academicYearResponse = await axios.get(
//           `${API_URL}/api/getAcademicYear`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setAcademicYear(academicYearResponse.data.academic_years);

//         // Fetch navigation items
//         const navResponse = await axios.get(`${API_URL}/api/navmenulist`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setNavItems(navResponse.data);
//         console.log("this is the nablis", navResponse.data);
//         console.log("this is the array", navResponse.data.sub_menus);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("authToken");

//       // Logout API
//       await axios.post(
//         `${API_URL}/api/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("academicYear");
//       localStorage.removeItem("user");
//       localStorage.removeItem("settings");
//       sessionStorage.removeItem("sessionData");
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };
//   const handleInputChange = (event) => {
//     setInputValueGR(event.target.value);
//   };
//   const toggleMenuDropdown = (menu) => {
//     setMenuDropdownOpen((prev) => ({
//       ...prev,
//       [menu]: !prev[menu],
//     }));
//   };
//   // Static navbar for admin
//   const renderStaticMenu = () => {
//     // Define your static menu items here
//     return <AdminNavBar />;
//   };
//   //  100% fully working navbar dynamically with css proper
//   // const renderDynamicMenu = () => {
//   //   const renderDropdownItemsis = (items) => {
//   //     return items.map((item) =>
//   //       item.sub_menus && item.sub_menus.length > 0 ? (
//   //         <NavDropdown
//   //           key={item.menu_id}
//   //           title={
//   //             <span className="nav-dropdown-title bold-navbar-item">
//   //               {item.name}
//   //             </span>
//   //           }
//   //           className="custom-dropdown font-bold text-[.9em]"
//   //         >
//   //           {item.sub_menus.map((subItem) =>
//   //             subItem.sub_menus && subItem.sub_menus.length > 0 ? (
//   //               <NavDropdown
//   //                 key={subItem.menu_id}
//   //                 title={
//   //                   <span className="nav-dropdown-title light-submenu-item">
//   //                     {subItem.name}
//   //                   </span>
//   //                 }
//   //                 className="custom-submenu-dropdown dropend" // Add dropend class here
//   //               >
//   //                 {subItem.sub_menus.map((childItem) =>
//   //                   childItem.sub_menus && childItem.sub_menus.length > 0 ? (
//   //                     <NavDropdown
//   //                       key={childItem.menu_id}
//   //                       title={
//   //                         <span className="nav-dropdown-title light-submenu-item">
//   //                           {childItem.name}
//   //                         </span>
//   //                       }
//   //                       className="custom-submenu-dropdown dropend" // Add dropend class here
//   //                     >
//   //                       {childItem.sub_menus.map((grandChildItem) => (
//   //                         <NavDropdown.Item
//   //                           key={grandChildItem.menu_id}
//   //                           onClick={() => navigate(grandChildItem.url)}
//   //                           className="light-submenu-item"
//   //                         >
//   //                           {grandChildItem.name}
//   //                         </NavDropdown.Item>
//   //                       ))}
//   //                     </NavDropdown>
//   //                   ) : (
//   //                     <NavDropdown.Item
//   //                       key={childItem.menu_id}
//   //                       onClick={() => navigate(childItem.url)}
//   //                       className="light-submenu-item"
//   //                     >
//   //                       {childItem.name}
//   //                     </NavDropdown.Item>
//   //                   )
//   //                 )}
//   //               </NavDropdown>
//   //             ) : (
//   //               <NavDropdown.Item
//   //                 key={subItem.menu_id}
//   //                 onClick={() => navigate(subItem.url)}
//   //                 className="light-submenu-item"
//   //               >
//   //                 {subItem.name}
//   //               </NavDropdown.Item>
//   //             )
//   //           )}
//   //         </NavDropdown>
//   //       ) : (
//   //         <Nav.Link
//   //           key={item.menu_id}
//   //           onClick={() => item.url && navigate(item.url)}
//   //           className="custom-nav-link bold-navbar-item"
//   //         >
//   //           {item.name}
//   //         </Nav.Link>
//   //       )
//   //     );
//   //   };
//   //   return renderDropdownItemsis(navItems);
//   // };
//   // Taking time to uncommnet it
//   const renderDynamicMenu = () => {
//     const renderDropdownItemsis = (items) => {
//       return items.map((item) =>
//         item.sub_menus && item.sub_menus.length > 0 ? (
//           <NavDropdown
//             key={item.menu_id}
//             title={<span className="nav-dropdown-title">{item.name}</span>}
//             // title={item.name}
//             className="text-[.9em] font-bold"
//           >
//             {item.sub_menus.map((subItem) =>
//               subItem.sub_menus && subItem.sub_menus.length > 0 ? (
//                 <NavDropdown
//                   key={subItem.menu_id}
//                   title={
//                     <span className="nav-dropdown-title">{subItem.name}</span>
//                   }
//                   // title={subItem.name}
//                   id="sub-view-dropdown"
//                   className=" font-bold dropend"
//                 >
//                   {subItem.sub_menus.map((childItem) =>
//                     childItem.sub_menus && childItem.sub_menus.length > 0 ? (
//                       <NavDropdown
//                         key={childItem.menu_id}
//                         id="sub-view-dropdown"
//                         title={
//                           <span className="nav-dropdown-title">
//                             {childItem.name}
//                           </span>
//                         }
//                         // title=
//                         className=" font-bold dropend"
//                       >
//                         {childItem.sub_menus.map((grandChildItem) => (
//                           <NavDropdown.Item
//                             key={grandChildItem.menu_id}
//                             onClick={() => navigate(grandChildItem.url)}
//                           >
//                             {grandChildItem.name}
//                           </NavDropdown.Item>
//                         ))}
//                       </NavDropdown>
//                     ) : (
//                       <NavDropdown.Item
//                         key={childItem.menu_id}
//                         onClick={() => navigate(childItem.url)}
//                       >
//                         {childItem.name}
//                       </NavDropdown.Item>
//                     )
//                   )}
//                 </NavDropdown>
//               ) : (
//                 <NavDropdown.Item
//                   key={subItem.menu_id}
//                   onClick={() => navigate(subItem.url)}
//                 >
//                   {subItem.name}
//                 </NavDropdown.Item>
//               )
//             )}
//           </NavDropdown>
//         ) : (
//           <Nav.Link
//             key={item.menu_id}
//             onClick={() => item.url && navigate(item.url)}
//             style={{ fontWeight: "700" }}
//           >
//             {item.name}
//           </Nav.Link>
//         )
//       );
//     };
//     return renderDropdownItemsis(navItems);
//   };
//   return (
//     <>
//       <div
//         className=""
//         style={{
//           position: "fixed",
//           top: "0px",
//           zIndex: "10",
//           backgroundColor: "#D61D5E",
//         }}
//       >
//         <div
//           className={`${styles.navbar} w-screen flex items-center justify-between px-2  h-12`}
//           style={{
//             // background: "#C12D51"
//             // background: "rgb(200, 35, 69) ",
//             background: "#C03078",
//           }}
//         >
//           <div>
//             <LuSchool className=" text-white " style={{ fontSize: "2em" }} />
//           </div>
//           <div className="flex-grow ">
//             <h1
//               className={`${styles.headingSchool} flex justify-center items-center   lg:text-2xl  font-semibold   sm:font-bold  text-white `}
//             >
//               {/* {localStorage.getItem("instituteName")} {"("}
//               {localStorage.getItem("academicYear")} */}
//               {/* {")"} */}
//               {/* St. Arnolds Central School{" ("} */}
//               {schoolName}
//               {" ("}
//               {sessionData.custom_claims?.academic_year}
//               {")"}
//             </h1>
//           </div>
//           <h1 className="text-lg lg:text-sm text-white px-2 hidden lg:block mt-2">
//             {getCurrentDate()}
//           </h1>
//           <div className="flex items-center ">
//             <NavDropdown
//               title={
//                 <span className="nav-dropdown-title">
//                   {
//                     <FaUserCircle
//                       className="text-white"
//                       style={{
//                         fontSize: "1.5rem",
//                         display: "inline",
//                         marginLeft: "4px",
//                         paddingRight: "4px",
//                       }}
//                     />
//                   }
//                 </span>
//               }
//               // title={
//               //   <FaUserCircle
//               //     className="text-white"
//               //     style={{
//               //       fontSize: "1.5rem",
//               //       display: "inline",
//               //       marginLeft: "4px",
//               //       paddingRight: "4px",
//               //     }}
//               //   />
//               // }
//               className="  w-18 border-2 rounded-full border-white px-2 lg:px-4 ml-2 hover:rounded-lg "
//               // menuAlign="left"
//             >
//               <NavDropdown.Item>
//                 <div
//                   className="flex items-center gap-2"
//                   onClick={() => {
//                     navigate("/myprofile");
//                   }}
//                 >
//                   <FaUserCircle style={{ fontSize: "1.5rem" }} />
//                   <span style={{ fontSize: ".8em" }}>
//                     {/* {sessionData.user?.name} */}
//                     {userProfileName}
//                   </span>
//                 </div>
//               </NavDropdown.Item>
//               <NavDropdown.Item>
//                 <div
//                   className="flex items-center gap-2"
//                   onClick={() => {
//                     navigate("/changepassword");
//                   }}
//                 >
//                   <LiaEdit style={{ fontSize: "1.5rem" }} />
//                   <span style={{ fontSize: ".8em" }}>Change Password</span>
//                 </div>
//               </NavDropdown.Item>
//               <NavDropdown.Item onClick={handleLogout}>
//                 <div className="flex items-center gap-2">
//                   <CiLogout style={{ fontSize: "1.5rem" }} />
//                   <span style={{ fontSize: ".8em" }}>Logout</span>
//                 </div>
//               </NavDropdown.Item>
//             </NavDropdown>
//           </div>
//         </div>
//         <div style={{ background: "rgb(255, 9, 98)" }}>
//           <div
//             className={` flex justify-between  shadow h-12  mx-2 bg-gray-200`}
//           >
//             <div
//               onClick={() => setIsSidebar(true)}
//               className="  hover:cursor-pointer hidden lg:block"
//             >
//               <RxHamburgerMenu
//                 style={{
//                   fontSize: "1.8em",
//                   textAlign: "center",
//                   display: "inline",
//                   position: "relative",
//                   top: "5px",
//                   left: "10px",
//                   paddingTop: "5px",
//                 }}
//               />
//             </div>
//             {/* nav bar items */}

//             <Navbar
//               expand="lg"
//               className={`${styles.navBarSide} flex justify-between pl-16 w-full custom-navbar `}
//             >
//               {/* kfdospafjkop */}
//               {/* joidsfj

//             */}
//               <div className="container-fluid flex items-center bg-gray-200 sm:w-40 box-border ">
//                 <Navbar.Toggle
//                   aria-controls="basic-navbar-nav"
//                   className="custom-toggler bg-transparent"
//                 />
//                 <Navbar.Collapse
//                   id="basic-navbar-nav"
//                   className="flex-grow-1 text-black "
//                 >
//                   {/* Navbar start here */}
//                   <Nav className="  mr-auto text-xs lg:text-sm ">
//                     <div
//                       onClick={() => {
//                         navigate("/dashboard");
//                       }}
//                       style={{ fontWeight: "700" }}
//                       className={`hover:cursor-pointer   DashbordText text-[1rem] md:pt-0 my-auto  text-black  md:relative right-2  `}
//                     >
//                       <FaHome className="inline mr-1 relative bottom-0.5  hover:text-black" />
//                       Dashboard
//                     </div>

//                     {console.log("the Role id", roleId)}
//                     {roleId === "A" ? renderStaticMenu() : renderDynamicMenu()}
//                     {/* {renderDropdownItemsis(navItems)} */}
//                     {/* Resysuib function  */}
//                     {/* <RecursiveDropdown items={navItems} /> */}
//                   </Nav>
//                 </Navbar.Collapse>{" "}
//               </div>
//             </Navbar>
//             <div className="flex items-center  ">
//               {/* className="w-12 lg:w-16 outline-none border border-black px-2 rounded-md text-pink-500 mr-2" */}
//               <div className="flex items-center">
//                 <div>
//                   <input
//                     type="text"
//                     id="search"
//                     name="search"
//                     placeholder="GR NO"
//                     value={inputValueGR}
//                     onChange={(e) => {
//                       setInputValueGR(e.target.value);
//                     }}
//                     onKeyPress={handleKeyPress} // Trigger search on Enter key press
//                     style={{
//                       display: "inline",
//                       position: "relative",
//                       zIndex: "2",
//                       padding: "3px",
//                       paddingRight: "4px",
//                     }}
//                     className={`w-12 lg:w-20 mr-4 outline-none border-1 border-gray-400 rounded-md py-0.5 text-xs lg:text-sm`}
//                     disabled={loading}
//                   />
//                 </div>
//               </div>{" "}
//               {/* {subjects.length > 0 && (
//                 <div className="mt-4">
//                   <h3>Search Results:</h3>
//                   <ul>
//                     {subjects.map((student) => (
//                       <li
//                         key={student.student_id}
//                         className="cursor-pointer p-2 border-b"
//                         onClick={() => handleView(student)}
//                       >
//                         {student.student_name} (GR: {student.gr_no})
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )} */}
//               <NavDropdown
//                 // title={selectedYear}
//                 title={
//                   <span
//                     className="nav-dropdown-title"
//                     style={{ fontSize: "1em" }}
//                   >
//                     {selectedYear ? selectedYear : "Academic Year "}
//                   </span>
//                 }
//                 // title={selectedYear ? selectedYear : "Academic Year "}
//                 className={`${styles.dropNaveBarAcademic} academic-dropdown outline-none border-1 border-gray-400 px-1 rounded-md py-0.5 text-xs lg:text-sm   `}
//                 style={{
//                   boxSizing: "border-box",
//                   width: "60%",
//                   margin: "auto",
//                   position: "relative",
//                   right: "10px",
//                   textAlign: "center",
//                   fontWeight: "600",
//                 }}
//                 onSelect={handleSelect}
//               >
//                 <div className=" text-start text-sm bg-gray-50 text-gray-300  h-28 overflow-y-scroll">
//                   {/* {academicYear.map((year) => (
//                   <NavDropdown.Item
//                     key={year}
//                     eventKey={year}
//                     value={year}
//                     // onChange={(e) => setChangedAcedemicYear(e.target.value)}
//                   >
//                     {year}
//                   </NavDropdown.Item>
//                 ))} */}
//                   {/* new logic */}
//                   {academicYear &&
//                     academicYear.length > 0 &&
//                     academicYear.map((year) => (
//                       <NavDropdown.Item key={year} eventKey={year}>
//                         {year}
//                       </NavDropdown.Item>
//                     ))}
//                 </div>
//               </NavDropdown>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
//     </>
//   );
// }

// export default NavBar;

// //  Finallly working navbar dynamically
import { useEffect, useRef, useState } from "react";
import { Navbar, Nav, NavDropdown, NavItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { LiaEdit } from "react-icons/lia";
import "./NabarstyleBootstrap.css";
import authManage from "../utils/PrivateRoute";
import styles from "../CSS/Navbar.module.css";
import { LuSchool } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";
import RecursiveDropdown from "./RecursiveDropdown";
import GrandChildMenu from "./GrandChildMenu";

import "./NavbarCss.css";
import AdminNavBar from "./AdminNavBar";
import { toast } from "react-toastify";
import "./styles.css";
import { IoMdArrowDropright } from "react-icons/io";
function NavBar() {
  const API_URL = import.meta.env.VITE_API_URL; //thsis is test url
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState();
  const [instituteName, setInstituteName] = useState("");
  const [academicYear, setAcademicYear] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState({});
  // const [inputValueGR, setInputValueGR] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  // const [sessionData, setsessionData] = useState({});
  const [sessionData, setSessionData] = useState({});
  const [userProfileName, setuserProfilName] = useState("");
  const [inputValueGR, setInputValueGR] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [roleId, setRoleId] = useState(""); // Add roleId state
  const [openGrandChildKey, setOpenGrandChildKey] = useState(null);
  const childItemRef = useRef(null);
  function getCurrentDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const monthIndex = today.getMonth();
    const year = String(today.getFullYear()).slice();

    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
  }

  const handleSelect = async (eventKey) => {
    setSelectedYear(eventKey);

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found");
      toast.error("Authentication token not found Please login again");
      navigate("/"); // 👈 Redirect to login
      return; // 👈
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/update_academic_year`,
        {
          academic_year: eventKey,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("authToken", response.data.token);
      // Refresh the page after updating the token
      window.location.reload();
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (error) {
      console.error("Error updating academic year:", error);
    }
  };
  // Take user name so call user prpofile api
  useEffect(() => {
    const fetcUSerProfilehData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        // throw new Error("No authentication token is found");
        toast.error("Authentication token not found Please login again");
        navigate("/"); // 👈 Redirect to login
        return; // 👈
      }
      // console.log("jfdshfoisafhaios");
      try {
        const response = await axios.get(`${API_URL}/api/editprofile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("the userporfile__________", response.data);
        const staff = response.data.user?.get_teacher;
        setuserProfilName(staff?.name);
        console.log(
          "the userupdate profile inside the navbar compoenent",
          staff
        );
        const errorMsg = response?.data?.message;
        // Handle expired token
        console.log("tokeneeee error--->", errorMsg, response?.data?.message);
        if (errorMsg === "Token has expired") {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("authToken"); // Optional: clear old token
          navigate("/"); // Redirect to login
          return;
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(
          "Error fetching profile data inside navbar component:",
          error
        );

        // working well code
        const errorMsg = error.response?.data?.message;
        // Handle expired token
        if (errorMsg === "Token has expired") {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("authToken"); // Optional: clear old token
          navigate("/"); // Redirect to login
          return;
        }

        // Other error handling
        toast.error(errorMsg || "Something went wrong.");
        console.error("Error fetching profile:", error);
      }
    };

    fetcUSerProfilehData();
  }, [API_URL]);

  // for GR number setup
  // Function to handle search based on GR number
  const handleSearch = async () => {
    console.log("GR Number Entered:", inputValueGR); // Debugging

    if (!inputValueGR) {
      toast.error("Please enter a GR number!");
      console.log("Error: Empty GR Number"); // Debugging
      return;
    }

    // Check if inputValueGR contains only digits
    if (!/^\d+$/.test(inputValueGR)) {
      toast.error("Invalid GR number! Please enter a valid numeric value.");
      console.log("Error: Invalid GR Number Format"); // Debugging
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${API_URL}/api/student_by_reg_no/${inputValueGR}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const studentList = response?.data?.student || [];
      console.log("Student List:", studentList); // Debugging

      if (studentList.length === 0) {
        // alert("Not students found with tis gr no");
        toast.error("No student found with this GR number.");
        console.log("Error: No student found"); // Debugging
      } else {
        navigate(`/StudentSearchUsingGRN`, {
          state: { studentData: studentList[0] },
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching student details."
      );
      console.log("API Error:", error?.response?.data?.message); // Debugging
    } finally {
      setLoading(false);
    }
  };

  // Function to handle keypress (Enter) in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Function to handle the view of student details
  const handleView = (student) => {
    navigate(`/student/view/${student.student_id}`, {
      state: { student: student },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No authentication token found");
        toast.error("Authentication token not found Please login again");
        navigate("/"); // 👈 Redirect to login
        return; // 👈
      }

      try {
        // Fetch session data
        const sessionResponse = await axios.get(`${API_URL}/api/sessionData`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const name = sessionResponse?.data?.custom_claims?.school_name;
        if (name) {
          setSchoolName(name);
          document.title = name; // ✅ Dynamically set the HTML title
        }
        setSessionData(sessionResponse.data);
        setSelectedYear(sessionResponse?.data?.custom_claims?.academic_year);
        setRoleId(sessionResponse.data.user.role_id); // Store role_id
        localStorage.setItem(
          "academic_yr_from",
          sessionResponse?.data?.custom_claims?.settings?.academic_yr_from
        );
        localStorage.setItem(
          "academic_yr_to",
          sessionResponse?.data?.custom_claims?.settings?.academic_yr_to
        );
        const errorMsg = sessionResponse?.data?.message;
        // Handle expired token
        if (errorMsg === "Token has expired") {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("authToken"); // Optional: clear old token
          navigate("/"); // Redirect to login
          return;
        } // setRoleId("A"); // Store role_id
        // Fetch academic year data
        const academicYearResponse = await axios.get(
          `${API_URL}/api/getAcademicYear`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAcademicYear(academicYearResponse.data.academic_years);

        // Fetch navigation items
        // const navResponse = await axios.get(`${API_URL}/api/navmenulist`,
        const navResponse = await axios.get(`${API_URL}/api/navmenulisttest`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNavItems(navResponse.data);
        console.log("this is the nablis", navResponse.data);
        console.log("this is the array", navResponse.data.sub_menus);
      } catch (error) {
        const errorMsg = error.response?.data?.message;
        // Handle expired token
        if (errorMsg === "Token has expired") {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("authToken"); // Optional: clear old token
          navigate("/"); // Redirect to login
          return;
        }
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // Logout API
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("authToken");
      localStorage.removeItem("academicYear");
      localStorage.removeItem("user");
      localStorage.removeItem("settings");
      sessionStorage.removeItem("sessionData");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleInputChange = (event) => {
    setInputValueGR(event.target.value);
  };
  const toggleMenuDropdown = (menu) => {
    setMenuDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Static navbar for admin
  const renderStaticMenu = () => {
    // Define your static menu items here
    return <AdminNavBar />;
  };

  const menuRef = useRef(null);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [clickedDropdowns, setClickedDropdowns] = useState([]);

  const toggleDropdown = (key, level) => {
    const newBranch = [...openDropdowns.slice(0, level)];
    if (openDropdowns[level] === key) {
      // If same menu is clicked again → close it
      setOpenDropdowns(newBranch);
      setClickedDropdowns(newBranch);
    } else {
      // Open new branch
      const updated = [...newBranch, key];
      setOpenDropdowns(updated);
      setClickedDropdowns(updated);
    }
  };

  const hoverTimeouts = useRef({});

  const handleMouseEnter = (key, level) => {
    if (level === 0) return; // skip hover for top-level
    clearTimeout(hoverTimeouts.current[level]);
    const newPath = [...openDropdowns.slice(0, level), key];
    setOpenDropdowns(newPath);
    setClickedDropdowns([]); // reset clicked branch when hovering
  };

  const handleMouseLeave = (level) => {
    if (level === 0) return; // skip hover-out for top-level
    clearTimeout(hoverTimeouts.current[level]);
    hoverTimeouts.current[level] = setTimeout(() => {
      setOpenDropdowns((prev) =>
        prev.filter((key) => {
          const keyLevel = parseInt(key.split("-")[1]);
          return keyLevel < level || clickedDropdowns.includes(key);
        })
      );
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdowns([]); // close all menus
        setClickedDropdowns([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderDynamicMenu = () => {
    const renderDropdownItems = (items, level = 0) => {
      return items.map((item) => {
        const dropdownKey = `${item.menu_id}-${level}`;
        const isOpen = openDropdowns.includes(dropdownKey);

        if (item.sub_menus && item.sub_menus.length > 0) {
          return (
            <NavDropdown
              key={dropdownKey}
              title={<span className="nav-title-topIs">{item.name}</span>}
              className={`custom-nav-dropdown ${isOpen ? "show" : ""}`}
              show={isOpen}
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(dropdownKey, level);
              }}
            >
              {item.sub_menus.map((subItem) => {
                const subKey = `${subItem.menu_id}-${level + 1}`;
                const isSubOpen = openDropdowns.includes(subKey);

                if (subItem.sub_menus && subItem.sub_menus.length > 0) {
                  return (
                    <NavDropdown
                      key={subKey}
                      title={
                        <span className="nav-dropdown-sub-new-Dynamic ml-2">
                          {subItem.name}
                        </span>
                      }
                      className={`  nav-dropdown-sub-new dropend w-auto ${
                        isSubOpen ? "show" : ""
                      } `}
                      show={isSubOpen}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDropdown(subKey, level + 1); // click opens/closes
                      }}
                      onMouseEnter={() => handleMouseEnter(subKey, level + 1)} // hover opens
                      onMouseLeave={() => handleMouseLeave(level + 1)} // hover out closes (if not clicked)
                    >
                      {/* <div
                        style={{
                          maxHeight: "400px", // Set fixed height
                          overflowY: "auto", // Enable vertical scroll only
                          position: "relative", // Required for absolutely positioned dropdowns inside
                          zIndex: 1,
                        }}
                      > */}
                      {subItem.sub_menus.map((childItem) => {
                        const childKey = `${childItem.menu_id}-${level + 2}`;
                        const isChildOpen = openDropdowns.includes(childKey);

                        if (childItem.sub_menus?.length > 0) {
                          return (
                            <NavDropdown
                              key={childKey}
                              title={
                                <span
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  className="  custom-hover-styleForchildLeve  ml-2"
                                >
                                  {childItem.name}
                                </span>
                              }
                              // className={`dropend custom-submenuIs ${
                              //   isChildOpen ? "show" : ""
                              // }`}
                              className={`  nav-dropdown-sub-new dropend w-auto ${
                                isSubOpen ? "show" : ""
                              } `}
                              show={isChildOpen}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown(childKey, level + 2);
                              }}
                              onMouseEnter={() =>
                                handleMouseEnter(childKey, level + 2)
                              }
                              onMouseLeave={() => handleMouseLeave(level + 2)} // <-- pass level+2 here
                            >
                              {childItem.sub_menus.map((grandChildItem) => (
                                <NavDropdown.Item
                                  key={grandChildItem.menu_id}
                                  onClick={() => navigate(grandChildItem.url)}
                                >
                                  {grandChildItem.name}
                                </NavDropdown.Item>
                              ))}
                            </NavDropdown>
                            // <NavDropdown.Item
                            //   key={childKey}
                            //   className="relative"
                            //   onMouseEnter={() =>
                            //     setOpenGrandChildKey(childKey)
                            //   }
                            //   onMouseLeave={() => setOpenGrandChildKey(null)}
                            // >
                            //   <span
                            //     ref={childItemRef}
                            //     className=" w-full  cursor-pointer flex justify-between items-center  "
                            //   >
                            //     <span className="text-left">
                            //       {childItem.name}
                            //     </span>
                            //     {/* <span className="text-right">&raquo;</span> */}
                            //     <span className="relative left-4 font-extrabold text-[1.3em] text-right">
                            //       <IoMdArrowDropright />
                            //     </span>
                            //   </span>

                            //   {openGrandChildKey === childKey && (
                            //     <GrandChildMenu
                            //       anchorRef={childItemRef}
                            //       items={childItem.sub_menus}
                            //       onClose={() => setOpenGrandChildKey(null)}
                            //     />
                            //   )}
                            // </NavDropdown.Item>
                          );
                        } else {
                          return (
                            <NavDropdown.Item
                              key={childKey}
                              onClick={() => navigate(childItem.url)}
                              className="hover:bg-gray-100 hover:text-blue-600 text-sm"
                            >
                              {childItem.name}
                            </NavDropdown.Item>
                          );
                        }
                      })}
                      {/* </div> */}
                    </NavDropdown>
                  );
                } else {
                  return (
                    <NavDropdown.Item
                      key={subKey}
                      onClick={() => navigate(subItem.url)}
                      // className="hover:bg-gray-100 hover:text-blue-600 text-sm"
                    >
                      {subItem.name}
                    </NavDropdown.Item>
                  );
                }
              })}
            </NavDropdown>
          );
        } else {
          return (
            <Nav.Link
              key={dropdownKey}
              onClick={() => item.url && navigate(item.url)}
              className="nav-title-top"
            >
              <span className="nav-title-top">{item.name}</span>
            </Nav.Link>
          );
        }
      });
    };

    return (
      <div ref={menuRef} className="flex items-center">
        {renderDropdownItems(navItems)}
      </div>
    );
  };

  return (
    <>
      <div
        className=""
        style={{
          position: "fixed",
          top: "0px",
          zIndex: "10",
          backgroundColor: "#D61D5E",
        }}
      >
        <div
          className={`${styles.navbar} w-screen flex items-center justify-between px-2  h-12`}
          style={{
            // background: "#C12D51"
            // background: "rgb(200, 35, 69) ",
            background: "#C03078",
          }}
        >
          <div>
            <LuSchool className=" text-white " style={{ fontSize: "2em" }} />
          </div>
          <div className="flex-grow ">
            <h1
              className={`${styles.headingSchool} flex justify-center items-center   lg:text-2xl  font-semibold   sm:font-bold  text-white `}
            >
              {/* {localStorage.getItem("instituteName")} {"("}
              {localStorage.getItem("academicYear")} */}
              {/* {")"} */}
              {/* St. Arnolds Central School{" ("} */}
              {schoolName}
              {" ("}
              {sessionData.custom_claims?.academic_year}
              {")"}
            </h1>
          </div>
          <h1 className="text-lg lg:text-sm text-white px-2 hidden lg:block mt-2">
            {getCurrentDate()}
          </h1>
          <div className="flex items-center ">
            <NavDropdown
              title={
                <span className="nav-dropdown-title">
                  {
                    <FaUserCircle
                      className="text-white"
                      style={{
                        fontSize: "1.5rem",
                        display: "inline",
                        marginLeft: "4px",
                        paddingRight: "4px",
                      }}
                    />
                  }
                </span>
              }
              // title={
              //   <FaUserCircle
              //     className="text-white"
              //     style={{
              //       fontSize: "1.5rem",
              //       display: "inline",
              //       marginLeft: "4px",
              //       paddingRight: "4px",
              //     }}
              //   />
              // }
              className="  w-18 border-2 rounded-full border-white px-2 lg:px-4 ml-2 hover:rounded-lg "
              // menuAlign="left"
            >
              <NavDropdown.Item>
                <div
                  className="flex items-center gap-2"
                  onClick={() => {
                    navigate("/myprofile");
                  }}
                >
                  <FaUserCircle style={{ fontSize: "1.5rem" }} />
                  <span style={{ fontSize: ".8em" }}>
                    {/* {sessionData.user?.name} */}
                    {userProfileName}
                  </span>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <div
                  className="flex items-center gap-2"
                  onClick={() => {
                    navigate("/changepassword");
                  }}
                >
                  <LiaEdit style={{ fontSize: "1.5rem" }} />
                  <span style={{ fontSize: ".8em" }}>Change Password</span>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                <div className="flex items-center gap-2">
                  <CiLogout style={{ fontSize: "1.5rem" }} />
                  <span style={{ fontSize: ".8em" }}>Logout</span>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div style={{ background: "rgb(255, 9, 98)" }}>
          <div
            className={` flex justify-between  shadow h-12  mx-2 bg-gray-200`}
          >
            <div
              onClick={() => setIsSidebar(true)}
              className="  hover:cursor-pointer hidden lg:block"
            >
              <RxHamburgerMenu
                style={{
                  fontSize: "1.8em",
                  textAlign: "center",
                  display: "inline",
                  position: "relative",
                  top: "5px",
                  left: "10px",
                  paddingTop: "5px",
                }}
              />
            </div>
            {/* nav bar items */}

            <Navbar
              expand="lg"
              className={`${styles.navBarSide} flex justify-between pl-16 w-full custom-navbar `}
            >
              {/* kfdospafjkop */}
              {/* joidsfj

            */}
              <div className="container-fluid flex items-center bg-gray-200 sm:w-40 box-border ">
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="custom-toggler bg-transparent"
                />
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  className="flex-grow-1 text-black "
                >
                  {/* Navbar start here */}
                  <Nav className="  mr-auto text-xs lg:text-sm ">
                    <div
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                      style={{ fontWeight: "700" }}
                      className={`hover:cursor-pointer   DashbordText text-[1rem] md:pt-0 my-auto  text-black  md:relative right-2  `}
                    >
                      <FaHome className="inline mr-1 relative bottom-0.5  hover:text-black" />
                      Dashboard
                    </div>

                    {console.log("the Role id", roleId)}
                    {/* {roleId === "A" ? renderStaticMenu() : renderDynamicMenu()} */}
                    {renderDynamicMenu()}

                    {/* {renderDropdownItemsis(navItems)} */}
                    {/* Resysuib function .  */}
                    {/* <RecursiveDropdown items={navItems} /> */}
                  </Nav>
                </Navbar.Collapse>{" "}
              </div>
            </Navbar>
            <div className="flex items-center  ">
              {/* className="w-12 lg:w-16 outline-none border border-black px-2 rounded-md text-pink-500 mr-2" */}
              <div className="flex items-center">
                <div>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    // disabled
                    placeholder="GR NO"
                    value={inputValueGR}
                    onChange={(e) => {
                      setInputValueGR(e.target.value);
                    }}
                    onKeyPress={handleKeyPress} // Trigger search on Enter key press
                    style={{
                      display: "inline",
                      position: "relative",
                      zIndex: "2",
                      padding: "3px",
                      paddingRight: "4px",
                    }}
                    className={`w-12 lg:w-20 mr-4 outline-none border-1 border-gray-400 rounded-md py-0.5 text-xs lg:text-sm`}
                    disabled={loading}
                  />
                </div>
              </div>{" "}
              {/* {subjects.length > 0 && (
                <div className="mt-4">
                  <h3>Search Results:</h3>
                  <ul>
                    {subjects.map((student) => (
                      <li
                        key={student.student_id}
                        className="cursor-pointer p-2 border-b"
                        onClick={() => handleView(student)}
                      >
                        {student.student_name} (GR: {student.gr_no})
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
              <NavDropdown
                // title={selectedYear}
                title={
                  <span
                    className="nav-dropdown-title"
                    style={{ fontSize: "1em" }}
                  >
                    {selectedYear ? selectedYear : "Academic Year "}
                  </span>
                }
                // title={selectedYear ? selectedYear : "Academic Year "}
                className={`${styles.dropNaveBarAcademic} academic-dropdown outline-none border-1 border-gray-400 px-1 rounded-md py-0.5 text-xs lg:text-sm   `}
                style={{
                  boxSizing: "border-box",
                  width: "60%",
                  margin: "auto",
                  position: "relative",
                  right: "10px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
                onSelect={handleSelect}
              >
                <div className=" text-start text-sm bg-gray-50 text-gray-300  h-28 overflow-y-scroll">
                  {/* {academicYear.map((year) => (
                  <NavDropdown.Item
                    key={year}
                    eventKey={year}
                    value={year}
                    // onChange={(e) => setChangedAcedemicYear(e.target.value)}
                  >
                    {year}
                  </NavDropdown.Item>
                ))} */}
                  {/* new logic */}
                  {academicYear &&
                    academicYear.length > 0 &&
                    academicYear.map((year) => (
                      <NavDropdown.Item key={year} eventKey={year}>
                        {year}
                      </NavDropdown.Item>
                    ))}
                </div>
              </NavDropdown>
            </div>
          </div>
        </div>
      </div>
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
    </>
  );
}

export default NavBar;
