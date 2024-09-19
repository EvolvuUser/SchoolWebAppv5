// import { useEffect, useState } from "react";
// import axios from "axios";
// import ReactPaginate from "react-paginate";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // The is the divisionlist module
// function DivisionList() {
//   const API_URL = import.meta.env.VITE_API_URL; // URL for host
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentSection, setCurrentSection] = useState(null);
//   const [newSectionName, setNewSectionName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [className, setClassName] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageCount, setPageCount] = useState(0);
//   const [newDepartmentId, setNewDepartmentId] = useState("");
//   const [fieldErrors, setFieldErrors] = useState({}); // For field-specific errors
//   // validations state for unique name
//   const [nameAvailable, setNameAvailable] = useState(true);
//   const [nameError, setNameError] = useState("");

//   // const [classes, setClasses] = useState([
//   //   "Nursery",
//   //   "LKG",
//   //   "UKG",
//   //   "1",
//   //   "2",
//   //   "3",
//   //   "4",
//   //   "5",
//   //   "6",
//   //   "7",
//   //   "8",
//   //   "9",
//   //   "10",
//   //   "11",
//   //   "12",
//   // ]);
//   const [classes, setClasses] = useState([]);
//   const [classOptions, setClassOptions] = useState([]);

//   useEffect(() => {
//     const fetchClassNames = async () => {
//       try {
//         const token = localStorage.getItem("authToken");

//         const response = await axios.get(
//           `${API_URL}/api/get_class_for_division`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const classData = response.data;

//         // Extract class names from the response
//         // const classes = classData.map((item) => ({
//         //   id: item.class_id,
//         //   name: item.name,
//         // }));
//         if (Array.isArray(response.data)) {
//           setClasses(response.data);
//         } else {
//           setError("Unexpected data format");
//         }
//         // setClasses(classData.name);
//         console.log("the classresponse*********************", classData);
//       } catch (error) {
//         console.error("Error fetching class names:", error);
//       }
//     };

//     fetchClassNames();
//   }, []);

//   const pageSize = 10;

//   const fetchSections = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const academicYr = localStorage.getItem("academicYear");

//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const response = await axios.get(`${API_URL}/api/getDivision`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-Academic-Year": academicYr,
//         },
//         withCredentials: true,
//       });

//       setSections(response.data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSections();
//   }, []);

//   // Filter and paginate sections
//   const filteredSections = sections.filter((section) =>
//     section.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const displayedSections = filteredSections.slice(
//     currentPage * pageSize,
//     (currentPage + 1) * pageSize
//   );

//   useEffect(() => {
//     setPageCount(Math.ceil(filteredSections.length / pageSize));
//   }, [filteredSections]);

//   const validateSectionName = (name, departmentId) => {
//     const errors = {};
//     if (!name || name.trim() === "") {
//       errors.name = "The name field is required.";
//     } else if (name.length > 1) {
//       errors.name = "The name field must not exceed 1 characters.";
//     }
//     if (!departmentId) {
//       errors.department_id = "The class is required.";
//     }
//     return errors;
//   };

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   // APi calling for check unique name
//   const handleBlur = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       console.log("the response of the namechack api____", newSectionName);

//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const response = await axios.post(
//         `${API_URL}/api/check_division_name`,
//         { name: newSectionName, class_id: className },

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       console.log("the response of the namechack api", response.data);
//       if (response.data?.exists === true) {
//         setNameError("Name is already taken. Please select another name.");
//         setNameAvailable(false);
//       } else {
//         setNameError("");
//         setNameAvailable(true);
//       }
//     } catch (error) {
//       console.error("Error checking class name:", error);
//     }
//   };

//   const handleEdit = (section) => {
//     setCurrentSection(section);
//     setNewSectionName(section.name);
//     setClassName(section.get_class.class_id); // Assuming section.get_class.class_id contains the ID
//     // setClassName(section.get_class.name);
//     setNewDepartmentId(section.get_class.class_id); // Set department ID correctly
//     // setNewDepartmentId(section.section_id);
//     setShowEditModal(true);
//   };

