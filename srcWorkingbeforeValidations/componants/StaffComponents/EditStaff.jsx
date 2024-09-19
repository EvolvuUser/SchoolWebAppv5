// // fINAL TRY UP
// import React, { useState, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { RxCross1 } from "react-icons/rx";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function EditStaff() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { staff } = location.state || {};
//   console.log("Staff is in edit form", staff);
//   const [formData, setFormData] = useState({
//     employee_id: "",
//     name: "",
//     father_spouse_name: "",
//     birthday: "",
//     date_of_joining: "",
//     sex: "",
//     religion: "",
//     blood_group: "",
//     address: "",
//     phone: "",
//     email: "",
//     designation: "",
//     academic_qual: [],
//     professional_qual: "",
//     special_sub: "",
//     trained: "",
//     experience: "",
//     aadhar_card_no: "",
//     teacher_image_name: null,
//   });
//   const [errors, setErrors] = useState({});
//   const [photoPreview, setPhotoPreview] = useState(null);

//   const staffi = staff.get_teacher;
//   console.log("staff is in edit form_____", staffi);
//   useEffect(() => {
//     if (staff) {
//       setFormData({
//         employee_id: staff.get_teacher.employee_id || "",
//         name: staff.get_teacher.name || "",
//         father_spouse_name: staff.get_teacher.father_spouse_name || "",
//         birthday: staff.get_teacher.birthday || "",
//         date_of_joining: staff.get_teacher.date_of_joining || "",
//         sex: staff.get_teacher.sex || "",
//         religion: staff.get_teacher.religion || "",
//         blood_group: staff.get_teacher.blood_group || "",
//         address: staff.get_teacher.address || "",
//         phone: staff.get_teacher.phone || "",
//         email: staff.get_teacher.email || "",
//         designation: staff.get_teacher.designation || "",
//         academic_qual: staff.get_teacher.academic_qual
//           ? staff.get_teacher.academic_qual.split(",")
//           : [],
//         professional_qual: staff.get_teacher.professional_qual || "",
//         special_sub: staff.get_teacher.special_sub || "",
//         trained: staff.get_teacher.trained || "",
//         experience: staff.get_teacher.experience || "",
//         aadhar_card_no: staff.get_teacher.aadhar_card_no || "",
//         teacher_image_name: staff.get_teacher.teacher_image_name || null,
//       });
//       if (staff.get_teacher.teacher_image_name) {
//         setPhotoPreview(
//           `${API_URL}/path/to/images/${staff.get_teacher.teacher_image_name}`
//         );
//       }
//     }
//   }, [staff, API_URL]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.birthday) newErrors.birthday = "Date of Birth is required";
//     if (!formData.date_of_joining)
//       newErrors.date_of_joining = "Date of Joining is required";
//     if (!formData.sex) newErrors.sex = "Gender is required";
//     if (!formData.address) newErrors.address = "Address is required";
//     if (!formData.phone) newErrors.phone = "Phone number is required";
//     if (!/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Phone number must be 10 digits";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email address is invalid";
//     if (!formData.designation)
//       newErrors.designation = "Designation is required";
//     if (!formData.employee_id)
//       newErrors.employee_id = "Employee ID is required";
//     return newErrors;
//   };

//   const handleChange = (event) => {
//     const { name, value, checked } = event.target;

