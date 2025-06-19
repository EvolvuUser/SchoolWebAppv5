import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RxCross1 } from "react-icons/rx";
// import Loader from "../components/Loader"; // Add a Loader component or use an existing one.
import LoaderStyle from "../common/LoaderFinal/LoaderStyle";
import Select from "react-select";

const CreateRemarkandObservationTeacher = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [allClasses, setAllClasses] = useState([]);
  const [subject, setSubject] = useState("");
  const [noticeDesc, setNoticeDesc] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state
  // const [fetchingClasses, setFetchingClasses] = useState(false); // Loader for fetching classes
  const [errors, setErrors] = useState({
    subjectError: "",
    noticeDescError: "",
    classError: "",
  });

  const [isObservation, setIsObservation] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentNameWithClassId, setStudentNameWithClassId] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [nameError, setNameError] = useState(null);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [studentError, setStudentError] = useState(null);

  const [remarkSubject, setRemarkSubject] = useState("");
  const [remarkText, setRemarkText] = useState("");

  const handleObservationToggle = (e) => {
    setIsObservation(e.target.checked);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoadingStudents(true);
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/staff_list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Staff", response);
      setStudentNameWithClassId(response?.data || []);
    } catch (error) {
      toast.error("Error fetching Teacher");
      console.error("Error fetching Teachers:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  //   const handleStudentSelect = (selectedOption) => {
  //     setStudentError(""); // Reset error if student is select.
  //     setSelectedStudent(selectedOption);
  //     setSelectedStudentId(selectedOption?.value);
  //   };

  const handleStudentSelect = (selectedOption) => {
    setSelectedStudent(selectedOption);

    setSelectedStudentId(selectedOption?.value);

    // Clear validation error
    if (selectedOption) {
      setErrors((prev) => ({ ...prev, classError: "" }));
    }
  };

  //   const studentOptions = useMemo(
  //     () =>
  //       studentNameWithClassId.map((cls) => ({
  //         value: cls?.teacher_id,
  //         label: `${cls.name}`,
  //       })),
  //     [studentNameWithClassId]
  //   );

  const studentOptions = useMemo(
    () =>
      studentNameWithClassId.map((cls) => ({
        value: cls?.teacher_id,
        label: cls?.name,
      })),
    [studentNameWithClassId]
  );

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedStudent || !selectedStudent.value) {
      errors.classError = "Please select teacher.";
    }

    if (!remarkSubject.trim()) {
      errors.subjectError = "Subject is required.";
    }

    if (!remarkText.trim()) {
      errors.remarkError = "Remark is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setSelectedStudent(null); // Resetting selected teacher
    setRemarkSubject(""); // Clearing subject input
    setRemarkText(""); // Clearing remark textarea
    setErrors({}); // Optionally clear any existing validation errors
  };

  const handleSubmit = async (isPublish = false) => {
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();

    formData.append("teacherid[]", selectedStudent?.value);
    formData.append("remark_subject", remarkSubject);
    formData.append("remark", remarkText);
    formData.append("remark_type", isObservation ? "Observation" : "Remark");

    console.log("formData:", {
      teacherid: selectedStudent?.value,
      remark_subject: remarkSubject,
      remark: remarkText,
      remark_type: isObservation ? "Observation" : "Remark",
    });

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${API_URL}/api/save_remarkforteacher`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Remark Saved successfully!");
        resetForm?.();
      } else {
        toast.error("Unexpected server response.");
      }
    } catch (error) {
      console.error("Submit Error", error);
      toast.error("Error while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePublish = async (isPublish = false) => {
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();

    formData.append("teacherid[]", selectedStudent?.value);
    formData.append("remark_subject", remarkSubject);
    formData.append("remark", remarkText);
    formData.append("remark_type", isObservation ? "Observation" : "Remark");

    console.log("formData:", {
      teacherid: selectedStudent?.value,
      remark_subject: remarkSubject,
      remark: remarkText,
      remark_type: isObservation ? "Observation" : "Remark",
    });

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${API_URL}/api/save_savenpublishremarkforteacher`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Remark Saved and Published successfully!");
        resetForm?.(); // Optional: clear form fields if this is defined
      } else {
        toast.error("Unexpected server response.");
      }
    } catch (error) {
      console.error("Submit Error", error);
      toast.error("Error while saving and Publishig.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mb-4">
        <div className="card-header flex justify-between items-center"></div>
        <div className="w-[80%] mx-auto">
          <div className="container mt-4">
            <div className="card mx-auto lg:w-full shadow-lg">
              <div className="p-2 px-3 bg-gray-100 border-none flex justify-between items-center">
                <h3 className="text-gray-700 mt-1 text-[1.2em] lg:text-xl">
                  Create Remark & Observation
                </h3>
                {/* <RxCross1
                  className="text-xl text-red-600 hover:cursor-pointer hover:bg-red-100"
                  type="button"
                /> */}
              </div>
              <div
                className="relative mb-3 h-1 w-[97%] mx-auto"
                style={{ backgroundColor: "#C03078" }}
              ></div>
              <div className="card-body w-full ml-2">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    {/* <div className="spinner-border text-primary" role="status"> */}
                    <LoaderStyle />
                    {/* </div> */}
                  </div>
                ) : (
                  // <div className="card-body w-full ml-2">
                  //   <div className="space-y-6 mr-10">
                  //     {/* Teacher Selection */}
                  //     <div className="flex flex-col md:flex-row items-start md:items-center mb-2">
                  //       <label className="w-[40%] text-[1em] text-gray-700">
                  //         Select Teacher <span className="text-red-500">*</span>
                  //       </label>
                  //       <div className="flex-1">
                  //         <Select
                  //           options={studentOptions}
                  //           value={selectedStudent}
                  //           onChange={handleStudentSelect}
                  //           className="w-full"
                  //           placeholder="Select"
                  //           isClearable
                  //         />
                  //         {errors.classError && (
                  //           <p className="text-red-500 text-sm">
                  //             {errors.classError}
                  //           </p>
                  //         )}
                  //       </div>
                  //     </div>

                  //     {/* Subject of Remark */}
                  //     <div className="flex flex-col md:flex-row items-start md:items-center">
                  //       <label className="w-[40%] text-[1em] text-gray-700">
                  //         Subject of Remark{" "}
                  //         <span className="text-red-500">*</span>
                  //       </label>
                  //       <div className="flex-1">
                  //         <input
                  //           type="text"
                  //           className="w-full px-2 py-2 border border-gray-700 rounded-md shadow-md"
                  //           value={remarkSubject}
                  //           onChange={(e) => setRemarkSubject(e.target.value)}
                  //         />
                  //         {errors.subjectError && (
                  //           <p className="text-red-500 text-sm">
                  //             {errors.subjectError}
                  //           </p>
                  //         )}
                  //       </div>
                  //     </div>

                  //     {/* Remark */}
                  //     <div className="flex flex-col md:flex-row items-start md:items-center">
                  //       <label className="w-[40%] text-[1em] text-gray-700">
                  //         Remark <span className="text-red-500">*</span>
                  //       </label>
                  //       <div className="flex-1">
                  //         <textarea
                  //           rows="3"
                  //           className="w-full px-2 py-1 border border-gray-700 rounded-md shadow-md"
                  //           value={remarkText}
                  //           onChange={(e) => setRemarkText(e.target.value)}
                  //           onKeyDown={(e) => {
                  //             if (e.key === "Enter") {
                  //               e.preventDefault();
                  //               const cursorPos = e.target.selectionStart;
                  //               const textBeforeCursor = remarkText.slice(
                  //                 0,
                  //                 cursorPos
                  //               );
                  //               const textAfterCursor =
                  //                 remarkText.slice(cursorPos);
                  //               const updatedText = `${textBeforeCursor}\n• ${textAfterCursor}`;
                  //               setRemarkText(updatedText);
                  //               setTimeout(() => {
                  //                 e.target.selectionStart =
                  //                   e.target.selectionEnd = cursorPos + 3;
                  //               }, 0);
                  //             }
                  //           }}
                  //         />
                  //         {errors.remarkError && (
                  //           <p className="text-red-500 text-sm">
                  //             {errors.remarkError}
                  //           </p>
                  //         )}

                  //         {/* Observation just below input field */}
                  //         <div className="mt-2">
                  //           <label className="inline-flex flex-col text-sm text-gray-700">
                  //             <span className="flex items-center">
                  //               <input
                  //                 type="checkbox"
                  //                 className="mr-2"
                  //                 checked={isObservation}
                  //                 onChange={handleObservationToggle}
                  //               />
                  //               Observation
                  //             </span>
                  //             <span className="text-xs text-gray-500 ml-6">
                  //               (Observation will not be shown to teachers!)
                  //             </span>
                  //           </label>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>

                  <div className="card-body w-full ml-2">
                    <div className="space-y-4 mr-10">
                      {/* Teacher Selection */}
                      <div className="flex flex-col md:flex-row items-start md:items-center mb-2">
                        <label className="w-[28%] text-[1em] text-gray-700">
                          Select Teacher <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1">
                          <Select
                            options={studentOptions}
                            value={selectedStudent}
                            onChange={handleStudentSelect}
                            className="w-[60%]"
                            placeholder="Select"
                            isClearable
                          />
                          {errors.classError && (
                            <p className="text-red-500 text-sm">
                              {errors.classError}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject of Remark */}
                      <div className="flex flex-col md:flex-row items-start md:items-center">
                        <label className="w-[28%] text-[1em] text-gray-700">
                          Subject of Remark{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1">
                          <input
                            type="text"
                            className="w-[60%] px-2 py-2 border border-gray-700 rounded-md shadow-md"
                            value={remarkSubject}
                            onChange={(e) => setRemarkSubject(e.target.value)}
                            maxLength={100}
                          />
                          {errors.subjectError && (
                            <p className="text-red-500 text-sm">
                              {errors.subjectError}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Remark */}
                      <div className="flex flex-col md:flex-row items-start md:items-center">
                        <label className="w-[28%] text-[1em] text-gray-700">
                          Remark <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1">
                          <textarea
                            rows="3"
                            className="w-[60%] px-2 py-1 border border-gray-700 rounded-md shadow-md"
                            value={remarkText}
                            maxLength={300}
                            onChange={(e) => setRemarkText(e.target.value)}
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter") {
                            //     e.preventDefault();
                            //     const cursorPos = e.target.selectionStart;
                            //     const textBeforeCursor = remarkText.slice(
                            //       0,
                            //       cursorPos
                            //     );
                            //     const textAfterCursor =
                            //       remarkText.slice(cursorPos);
                            //     const updatedText = `${textBeforeCursor}\n• ${textAfterCursor}`;
                            //     setRemarkText(updatedText);
                            //     setTimeout(() => {
                            //       e.target.selectionStart =
                            //         e.target.selectionEnd = cursorPos + 3;
                            //     }, 0);
                            //   }
                            // }}
                          />
                          {errors.remarkError && (
                            <p className="text-red-500 text-sm">
                              {errors.remarkError}
                            </p>
                          )}

                          {/* Observation */}
                          <div className="mt-2">
                            <label className="inline-flex flex-col text-sm text-gray-700">
                              <span className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  checked={isObservation}
                                  onChange={handleObservationToggle}
                                />
                                Observation
                              </span>
                              <span className="text-xs text-gray-500 ml-6">
                                (Observation will not be shown to teachers!)
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {!loading && (
                <div className="flex space-x-2 justify-end mb-2 mr-2">
                  <button
                    onClick={() => handleSubmit(false)}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleSavePublish(true)}
                    className="btn btn-primary"
                    disabled={isObservation}
                  >
                    Save & Publish
                  </button>
                  <button
                    onClick={resetForm}
                    className="btn btn-danger bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRemarkandObservationTeacher;