//   const handleAdd = () => {
//     setShowAddModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowAddModal(false);
//     setShowEditModal(false);
//     setShowDeleteModal(false);
//     setNewSectionName("");
//     setNewDepartmentId("");
//     setCurrentSection(null);
//     setFieldErrors({});
//     setNameError("");
//   };

//   // const handleSubmitAdd = async () => {
//   //   const validationErrors = validateSectionName(
//   //     newSectionName,
//   //     newDepartmentId
//   //   );
//   //   if (Object.keys(validationErrors).length > 0 || !nameAvailable) {
//   //     setFieldErrors(validationErrors);
//   //     return;
//   //   }
//   //   try {
//   //     const token = localStorage.getItem("authToken");
//   //     // const academicYr = localStorage.getItem("academicYear");

//   //     if (!token) {
//   //       throw new Error("No authentication token or academic year found");
//   //     }
//   //     console.log("This is post Form");
//   //     console.log("This is post data Name:", newSectionName);
//   //     console.log("This is post data class_id:", newDepartmentId);
//   //     await axios.post(
//   //       `${API_URL}/api/store_division`,
//   //       { name: newSectionName, class_id: newDepartmentId },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //         withCredentials: true,
//   //       }
//   //     );

//   //     fetchSections();
//   //     handleCloseModal();
//   //     toast.success("Section added successfully!");
//   //   } catch (error) {
//   //     console.error("Error adding section:", error);
//   //     if (error.response && error.response.data && error.response.data.errors) {
//   //       Object.values(error.response.data.errors).forEach((err) =>
//   //         toast.error(err)
//   //       );
//   //     } else {
//   //       toast.error("Server error. Please try again later.");
//   //     }
//   //   }
//   // };

//   // const handleSubmitEdit = async () => {
//   //   const validationErrors = validateSectionName(
//   //     newSectionName,
//   //     newDepartmentId
//   //   );

//   //   if (Object.keys(validationErrors).length > 0 || !nameAvailable) {
//   //     setFieldErrors(validationErrors);
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem("authToken");
//   //     if (!token || !currentSection || !currentSection.section_id) {
//   //       throw new Error("No authentication token or section ID found");
//   //     }
//   //     console.log("This is edit Form");
//   //     console.log("This is post data Name:", currentSection.section_id);

//   //     console.log("This is Edit data Name:", newSectionName);
//   //     console.log("This is Edit data class_id:", newDepartmentId);
//   //     await axios.put(
//   //       `${API_URL}/api/getDivision/${currentSection.section_id}`,
//   //       { name: newSectionName, class_id: newDepartmentId },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,

//   //         },
//   //         withCredentials: true,
//   //       }
//   //     );

//   //     fetchSections();
//   //     handleCloseModal();
//   //     toast.success("Section updated successfully!");
//   //   } catch (error) {
//   //     console.error("Error editing section:", error);
//   //     if (error.response && error.response.data && error.response.data.errors) {
//   //       Object.values(error.response.data.errors).forEach((err) =>
//   //         toast.error(err)
//   //       );
//   //     } else {
//   //       toast.error("Server error. Please try again later.");
//   //     }
//   //   }
//   // };
//   const handleSubmitAdd = async () => {
//     const validationErrors = validateSectionName(
//       newSectionName,
//       newDepartmentId
//     );
//     if (Object.keys(validationErrors).length > 0 || !nameAvailable) {
//       setFieldErrors(validationErrors);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       // Check if the name is unique
//       const checkNameResponse = await axios.post(
//         `${API_URL}/api/check_division_name`,
//         { name: newSectionName, class_id: newDepartmentId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (checkNameResponse.data.exists) {
//         setNameError("Name is already taken. Please select another name.");
//         setNameAvailable(false);
//         return;
//       }