//     if (name === "academic_qual") {
//       setFormData((prevData) => {
//         if (checked) {
//           return {
//             ...prevData,
//             academic_qual: [...prevData.academic_qual, value],
//           };
//         } else {
//           return {
//             ...prevData,
//             academic_qual: prevData.academic_qual.filter(
//               (qualification) => qualification !== value
//             ),
//           };
//         }
//       });
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFormData((prevState) => ({
//       ...prevState,
//       teacher_image_name: file,
//     }));
//     setPhotoPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const formattedFormData = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "academic_qual") {
//         formattedFormData.append(key, formData[key].join(","));
//       } else {
//         formattedFormData.append(key, formData[key]);
//       }
//     });

//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         throw new Error("No authentication token is found");
//       }
//       const response = await axios.put(
//         `${API_URL}/api/teachers/${staff.get_teacher.teacher_id}`,
//         formattedFormData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success("Teacher updated successfully!");
//         navigate("/StaffList");
//       }
//     } catch (error) {
//       toast.error("An error occurred while updating the teacher.");
//       console.error("Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 ">
//       <ToastContainer />
//       <div className="card p-4 rounded-md ">
//         <div className=" card-header mb-4 flex justify-between items-center ">
//           <h5 className="text-gray-700 mt-1 text-md lg:text-lg">
//             Edit Staff Form
//           </h5>

//           <RxCross1
//             className="float-end relative right-2 text-xl text-red-600 hover:cursor-pointer hover:bg-red-100"
//             onClick={() => {
//               navigate("/StaffList");
//             }}
//           />
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className="  md:mx-5 overflow-x-hidden shadow-md p-2 bg-gray-50"
//         >
//           <div className=" flex flex-col gap-4 md:grid  md:grid-cols-3 md:gap-x-14 md:mx-10 gap-y-1">
//             <div className=" mx-auto      ">
//               <label
//                 htmlFor="teacher_image_name"
//                 className="block font-bold  text-xs mb-2"
//               >
//                 Photo
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt="Photo Preview"
//                     className="   h-20 w-20 rounded-[50%] mx-auto border-1  border-black object-cover"
//                   />
//                 ) : (
//                   <FaUserCircle className="mt-2 h-20 w-20 object-cover mx-auto text-gray-300" />
//                 )}
//               </label>
//               <input
//                 type="file"
//                 id="teacher_image_name"
//                 name="teacher_image_name"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner text-xs box-border mt-2 bg-black text-white  "
//               />
//             </div>
//             <div className="col-span-1">
//               <label
//                 htmlFor="academic_qual"
//                 className="block font-bold  text-xs mb-2"
//               >
//                 Academic Qualification
//               </label>
//               <div className="flex flex-wrap ">
//                 {[
//                   "Hsc",
//                   "DCE",
//                   "B.A",
//                   "B.Com",
//                   "B.Sc",
//                   "BCS",
//                   "BCA",
//                   "B.LIS",
//                   "BPharm",
//                   "BE",
//                   "B.Music n Dance",
//                   "M.A",
//                   "MSE",
//                   "M.Com",
//                   "M.Sc",
//                   "MCA",
//                   "M.LIS",
//                   "M.Phil",
//                   "MBA",
//                   "PGDBM",
//                 ].map((qualification) => (
//                   <label
//                     key={qualification}
//                     className="flex items-center mr-4 text-sm font-md"
//                   >
//                     <input
//                       type="checkbox"
//                       name="academic_qual"
//                       value={qualification}
//                       checked={formData.academic_qual.includes(qualification)}
//                       onChange={handleChange}
//                       className="mr-1 "
//                     />
//                     {qualification}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="address"
//                 className="block font-bold  text-xs mb-2"
//               >
//                 Address <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner resize block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
//                 rows="4"
//                 required
//               />
//               {errors.address && (
//                 <p className="text-red-500 text-xs ">{errors.address}</p>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
//             {[
//               { label: "Employee ID", name: "employee_id", type: "text" },
//               { label: "Name", name: "name", type: "text" },
//               {
//                 label: "Father/Spouse Name",
//                 name: "father_spouse_name",
//                 type: "text",
//               },
//               { label: "Date of Birth", name: "birthday", type: "date" },
//               {
//                 label: "Date of Joining",
//                 name: "date_of_joining",
//                 type: "date",
//               },
//               {
//                 label: "Gender",
//                 name: "sex",
//                 type: "select",
//                 options: ["", "Male", "Female", "Other"],
//               },
//               { label: "Religion", name: "religion", type: "text" },
//               { label: "Blood Group", name: "blood_group", type: "text" },
//               { label: "Phone", name: "phone", type: "text" },
//               { label: "Email", name: "email", type: "email" },
//               { label: "Designation", name: "designation", type: "text" },
//               {
//                 label: "Professional Qualification",
//                 name: "professional_qual",
//                 type: "text",
//               },
//               { label: "Special Subject", name: "special_sub", type: "text" },
//               { label: "Trained", name: "trained", type: "text" },
//               { label: "Experience", name: "experience", type: "text" },
//               {
//                 label: "Aadhar Card Number",
//                 name: "aadhar_card_no",
//                 type: "text",
//               },
//             ].map((field) => (
//               <div key={field.name}>
//                 <label
//                   htmlFor={field.name}
//                   className="block font-bold  text-xs mb-2"
//                 >
//                   {field.label}{" "}
//                   {field.label !== "Gender" &&
//                   field.label !== "Father/Spouse Name" &&
//                   field.label !== "Religion" &&
//                   field.label !== "Blood Group" &&
//                   field.label !== "Professional Qualification" &&
//                   field.label !== "Special Subject" &&
//                   field.label !== "Trained" &&
//                   field.label !== "Experience" &&
//                   field.label !== "Aadhar Card Number" ? (
//                     <span className="text-red-500">*</span>
//                   ) : null}
//                 </label>
//                 {field.type === "select" ? (
//                   <select
//                     id={field.name}
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner  w-full"
//                     required
//                   >
//                     {field.options.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     type={field.type}
//                     id={field.name}
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner  w-full"
//                     required={
//                       field.label !== "Father/Spouse Name" &&
//                       field.label !== "Religion" &&
//                       field.label !== "Blood Group" &&
//                       field.label !== "Professional Qualification" &&
//                       field.label !== "Special Subject" &&
//                       field.label !== "Trained" &&
//                       field.label !== "Experience" &&
//                       field.label !== "Aadhar Card Number"
//                     }
//                   />
//                 )}
//                 {errors[field.name] && (
//                   <p className="text-red-500 text-xs ">{errors[field.name]}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="col-span-3  text-right">
//             <button
//               type="submit"
//               style={{ backgroundColor: "#2196F3" }}
//               className=" text-white font-bold py-1 border-1 border-blue-500 px-4 rounded"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditStaff;

// second try up
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageCropper from "../common/ImageUploadAndCrop";

function EditStaff() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { staff } = location.state || {};
  console.log("Staff is in edit form***", staff);

  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    father_spouse_name: "",
    birthday: "",
    date_of_joining: "",
    sex: "",
    religion: "",
    blood_group: "",
    address: "",
    phone: "",
    email: "",
    designation: "",
    academic_qual: [],
    professional_qual: "",
    class_teacher_of: "",
    trained: "",
    experience: "",
    aadhar_card_no: "",
    teacher_image_name: null,
    class_id: "",
    section_id: "",
    isDelete: "N",
    role_id: "", // Ensure it's a string or empty
  });
  // console.log("the formdata set", formData);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  console.log("employeeID", staff.employeeId);
  useEffect(() => {
    if (staff) {
      setFormData({
        employee_id: staff.employee_id || "NA",
        name: staff.name || "",
        father_spouse_name: staff.father_spouse_name || "",
        birthday: staff.birthday || "",
        date_of_joining: staff.date_of_joining || "",
        sex: staff.sex || "",
        religion: staff.religion || "",
        blood_group: staff.blood_group || "",
        address: staff.address || "",
        phone: staff.phone || "",
        email: staff.email || "",
        designation: staff.designation || "",
        academic_qual: staff.academic_qual
          ? staff.academic_qual.split(",")
          : [],
        professional_qual: staff.professional_qual || "",
        special_sub: staff.special_sub || "",
        trained: staff.trained || "",
        experience: staff.experience || "",
        aadhar_card_no: staff.aadhar_card_no || "",
        teacher_image_name: staff.teacher_image_name || null,
        class_id: staff.class_id || "",
        section_id: staff.section_id || "",
        isDelete: staff.isDelete || "N",
        role_id: staff.role_id || "", // Ensure it's a string or empty
      });
      if (staff.teacher_image_name) {
        setPhotoPreview(
          `${API_URL}/path/to/images/${staff.teacher_image_name}`
        );
      }
    }
  }, [staff, API_URL]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.birthday) newErrors.birthday = "Date of Birth is required";
    if (!formData.date_of_joining)
      newErrors.date_of_joining = "Date of Joining is required";
    if (!formData.sex) newErrors.sex = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.employee_id)
      newErrors.employee_id = "Employee ID is required";
    if (formData.academic_qual.length === 0)
      newErrors.academic_qual =
        "Please select at least one academic qualification";
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "academic_qual") {
      setFormData((prevData) => {
        if (checked) {
          return {
            ...prevData,
            academic_qual: [...prevData.academic_qual, value],
          };
        } else {
          return {
            ...prevData,
            academic_qual: prevData.academic_qual.filter(
              (qualification) => qualification !== value
            ),
          };
        }
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        teacher_image_name: file,
      }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     teacher_image_name: file,
  //   }));
  //   setPhotoPreview(URL.createObjectURL(file));
  // };

  // Image Croping funtionlity
  const handleImageCropped = (croppedImageData) => {
    setFormData((prevData) => ({
      ...prevData,
      teacher_image_name: croppedImageData,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Convert formData to the format expected by the API
    const formattedFormData = {
      ...formData,
      academic_qual: formData.academic_qual, // Ensure this is an array
      experience: String(formData.experience), // Ensure this is a string
      teacher_image_name: String(formData.teacher_image_name),
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token is found");
      }
      console.log("the inseid edata of edit staff", formattedFormData);
      const response = await axios.put(
        `${API_URL}/api/teachers/${staff.teacher_id}`,
        formattedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Teacher updated successfully!");
        setTimeout(() => {
          navigate("/StaffList");
        }, 3000);
      }
    } catch (error) {
      toast.error("An error occurred while updating the teacher.");
      console.error("Error:", error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        // setErrors(error.response.data.errors);
        setErrors(error.response.data.errors || {});
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <ToastContainer />
      <div className="card p-4 rounded-md ">
        <div className=" card-header mb-4 flex justify-between items-center ">
          <h5 className="text-gray-700 mt-1 text-md lg:text-lg">
            Edit Staff information
          </h5>

          <RxCross1
            className="float-end relative right-2 text-xl text-red-600 hover:cursor-pointer hover:bg-red-100"
            onClick={() => {
              navigate("/StaffList");
            }}
          />
        </div>
        <p className="  md:absolute md:right-10  md:top-[10%]   text-gray-500 ">
          <span className="text-red-500">*</span>indicates mandatory information
        </p>
        <form
          onSubmit={handleSubmit}
          className="  md:mx-5 overflow-x-hidden shadow-md p-2 bg-gray-50"
        >
          <div className=" flex flex-col gap-4 md:grid  md:grid-cols-3 md:gap-x-14 md:mx-10 gap-y-1">
            {/* Previous image code */}
            {/* <div className=" mx-auto      ">
              <label
                htmlFor="teacher_image_name"
                className="block font-bold  text-xs mb-2"
              >
                Photo{" "}
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Photo Preview"
                    className="   h-20 w-20 rounded-[50%] mx-auto border-1  border-black object-cover"
                  />
                ) : (
                  <FaUserCircle className="mt-2 h-20 w-20 object-cover mx-auto text-gray-300" />
                )}
              </label>
              <input
                type="file"
                id="teacher_image_name"
                name="teacher_image_name"
                accept="image/*"
                onChange={handleFileChange}
                className="input-field text-xs box-border mt-2 bg-black text-white  "
              />
            </div> */}
            <div className=" mx-auto      ">
              {/* {console.log("imagepreview",photoPreview)} */}
              <ImageCropper
                photoPreview={photoPreview}
                onImageCropped={handleImageCropped}
              />

              {/* <label htmlFor="photo" className="block font-bold  text-xs mb-2">
                Photo
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Photo Preview"
                    className="   h-20 w-20 rounded-[50%] mx-auto border-1  border-black object-cover"
                  />
                ) : (
                  <FaUserCircle className="mt-2 h-20 w-20 object-cover mx-auto text-gray-300" />
                )}
                <ImageCropper onImageCropped={handleImageCropped} />
              </label> */}
              {/* <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="input-field text-xs box-border mt-2 bg-black text-white  "
              /> */}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="academic_qual"
                className="block font-bold  text-xs mb-2"
              >
                Academic Qualification <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap ">
                {[
                  "Hsc",
                  "DCE",
                  "B.A",
                  "B.Com",
                  "B.Sc",
                  "BCS",
                  "BCA",
                  "B.LIS",
                  "BPharm",
                  "BE",
                  "B.Music n Dance",
                  "M.A",
                  "MSE",
                  "M.Com",
                  "M.Sc",
                  "MCA",
                  "M.LIS",
                  "M.Phil",
                  "MBA",
                  "PGDBM",
                ].map((qualification) => (
                  <label
                    key={qualification}
                    className="flex items-center mr-4 text-sm font-md"
                  >
                    <input
                      type="checkbox"
                      name="academic_qual"
                      value={qualification}
                      checked={formData.academic_qual.includes(qualification)}
                      onChange={handleChange}
                      className="mr-2"
                      title="please check atleast one box to move futher"
                    />
                    {qualification}
                  </label>
                ))}
              </div>
              {errors.academic_qual && (
                <span className="text-red-500 text-xs">
                  {errors.academic_qual}
                </span>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="address"
                className="block font-bold  text-xs mb-2"
              >
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">{errors.address}</span>
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="name" className="block font-bold  text-xs mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                pattern="^[^\d].*"
                title="Name should not start with a number"
                required
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">{errors.name}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="trained"
                className="block font-bold  text-xs mb-2"
              >
                Training Status <span className="text-red-500">*</span>
              </label>
              <select
                id="trained"
                name="trained"
                value={formData.trained}
                onChange={handleChange}
                required
                title="Please enter Training Status "
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              >
                <option className="bg-gray-300" value="">
                  Select
                </option>{" "}
                <option value="trained-PGT">trained-PGT</option>
                <option value="trained-TGT">trained-TGT</option>{" "}
                <option value="trained-PRT">trained-PRT</option>
                <option value="NTT">NTT</option>
                <option value="ECCE">ECCE</option>
                <option value="Untrained">Untrained</option>
                <option value="NA">NA</option>
                {/* Add training status options here */}
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="block font-bold  text-xs mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex ">
                <span className=" rounded-l-md pt-1 bg-gray-200 text-black font-bold px-2 pointer-events-none ml-1">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="\d{10}"
                  maxLength="10"
                  title="Please enter only 10 digit number "
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field block w-full border border-gray-300 outline-none  rounded-r-md py-1 px-3 bg-white shadow-inner "
                  required
                />
                {errors.phone && (
                  <span className="error">{errors.phone[0]}</span>
                )}
                {errors.phone && (
                  <span className="text-red-500 text-xs">{errors.phone}</span>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="birthday"
                className="block font-bold  text-xs mb-2"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.birthday && (
                <span className="text-red-500 text-xs">{errors.birthday}</span>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="experience"
                className="block font-bold  text-xs mb-2"
              >
                Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                maxLength={3}
                id="experience"
                name="experience"
                value={formData.experience}
                placeholder="in year"
                onChange={handleChange}
                required
                title="Only enter digits in year like 1 or 5"
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="block font-bold  text-xs mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                title="Please enter a valid email address that ends with @gmail.com"
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.email && (
                <span className="error text-red-500 text-xs">
                  {errors.email[0]}
                </span>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="date_of_joining"
                className="block font-bold  text-xs mb-2"
              >
                Date of Joining <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date_of_joining"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleChange}
                required
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.date_of_joining && (
                <span className="text-red-500 text-xs">
                  {errors.date_of_joining}
                </span>
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="sex" className="block font-bold  text-xs mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              {errors.sex && (
                <span className="text-red-500 text-xs">{errors.sex}</span>
              )}
            </div>
            <div className="col-span-1">
              <label
                htmlFor="class_teacher_of"
                className="block font-bold  text-xs mb-2"
              >
                Class teacher of
              </label>
              <input
                type="text"
                id="class_teacher_of"
                name="class_teacher_of"
                readOnly
                value={formData.class_teacher_of}
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
            </div>
            {/* <div>
              <label htmlFor="role" className="block font-bold  text-xs mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
                required
              >
                <option className="bg-gray-300" value="">
                  Select
                </option>
                <option value="A">Admin</option>
                <option value="B">Bus</option>
                <option value="E">Data Entry</option>
                <option value="F">Finance</option>
                <option value="L">Librarian</option>
                <option value="M">Management</option>
                <option value="N">Printer</option>
                <option value="O">owner</option>
                <option value="R">Support</option>
                <option value="T">Teacher</option>
                <option value="X">Support Staff</option>
                <option value="Y">Security</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs">{errors.role}</p>
              )}
            </div> */}
            <div className="col-span-1">
              <label
                htmlFor="designation"
                className="block font-bold  text-xs mb-2"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.designation && (
                <span className="text-red-500 text-xs">
                  {errors.designation}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="blood_group"
                className="block font-bold  text-xs mb-2"
              >
                Blood Group
              </label>
              <select
                id="blood_group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              >
                <option className="bg-gray-300" value="">
                  Select
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="aadhar_card_no"
                className="block font-bold  text-xs mb-2"
              >
                Aadhaar Card No.
              </label>
              <input
                type="tel"
                maxLength={12}
                id="aadhar_card_no"
                name="aadhar_card_no"
                value={formData.aadhar_card_no}
                pattern="\d{12}"
                title="Aadhaar Card Number must be exactly 12 digits number "
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.aadhar_card_no && (
                <span className="text-red-500 text-xs">
                  {errors.aadhar_card_no[0]}
                </span>
              )}
            </div>
            <div>
              <div>
                <label
                  htmlFor="professional_qual"
                  className="block font-bold  text-xs mb-2"
                >
                  Professional Qualification
                </label>
                <select
                  id="professional_qual"
                  name="professional_qual"
                  value={formData.professional_qual}
                  onChange={handleChange}
                  className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
                >
                  <option className="bg-gray-300" value="">
                    Select
                  </option>
                  <option value="D.Ed">D.Ed</option>
                  <option value="B.Ed">B.Ed</option>
                  <option value="B.P.Ed">B.P.Ed</option>
                  <option value="M.P.Ed">M.P.Ed</option>
                  <option value="M.Ed">M.Ed</option>
                  <option value="NA">NA</option>
                  {/* Add professional qualification options here */}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="religion"
                className="block font-bold  text-xs mb-2"
              >
                Religion
              </label>
              <select
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              >
                <option className="bg-gray-300" value="">
                  Select
                </option>{" "}
                <option value="Hindu">Hindu</option>
                <option value="Christian">Christian</option>{" "}
                <option value="Muslim">Muslim</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
                <option value="Buddhist">Buddhist</option>
                <option value="NA">NA</option>
                {/* Add training status options here */}
              </select>
            </div>
            {/* <div className="col-span-1">
              <label
                htmlFor="religion"
                className="block font-bold  text-xs mb-2"
              >
                Religion
              </label>
              <input
                type="text"
                id="religion"
                name="religion"
                placeholder="Christian"
                value={formData.religion}
                onChange={handleChange}
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
            </div> */}

            <div className="col-span-1">
              <label
                htmlFor="employee_id"
                className="block font-bold  text-xs mb-2"
              >
                Employee ID <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                maxLength={5}
                id="employee_id"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
              {errors.employee_id && (
                <span className="text-red-500 text-xs">
                  {errors.employee_id}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="special_sub"
                className="block font-bold  text-xs mb-2"
              >
                Special Subject
              </label>
              <input
                type="text"
                id="special_sub"
                name="special_sub"
                // value={formData.special_sub}
                onChange={handleChange}
                placeholder="Special Subject for D.Ed/B.Ed"
                className="input-field block w-full border border-gray-300 rounded-md py-1 px-3 bg-white shadow-inner"
              />
            </div>
          </div>
          <div className="col-span-3 md:mr-9 my-2 text-right">
            <button
              type="submit"
              style={{ backgroundColor: "#2196F3" }}
              className=" text-white font-bold py-1 border-1 border-blue-500 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStaff;