//       // Proceed with adding the section if the name is unique
//       await axios.post(
//         `${API_URL}/api/store_division`,
//         { name: newSectionName, class_id: newDepartmentId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       fetchSections();
//       handleCloseModal();
//       toast.success("Section added successfully!");
//     } catch (error) {
//       console.error("Error adding section:", error);
//       if (error.response && error.response.data && error.response.data.errors) {
//         Object.values(error.response.data.errors).forEach((err) =>
//           toast.error(err)
//         );
//       } else {
//         toast.error("Server error. Please try again later.");
//       }
//     }
//   };

//   const handleSubmitEdit = async () => {
//     // Validate section name and class
//     const validationErrors = validateSectionName(
//       newSectionName,
//       newDepartmentId
//     );
//     if (Object.keys(validationErrors).length > 0 || !nameAvailable) {
//       setFieldErrors(validationErrors);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token || !currentSection || !currentSection.section_id) {
//         throw new Error("No authentication token or section ID found");
//       }

//       // Check if the division name is unique before making the update
//       const nameCheckResponse = await axios.post(
//         `${API_URL}/api/check_division_name`,
//         { name: newSectionName, class_id: newDepartmentId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (nameCheckResponse.data?.exists) {
//         setNameError("Name is already taken. Please select another name.");
//         setNameAvailable(false);
//         return; // Exit if name is not available
//       }

//       // Update section if name is available
//       await axios.put(
//         `${API_URL}/api/getDivision/${currentSection.section_id}`,
//         { name: newSectionName, class_id: newDepartmentId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       fetchSections();
//       handleCloseModal();
//       toast.success("Section updated successfully!");
//     } catch (error) {
//       console.error("Error editing section:", error);
//       if (error.response && error.response.data && error.response.data.errors) {
//         Object.values(error.response.data.errors).forEach((err) =>
//           toast.error(err)
//         );
//       } else {
//         toast.error("Server error. Please try again later.");
//       }
//     }
//   };

//   const handleDelete = (id) => {
//     const sectionToDelete = sections.find((sec) => sec.section_id === id);
//     setCurrentSection(sectionToDelete);
//     setShowDeleteModal(true);
//   };

//   const handleSubmitDelete = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const academicYr = localStorage.getItem("academicYear");

//       if (!token || !currentSection || !currentSection.section_id) {
//         throw new Error("Section ID is missing");
//       }

//       const response = await axios.delete(
//         `${API_URL}/api/getDivision/${currentSection.section_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "X-Academic-Year": academicYr,
//           },
//           withCredentials: true,
//         }
//       );
//       console.log(
//         "The response of the delete api in the division module",
//         response.data
//       );
//       if (response.data.success) {
//         fetchSections();
//         setShowDeleteModal(false);
//         setCurrentSection(null);
//         toast.success("Division deleted successfully!");
//       } else {
//         toast.error(response.data.message || "Failed to delete Division");
//       }
//     } catch (error) {
//       console.error("Error deleting Division:", error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Server error. Please try again later.");
//       }
//     }
//   };

//   const handleChangeSectionName = (e) => {
//     // handleBlur();
//     const { value } = e.target;

//     setNewSectionName(value);

//     setFieldErrors((prevErrors) => ({
//       ...prevErrors,
//       name: validateSectionName(value, newDepartmentId).name,
//     }));
//   };

//   const handleChangeDepartmentId = (e) => {
//     const { value } = e.target;
//     setClassName(value);
//     setNewDepartmentId(value);
//     setFieldErrors((prevErrors) => ({
//       ...prevErrors,
//       department_id: validateSectionName(newSectionName, value).department_id,
//     }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <ToastContainer />

//       <div className="container mt-4">
//         <div className="card mx-auto lg:w-3/4 shadow-lg">
//           <div className="card-header flex justify-between items-center">
//             <h3 className="text-gray-700 mt-1 text-[1.2em] lg:text-xl text-nowrap">
//               Division
//             </h3>{" "}
//             <div className="box-border flex md:gap-x-2 justify-end md:h-10">
//               <div className=" w-1/2 md:w-fit mr-1">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search "
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <button
//                 className="btn btn-primary btn-sm md:h-9 text-xs md:text-sm"
//                 onClick={handleAdd}
//               >
//                 <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
//                 Add
//               </button>
//             </div>
//           </div>

//           <div className="card-body w-full">
//             <div className="h-96 lg:h-96 overflow-y-scroll lg:overflow-x-hidden">
//               <div className="bg-white rounded-lg shadow-xs">
//                 <table className="min-w-full leading-normal table-auto">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         S.No
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Divisions
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Class
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Edit
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Delete
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {displayedSections.length ? (
//                       displayedSections.map((section, index) => (
//                         <tr
//                           key={section.section_id}
//                           className={`${
//                             index % 2 === 0 ? "bg-white" : "bg-gray-100"
//                           } hover:bg-gray-50`}
//                         >
//                           <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap relative top-2">
//                               {index + 1}
//                             </p>
//                           </td>
//                           <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap relative top-2">
//                               {section.name}
//                             </p>
//                           </td>
//                           <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap relative top-2">
//                               {section?.get_class?.name}
//                             </p>
//                           </td>
//                           <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
//                             <button
//                               className="text-blue-600 hover:text-blue-800 hover:bg-transparent "
//                               onClick={() => handleEdit(section)}
//                             >
//                               <FontAwesomeIcon icon={faEdit} />
//                             </button>{" "}
//                           </td>
//                           <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
//                             <button
//                               className="text-red-600 hover:text-red-800 hover:bg-transparent "
//                               onClick={() => handleDelete(section.section_id)}
//                             >
//                               <FontAwesomeIcon icon={faTrash} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="text-center">
//                           No sections found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             {filteredSections.length > pageSize && (
//               <ReactPaginate
//                 previousLabel={"previous"}
//                 nextLabel={"next"}
//                 breakLabel={"..."}
//                 pageCount={pageCount}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={5}
//                 onPageChange={handlePageClick}
//                 containerClassName={"pagination justify-content-center"}
//                 pageClassName={"page-item"}
//                 pageLinkClassName={"page-link"}
//                 previousClassName={"page-item"}
//                 previousLinkClassName={"page-link"}
//                 nextClassName={"page-item"}
//                 nextLinkClassName={"page-link"}
//                 breakClassName={"page-item"}
//                 breakLinkClassName={"page-link"}
//                 activeClassName={"active"}
//               />
//             )}
//           </div>
//         </div>

//         {/* Modal for adding a new section */}
//         {showAddModal && (
//           <div className="fixed inset-0 z-50   flex items-center justify-center bg-black bg-opacity-50">
//             <div
//               className="modal"
//               style={{
//                 display: "block",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//               }}
//             >
//               <div className="modal-dialog modal-dialog-centered ">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Create New Section</h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       onClick={handleCloseModal}
//                     ></button>
//                   </div>
//                   <div className="modal-body">
//                     <div className="mb-3">
//                       <label htmlFor="sectionName" className="form-label">
//                         Section Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         maxLength={1}
//                         className="form-control"
//                         id="sectionName"
//                         value={newSectionName}
//                         placeholder="e.g A, B, C, D"
//                         onChange={handleChangeSectionName}
//                         // onChange={}
//                         onBlur={handleBlur}
//                       />
//                       {!nameAvailable && (
//                         <span className=" block text-red-500 text-xs">
//                           {nameError}
//                         </span>
//                       )}
//                       {fieldErrors.name && (
//                         <span className="text-danger text-xs">
//                           {fieldErrors.name}
//                         </span>
//                       )}
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="departmentId">
//                         Class <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         id="departmentId"
//                         className="form-control"
//                         value={newDepartmentId}
//                         onChange={handleChangeDepartmentId}
//                       >
//                         <option value="">Select Class</option>
//                         {/* {classes.map((cls, index) => (
//                           <option key={index} value={cls}>
//                             {cls}
//                           </option>
//                         ))} */}
//                         {classes.length === 0 ? (
//                           <option value="">No classes available</option>
//                         ) : (
//                           classes.map((cls) => (
//                             <option key={cls.class_id} value={cls.class_id}>
//                               {cls.name}
//                             </option>
//                           ))
//                         )}
//                       </select>
//                       {fieldErrors.department_id && (
//                         <span className="text-danger text-xs">
//                           {fieldErrors.department_id}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="modal-footer d-flex justify-content-end">
//                     {/* <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Cancel</button> */}
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       style={{}}
//                       onClick={handleSubmitAdd}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal for editing a section */}
//         {showEditModal && (
//           <div
//             className="modal"
//             style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Edit Section</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={handleCloseModal}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label htmlFor="editSectionName" className="form-label">
//                       Division Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       maxLength={1}
//                       className="form-control"
//                       id="editSectionName"
//                       placeholder="e.g A, B, C, D"
//                       value={newSectionName}
//                       onChange={handleChangeSectionName}
//                       // onBlur={handleBlur}
//                     />
//                     {!nameAvailable && (
//                       <span className=" block text-red-500 text-xs">
//                         {nameError}
//                       </span>
//                     )}

//                     {fieldErrors.name && (
//                       <span className="text-danger text-xs">
//                         {fieldErrors.name}
//                       </span>
//                     )}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="editDepartmentId">
//                       Class <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       id="editDepartmentId"
//                       className="form-control"
//                       value={className}
//                       onChange={handleChangeDepartmentId}
//                     >
//                       <option value="">Select Class</option>
//                       {/* {classes.map((cls, index) => (
//                         <option key={index} value={cls}>
//                           {cls}
//                         </option>
//                       ))} */}
//                       {/* <option value="">--Please choose a class--</option> */}
//                       {classes.length === 0 ? (
//                         <option value="">No classes available</option>
//                       ) : (
//                         classes.map((cls) => (
//                           <option key={cls.class_id} value={cls.class_id}>
//                             {cls.name}
//                           </option>
//                         ))
//                       )}
//                     </select>
//                     {fieldErrors.department_id && (
//                       <span className="text-danger text-xs">
//                         {fieldErrors.department_id}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   {/* <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button> */}
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     style={{}}
//                     onClick={handleSubmitEdit}
//                   >
//                     Update
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal for confirming deletion */}
//         {showDeleteModal && (
//           <div
//             className="modal"
//             style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Confirm Deletion</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={handleCloseModal}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <p>
//                     Are you sure you want to delete Division:{" "}
//                     <strong>{currentSection.name}</strong>?
//                   </p>
//                 </div>
//                 <div className="modal-footer">
//                   {/* <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button> */}
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     style={{}}
//                     onClick={handleSubmitDelete}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default DivisionList;

// with unique name validations on server api complete for testing.
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";

// The is the divisionlist module
function DivisionList() {
  const API_URL = import.meta.env.VITE_API_URL; // URL for host
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [newSectionName, setNewSectionName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [className, setClassName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [newDepartmentId, setNewDepartmentId] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // For field-specific errors
  const [nameError, setNameError] = useState("");
  const [nameAvailable, setNameAvailable] = useState(true);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClassNames = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${API_URL}/api/get_class_for_division`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (Array.isArray(response.data)) {
          setClasses(response.data);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching class names:", error);
      }
    };

    fetchClassNames();
  }, []);

  const pageSize = 10;

  const fetchSections = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_URL}/api/getDivision`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setSections(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Filter and paginate sections
  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedSections = filteredSections.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  useEffect(() => {
    setPageCount(Math.ceil(filteredSections.length / pageSize));
  }, [filteredSections]);

  // const validateSectionName = (name, departmentId) => {
  //   const errors = {};
  //   if (!name || name.trim() === "") {
  //     errors.name = "The name field is required.";
  //   } else if (name.length > 1) {
  //     errors.name = "The name field must not exceed 1 character.";
  //   }
  //   if (!departmentId) {
  //     errors.department_id = "The class is required.";
  //   }
  //   return errors;
  // };
  const validateSectionName = (name, departmentId) => {
    const errors = {};

    // Regular expression to match only alphabets
    const alphabetRegex = /^[A-Za-z]+$/;

    if (!name || name.trim() === "") {
      errors.name = "Please enter division name.";
    } else if (!alphabetRegex.test(name)) {
      errors.name = "The name field only contain alphabets.";
    } else if (name.length > 1) {
      errors.name = "The name field must not exceed 1 character.";
    }

    if (!departmentId) {
      errors.department_id = "Please Select class.";
    }

    return errors;
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleEdit = (section) => {
    setCurrentSection(section);
    setNewSectionName(section.name);
    setClassName(section.get_class.class_id);
    setNewDepartmentId(section.get_class.class_id);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setNewSectionName("");
    setNewDepartmentId("");
    setCurrentSection(null);
    setFieldErrors({});
    setNameError("");
  };

  const handleSubmitAdd = async () => {
    const validationErrors = validateSectionName(
      newSectionName,
      newDepartmentId
    );
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const checkNameResponse = await axios.post(
        `${API_URL}/api/check_division_name`,
        { name: newSectionName, class_id: newDepartmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (checkNameResponse.data?.exists === true) {
        setNameError("Name already taken.");
        setNameAvailable(false);
        return;
      } else {
        setNameError("");
        setNameAvailable(true);
      }

      await axios.post(
        `${API_URL}/api/store_division`,
        { name: newSectionName, class_id: newDepartmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      fetchSections();
      handleCloseModal();
      toast.success("Division added successfully!");
    } catch (error) {
      console.error("Error adding Division:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((err) =>
          toast.error(err)
        );
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  const handleSubmitEdit = async () => {
    const validationErrors = validateSectionName(
      newSectionName,
      newDepartmentId
    );
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token || !currentSection || !currentSection.section_id) {
        throw new Error("No authentication token or section ID found");
      }

      const nameCheckResponse = await axios.post(
        `${API_URL}/api/check_division_name`,
        { name: newSectionName, class_id: newDepartmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (nameCheckResponse.data?.exists === true) {
        setNameError("Name already taken.");
        setNameAvailable(false);
        return;
      } else {
        setNameError("");
        setNameAvailable(true);
      }

      await axios.put(
        `${API_URL}/api/getDivision/${currentSection.section_id}`,
        { name: newSectionName, class_id: newDepartmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      fetchSections();
      handleCloseModal();
      toast.success("Division updated successfully!");
    } catch (error) {
      console.error("Error editing Division:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((err) =>
          toast.error(err)
        );
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  const handleDelete = (id) => {
    const sectionToDelete = sections.find((sec) => sec.section_id === id);
    setCurrentSection(sectionToDelete);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const academicYr = localStorage.getItem("academicYear");

      if (!token || !currentSection || !currentSection.section_id) {
        throw new Error("Division ID is missing");
      }

      const response = await axios.delete(
        `${API_URL}/api/getDivision/${currentSection.section_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Academic-Year": academicYr,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        fetchSections();
        setShowDeleteModal(false);
        setCurrentSection(null);
        toast.success("Division deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete Division");
      }
    } catch (error) {
      console.error("Error deleting Division:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  const handleChangeSectionName = (e) => {
    const { value } = e.target;
    setNewSectionName(value);
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      name: validateSectionName(value, newDepartmentId).name,
    }));
  };

  const handleChangeDepartmentId = (e) => {
    const { value } = e.target;
    setClassName(value);
    setNewDepartmentId(value);
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      department_id: validateSectionName(newSectionName, e.target.value)
        .department_id,
    }));
  };

  return (
    <>
      <ToastContainer />

      <div className="container  mt-4">
        <div className="card mx-auto lg:w-3/4 shadow-lg">
          <div className="p-2 px-3 bg-gray-100 flex justify-between items-center">
            <h3 className="text-gray-700 mt-1 text-[1.2em] lg:text-xl text-nowrap">
              Division
            </h3>{" "}
            <div className="box-border flex md:gap-x-2 justify-end md:h-10">
              <div className=" w-1/2 md:w-fit mr-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary btn-sm md:h-9 text-xs md:text-sm"
                onClick={handleAdd}
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                Add
              </button>
            </div>
          </div>
          <div
            className=" relative w-[97%]   mb-3 h-1  mx-auto bg-red-700"
            style={{
              backgroundColor: "#C03078",
            }}
          ></div>

          <div className="card-body w-full">
            <div className="h-96 lg:h-96 overflow-y-scroll lg:overflow-x-hidden ">
              <div className="bg-white rounded-lg shadow-xs ">
                <table className="min-w-full leading-normal table-auto ">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        S.No
                      </th>
                      <th className=" -px-2  text-center py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Divisions
                      </th>
                      <th className="px-2 text-center lg:px-5 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Class
                      </th>
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Edit
                      </th>
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedSections.length ? (
                      displayedSections.map((section, index) => (
                        <tr
                          key={section.section_id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          } hover:bg-gray-50`}
                        >
                          <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
                            <p className="text-gray-900 whitespace-no-wrap relative top-2">
                              {index + 1}
                            </p>
                          </td>
                          <td className="text-center px-2  border border-gray-950 text-sm">
                            <p className="text-gray-900 whitespace-no-wrap relative top-2">
                              {section.name}
                            </p>
                          </td>
                          <td className="text-center px-2 lg:px-5 border border-gray-950 text-sm">
                            <p className="text-gray-900 whitespace-no-wrap relative top-2">
                              {section?.get_class?.name}
                            </p>
                          </td>
                          <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
                            <button
                              className="text-blue-600 hover:text-blue-800 hover:bg-transparent "
                              onClick={() => handleEdit(section)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>{" "}
                          </td>
                          <td className="text-center px-2 lg:px-3 border border-gray-950 text-sm">
                            <button
                              className="text-red-600 hover:text-red-800 hover:bg-transparent "
                              onClick={() => handleDelete(section.section_id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Division found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {filteredSections.length > pageSize && (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            )}
          </div>
        </div>

        {/* Modal for adding a new section */}
        {showAddModal && (
          <div className="fixed inset-0 z-50   flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="modal-dialog modal-dialog-centered ">
                <div className="modal-content">
                  <div className="flex justify-between p-3">
                    <h5 className="modal-title">Create New Division</h5>

                    <RxCross1
                      className="float-end relative top-2 right-2 text-xl text-red-600 hover:cursor-pointer hover:bg-red-100"
                      type="button"
                      // className="btn-close text-red-600"
                      onClick={handleCloseModal}
                    />
                  </div>
                  <div
                    className=" relative  mb-3 h-1 w-[97%] mx-auto bg-red-700"
                    style={{
                      backgroundColor: "#C03078",
                    }}
                  ></div>
                  {/* <hr className="font-bold"></hr> */}
                  <div className="modal-body">
                    <div className=" relative mb-3 flex justify-center  mx-4">
                      <label htmlFor="sectionName" className="w-1/2 mt-2">
                        Division Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={1}
                        className="form-control shadow-md mb-2"
                        // style={{ background: "#F8F8F8" }}
                        id="sectionName"
                        value={newSectionName}
                        // placeholder="e.g A, B, C, D"
                        onChange={handleChangeSectionName}
                        // onChange={}
                        // onBlur={handleBlur}
                      />
                      <div className="absolute top-9 left-1/3">
                        {!nameAvailable && (
                          <span className=" block text-danger text-xs">
                            {nameError}
                          </span>
                        )}
                        {fieldErrors.name && (
                          <span className="text-danger text-xs">
                            {fieldErrors.name}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* <div className="form-group"> */}
                    <div className=" relative mb-3 flex justify-center  mx-4">
                      <label htmlFor="departmentId" className="w-1/2 mt-2">
                        Class <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="departmentId"
                        className="form-control shadow-md"
                        value={newDepartmentId}
                        onChange={handleChangeDepartmentId}
                      >
                        <option value="">Select </option>
                        {/* {classes.map((cls, index) => (
                          <option key={index} value={cls}>
                            {cls}
                          </option>
                        ))} */}
                        {classes.length === 0 ? (
                          <option value="">No classes available</option>
                        ) : (
                          classes.map((cls) => (
                            <option
                              key={cls.class_id}
                              value={cls.class_id}
                              className="max-h-20 overflow-y-scroll "
                            >
                              {cls.name}
                            </option>
                          ))
                        )}
                      </select>
                      <div className="absolute top-9 left-1/3">
                        {fieldErrors.department_id && (
                          <span className="text-danger text-xs">
                            {fieldErrors.department_id}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="modal-footer d-flex justify-content-end"> */}
                  {/* modified code by divyani mam guidance */}
                  <div className=" flex justify-end p-3">
                    {/* <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Cancel</button> */}
                    <button
                      type="button"
                      className="btn btn-primary px-3 mb-2 "
                      style={{}}
                      onClick={handleSubmitAdd}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for editing a section */}
        {showEditModal && (
          <div
            className="modal"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="flex justify-between p-3">
                  <h5 className="modal-title">Edit Division</h5>
                  <RxCross1
                    className="float-end relative  mt-2 right-2 text-xl text-red-600 hover:cursor-pointer hover:bg-red-100"
                    type="button"
                    // className="btn-close text-red-600"
                    onClick={handleCloseModal}
                  />
                </div>
                <div
                  className=" relative  mb-3 h-1 w-[97%] mx-auto bg-red-700"
                  style={{
                    backgroundColor: "#C03078",
                  }}
                ></div>
                <div className="modal-body">
                  <div className=" relative mb-3 flex justify-center  mx-4">
                    <label htmlFor="editSectionName" className="w-1/2 mt-2">
                      Division Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={1}
                      className="form-control shadow-md mb-2"
                      id="editSectionName"
                      value={newSectionName}
                      onChange={handleChangeSectionName}
                      // onBlur={handleBlur}
                    />
                    <div className="absolute top-9 left-1/3 ">
                      {!nameAvailable && (
                        <span className=" block text-red-500 text-xs">
                          {nameError}
                        </span>
                      )}

                      {fieldErrors.name && (
                        <span className="text-danger text-xs">
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className=" relative mb-3 flex justify-center  mx-4">
                    <label htmlFor="editDepartmentId" className="w-1/2 mt-2">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="editDepartmentId"
                      className="form-control shadow-md"
                      value={className}
                      onChange={handleChangeDepartmentId}
                    >
                      <option value="">Select</option>
                      {/* {classes.map((cls, index) => (
                        <option key={index} value={cls}>
                          {cls}
                        </option>
                      ))} */}
                      {/* <option value="">--Please choose a class--</option> */}
                      {console.log("the classes", classes)}
                      {classes.length === 0 ? (
                        <option value="">No classes available</option>
                      ) : (
                        classes.map((cls) => (
                          <option key={cls.class_id} value={cls.class_id}>
                            {cls.name}
                          </option>
                        ))
                      )}
                    </select>
                    <div className="absolute top-9 left-1/3">
                      {fieldErrors.department_id && (
                        <span className="text-danger text-xs">
                          {fieldErrors.department_id}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" flex justify-end p-3">
                  {/* <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button> */}
                  <button
                    type="button"
                    // className="btn btn-primary"
                    className="btn btn-primary px-3 mb-2 "
                    style={{}}
                    onClick={handleSubmitEdit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for confirming deletion */}
        {showDeleteModal && (
          <div
            className="modal"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="flex justify-between p-3">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <RxCross1
                    className="float-end relative mt-2 right-2 text-xl text-red-600 hover:cursor-pointer hover:bg-red-100"
                    type="button"
                    // className="btn-close text-red-600"
                    onClick={handleCloseModal}
                  />
                </div>
                <div
                  className=" relative  mb-3 h-1 w-[97%] mx-auto bg-red-700"
                  style={{
                    backgroundColor: "#C03078",
                  }}
                ></div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to delete Division:{" "}
                    {currentSection.name}?
                  </p>
                </div>
                <div className=" flex justify-end p-3">
                  {/* <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button> */}
                  <button
                    type="button"
                    className="btn btn-danger px-3 mb-2"
                    style={{}}
                    onClick={handleSubmitDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DivisionList;
