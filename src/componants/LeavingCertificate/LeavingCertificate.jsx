// Try UP
import { useState, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import { RxCross1 } from "react-icons/rx";

const LeavingCertificate = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classesforForm, setClassesforForm] = useState([]);
  const [studentNameWithClassId, setStudentNameWithClassId] = useState([]);
  const [classIdForSearch, setClassIdForSearch] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [nameError, setNameError] = useState("");
  const [nameErrorForClass, setNameErrorForClass] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [parentInformation, setParentInformation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingForSearch, setLoadingForSearch] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sr_no: "",
    reg_no: "",
    date: "",
    first_name: "",
    mid_name: "",
    last_name: "",
    udise_pen_no: "",
    stud_id_no: "",
    promoted_to: " ",
    School_Board: "",
    stud_id: "",
    // student_UID: "",
    father_name: "",
    mother_name: "",
    religion: "",
    caste: "",
    subcaste: "",
    birth_place: "",
    state: "",
    mother_tongue: "",
    dob: "",
    dob_words: "",
    nationality: "",
    prev_school_class: "",
    admission_date: "",
    class_when_learning: "",

    subjects: [],
    leaving_reason: "",
    lc_date_n_no: "",
    lc_date_n_school: "",
    prev_class: "",
    dobProof: "",

    stu_aadhaar_no: "",
    teacher_image_name: null,
  });

  const getYearInWords = (year) => {
    if (year < 1000 || year > 9999) return "Year Out of Range"; // Optional range limit

    const thousands = [
      "",
      "One Thousand",
      "Two Thousand",
      "Three Thousand",
      "Four Thousand",
      "Five Thousand",
      "Six Thousand",
      "Seven Thousand",
      "Eight Thousand",
      "Nine Thousand",
    ];
    const hundreds = [
      "",
      "One Hundred",
      "Two Hundred",
      "Three Hundred",
      "Four Hundred",
      "Five Hundred",
      "Six Hundred",
      "Seven Hundred",
      "Eight Hundred",
      "Nine Hundred",
    ];
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const thousandDigit = Math.floor(year / 1000);
    const hundredDigit = Math.floor((year % 1000) / 100);
    const lastTwoDigits = year % 100;

    const thousandsPart = thousands[thousandDigit];
    const hundredsPart = hundreds[hundredDigit];

    let lastTwoWords;
    if (lastTwoDigits < 10) {
      lastTwoWords = units[lastTwoDigits];
    } else if (lastTwoDigits < 20) {
      lastTwoWords = teens[lastTwoDigits - 10];
    } else {
      lastTwoWords = `${tens[Math.floor(lastTwoDigits / 10)]} ${
        units[lastTwoDigits % 10]
      }`;
    }

    return `${thousandsPart} ${hundredsPart} ${lastTwoWords}`.trim();
  };

  const getDayInWords = (day) => {
    const dayWords = [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
      "Tenth",
      "Eleventh",
      "Twelfth",
      "Thirteenth",
      "Fourteenth",
      "Fifteenth",
      "Sixteenth",
      "Seventeenth",
      "Eighteenth",
      "Nineteenth",
      "Twentieth",
      "Twenty-First",
      "Twenty-Second",
      "Twenty-Third",
      "Twenty-Fourth",
      "Twenty-Fifth",
      "Twenty-Sixth",
      "Twenty-Seventh",
      "Twenty-Eighth",
      "Twenty-Ninth",
      "Thirtieth",
      "Thirty-First",
    ];
    return dayWords[day];
  };

  const convertDateToWords = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${getDayInWords(day)} ${month} ${getYearInWords(year)}`;
  };

  // for form
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});

  // Maximum date for date_of_birth
  const MAX_DATE = "2030-12-31";
  const MIN_DATE = "1996-01-01";
  // Get today's date in YYYY-MM-DD format
  // Calculate today's date
  const today = new Date().toISOString().split("T")[0];

  // for student and class dropdown

  useEffect(() => {
    fetchInitialData(); // Fetch classes on component mount
    fetchStudentNameWithClassId();
  }, []);

  const fetchInitialData = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const classResponse = await axios.get(
        `${API_URL}/api/getallClassWithStudentCount`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClassesforForm(classResponse.data || []);
    } catch (error) {
      toast.error("Error fetching initial data.");
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const fetchStudentNameWithClassId = async (section_id = null) => {
    // setLoading(true);
    try {
      const params = section_id ? { section_id } : {};
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${API_URL}/api/getStudentListBySectionData`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        }
      );
      setStudentNameWithClassId(response?.data?.data || []);
    } catch (error) {
      toast.error("Error fetching students.");
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const classOptions = useMemo(
    () =>
      classesforForm.map((cls) => ({
        value: cls.section_id,
        label: `${cls?.get_class?.name} ${cls.name} (${cls.students_count})`,
        key: `${cls.class_id}-${cls.section_id}`,
      })),
    [classesforForm]
  );

  const studentOptions = useMemo(
    () =>
      studentNameWithClassId.map((stu) => ({
        value: stu.student_id,
        label: `${stu?.first_name} ${stu?.mid_name} ${stu.last_name}`,
      })),
    [studentNameWithClassId]
  );

  const handleClassSelect = (selectedOption) => {
    setNameErrorForClass(""); // Reset class error on selection
    setSelectedClass(selectedOption);
    setSelectedStudent(null);
    setSelectedStudentId(null);
    setClassIdForSearch(selectedOption.value);
    console.log(
      "classIdForSearch",
      classIdForSearch,
      "setSelectedClass",
      selectedClass
    );
    fetchStudentNameWithClassId(selectedOption.value);
  };

  const handleStudentSelect = (selectedOption) => {
    setNameError(""); // Reset student error on selection
    setSelectedStudent(selectedOption);
    setSelectedStudentId(selectedOption.value);
  };

  const handleSearch = async () => {
    // Reset error messages
    setNameError("");
    setNameErrorForClass("");
    setErrors({}); // Clears all field-specific errors

    // Validate if class and student are selected
    let hasError = false;

    if (!selectedClass) {
      setNameErrorForClass("Please select a class.");
      hasError = true;
    }
    if (!selectedStudent) {
      setNameError("Please select a student.");
      hasError = true;
    }

    // If there are validation errors, exit the function
    if (hasError) return;
    setFormData({
      sr_no: "",
      reg_no: "",
      date: "",
      first_name: "",

      mid_name: "",
      last_name: "",
      udise_pen_no: "",
      stud_id_no: "",
      promoted_to: " ",
      School_Board: "",
      stud_id: " ",
      // student_UID: "",
      stu_aadhaar_no: "",
      father_name: "",
      mother_name: "",
      religion: "",
      caste: "",
      subcaste: "",
      birth_place: "",
      state: "",
      mother_tongue: "",
      dob: "",
      dob_words: "",
      nationality: "",
      prev_school_class: "",
      admission_date: "",
      class_when_learning: "",

      subjects: [],
      leaving_reason: "",
      lc_date_n_no: "",
      lc_date_n_school: "",
      prev_class: "",
      dobProof: "",
      // stu_aadhaar_no: "",
      teacher_image_name: null,
    });

    try {
      setLoadingForSearch(true); // Start loading
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${API_URL}/api/get_srnoleavingcertificatedata/${selectedStudentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Check if data was received and update the form state
      if (response?.data?.data) {
        const fetchedData = response.data.data; // Extract the data

        setParentInformation(fetchedData); // Assuming response data contains parent information
        // Extract all subject names for initial selected state
        const allSubjectNames = (fetchedData.classsubject || []).map(
          (subject) => subject.name
        );
        // Populate formData with the fetched data
        setFormData({
          sr_no: fetchedData.sr_no || "",
          reg_no: fetchedData.studentinformation.reg_no || "",
          date: today || "", // Directly from the fetched data
          subjects: fetchedData.classsubject || [],
          selectedSubjects: allSubjectNames, // Initialize with all subjects checked
          // first_name: `${fetchedData.studentinformation?.first_name || ""} ${
          //   fetchedData.studentinformation?.mid_name || ""
          // } ${fetchedData.studentinformation?.last_name || ""}`,
          stud_id_no: fetchedData.studentinformation.stud_id_no || "",
          first_name: fetchedData.studentinformation.first_name || "",
          mid_name: fetchedData.studentinformation.mid_name || "",
          last_name: fetchedData.studentinformation.last_name || "",
          udise_pen_no: fetchedData.studentinformation.udise_pen_no || "",
          promoted_to: fetchedData.studentinformation.promoted_to || "",
          School_Board: fetchedData.studentinformation.School_Board || "",

          stud_id: fetchedData.studentinformation.student_id || " ",
          father_name: fetchedData.studentinformation.father_name || "",
          mother_name: fetchedData.studentinformation.mother_name || "",

          admission_date: fetchedData.studentinformation.admission_date || "",
          religion: fetchedData.studentinformation.religion || "",
          caste: fetchedData.studentinformation.caste || "",
          subcaste: fetchedData.studentinformation.subcaste || "",
          birth_place: fetchedData.studentinformation.birth_place || "", // Adjusted according to the fetched data
          state: fetchedData.studentinformation.state || "",
          mother_tongue: fetchedData.studentinformation.mother_tongue || "",
          dob: fetchedData.studentinformation.dob || "",
          dob_words: fetchedData.dobinwords || "", // Directly from fetched data
          nationality: fetchedData.studentinformation.nationality || "",
          stu_aadhaar_no: fetchedData.studentinformation.stu_aadhaar_no || "",
          teacher_image_name:
            fetchedData.studentinformation.father_image_name || null, // Assuming this is for a teacher image
          purpose: fetchedData.purpose || " ",
        });
      } else {
        toast.error("No data found for the selected student.");
      }
    } catch (error) {
      console.log("error is", error);
      toast.error("Error fetching data for the selected student.");
    } finally {
      setLoadingForSearch(false);
    }
  };
  // For FOrm
  // const validate = () => {
  //   const newErrors = {};

  //   // Validate General Register No
  //   if (!formData.reg_no) newErrors.reg_no = "General Register No is required";

  //   // Validate Date
  //   if (!formData.date) newErrors.date = "Date is required";

  //   // Validate Student Name
  //   if (!formData.first_name) newErrors.first_name = "Student Name is required";
  //   else if (!/^[^\d].*/.test(formData.first_name))
  //     newErrors.first_name = "Student Name should not start with a number";

  //   // Validate Student ID
  //   if (!formData.stud_id_no) newErrors.stud_id_no = "Student ID is required";

  //   // Validate Father's Name
  //   if (!formData.father_name)
  //     newErrors.father_name = "Father's Name is required";
  //   else if (!/^[^\d].*/.test(formData.father_name))
  //     newErrors.father_name = "Father's Name should not start with a number";

  //   // Validate Mother's Name
  //   if (!formData.mother_name)
  //     newErrors.mother_name = "Mother's Name is required";

  //   // Validate Class and Division
  //   if (!formData.class_division)
  //     newErrors.class_division = "Class and Division is required";

  //   // Validate Birth Place
  //   if (!formData.birthPlace) newErrors.birthPlace = "Birth Place is required";

  //   // Validate State
  //   if (!formData.state) newErrors.state = "State is required";

  //   // Validate Mother Tongue
  //   if (!formData.mother_tongue)
  //     newErrors.mother_tongue = "Mother Tongue is required";

  //   // Validate Date of Birth
  //   if (!formData.dob) newErrors.dob = "Date of Birth is required";

  //   // Validate Birth Date in Words
  //   if (!formData.dob_words)
  //     newErrors.dob_words = "Birth date in words is required";

  //   // Validate Nationality
  //   if (!formData.nationality)
  //     newErrors.nationality = "Nationality is required";

  //   // Validate Previous School and Class
  //   if (!formData.prev_school_class)
  //     newErrors.prev_school_class =
  //       "Previous School and Class is required";

  //   // Validate Date of Admission
  //   if (!formData.admission_date)
  //     newErrors.admission_date = "Date of Admission is required";

  //   // Validate Learning History
  //   if (!formData.class_when_learning)
  //     newErrors.class_when_learning = "Learning History is required";

  //   // Validate Progress Report
  //   if (!formData.progress)
  //     newErrors.progress = "Progress Report is required";

  //   // Validate Behavior
  //   if (!formData.behaviour) newErrors.behaviour = "Behavior is required";

  //   // Validate Reason for Leaving
  //   if (!formData.leaving_reason)
  //     newErrors.leaving_reason = "Reason for Leaving is required";

  //   // Validate Date of Leaving Certificate
  //   if (!formData.lc_date_n_no)
  //     newErrors.lc_date_n_no =
  //       "Date of Leaving Certificate is required";

  //   // Validate Aadhar Card Number
  //   if (!formData.stu_aadhaar_no)
  //     newErrors.stu_aadhaar_no = "Aadhar Card No is required";

  //   // Validate Purpose
  //   if (!formData.purpose || formData.purpose.trim() === "")
  //     newErrors.purpose = "Purpose is required";

  //   setErrors(newErrors);

  //   // Return true if no errors, false if errors exist
  //   return Object.keys(newErrors).length === 0;
  // };
  const validate = () => {
    const newErrors = {};

    // Mandatory fields validations
    const requiredFields = [
      "reg_no",
      "date",
      "first_name",
      "udise_pen_no",
      "stud_id_no",
      "promoted_to",
      "School_Board",
      "father_name",
      "mother_name",
      "birth_place",
      "state",
      "mother_tongue",
      "dob",
      "dob_words",
      "nationality",
      "prev_school_class",
      "admission_date",
      "class_when_learning",
      "leaving_reason",
      "lc_date_n_no",
      "lc_date_n_school",
      "prev_class",
      "dobProof",
      "academicYear",
      "stu_aadhaar_no",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    // Additional validations for specific fields
    if (formData.first_name && /^\d/.test(formData.first_name)) {
      newErrors.first_name = "Student Name should not start with a number";
    }

    if (formData.father_name && /^\d/.test(formData.father_name)) {
      newErrors.father_name = "Father's Name should not start with a number";
    }

    if (formData.mother_name && /^\d/.test(formData.mother_name)) {
      newErrors.mother_name = "Mother's Name should not start with a number";
    }

    setErrors(newErrors);

    // Return true if no errors, false if errors exist
    return Object.keys(newErrors).length === 0;
  };

  // Handle change for form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "dob" && { dob_words: convertDateToWords(value) }),
    }));

    let fieldErrors = {};

    // Individual field validation logic
    if (name === "first_name" && /^\d/.test(value)) {
      fieldErrors.first_name = "Student Name should not start with a number";
    }

    if (name === "father_name" && /^\d/.test(value)) {
      fieldErrors.father_name = "Father's Name should not start with a number";
    }

    if (name === "mother_name" && /^\d/.test(value)) {
      fieldErrors.mother_name = "Mother's Name should not start with a number";
    }

    // if (!value && requiredFields.includes(name)) {
    //   fieldErrors[name] = `${name.replace(/_/g, " ")} is required`;
    // }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors[name] }));
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  // let newValue = value;

  // if (name === "dob") {
  //   setFormData((prev) => ({
  //     ...prev,
  //     dob: value,
  //     dob_words: convertDateToWords(value),
  //   }));
  // } else {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }
  // // Update formData for the field
  // setFormData((prevData) => ({
  //   ...prevData,
  //   [name]: newValue,
  // }));

  //   // Field-specific validation
  //   let fieldErrors = {};

  //   // Name validation
  //   if (name === "first_name") {
  //     if (!newValue) fieldErrors.first_name = "Name is required";
  //     else if (/^\d/.test(newValue))
  //       fieldErrors.first_name = "Name should not start with a number";
  //   }
  //   if (name === "father_name") {
  //     if (!newValue) fieldErrors.father_name = "Name is required";
  //     else if (/^\d/.test(newValue))
  //       fieldErrors.father_name = "Name should not start with a number";
  //   }

  //   // Academic Qualification validation
  //   if (name === "class_division") {
  //     if (!newValue)
  //       fieldErrors.class_division = "Class and Division is required";
  //   }

  //   // Date of Birth validation
  //   if (name === "dob") {
  //     if (!newValue) fieldErrors.dob = "Date of Birth is required";
  //   }
  //   // serial number

  //   if (name === "sr_no") {
  //     if (!newValue) fieldErrors.sr_no = "Serial number is required";
  //   }
  //   if (name === "father_name") {
  //     if (!newValue) fieldErrors.father_name = "Father Name is required";
  //   }

  //   // Date of Joining validation
  //   if (name === "date") {
  //     if (!newValue) fieldErrors.date = " Date is required";
  //   }

  //   // Employee ID validation
  //   if (name === "purpose") {
  //     if (!newValue) fieldErrors.purpose = "Purpose  is required";
  //   }

  //   // Address validation
  //   if (name === "dob_words") {
  //     if (!newValue)
  //       fieldErrors.dob_words = "  Birth date in words is required";
  //   }
  //   if (name === "nationality") {
  //     if (!newValue) fieldErrors.nationality = "Nationality is required";
  //   }

  //   // Update the errors state with the new field errors
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: fieldErrors[name],
  //   }));
  // };

  const formatDateString = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  // Inside your component
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit process started");

    // Clear previous errors
    setErrors({});
    setBackendErrors({});

    // Check validation
    if (!validate()) {
      console.log("Validation failed, stopping submission");
      return;
    }

    console.log("Validation passed, proceeding with submission");

    // Format date fields and handle API submission
    const formattedFormData = {
      ...formData,
      dob: formatDateString(formData.dob),
      date: formatDateString(formData.date),
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        `${API_URL}/api/save_pdfcastebonafide`,
        formattedFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        toast.success("Cast Certificate updated successfully!");

        // Download PDF
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "BonafideCertificate.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset form data
        setFormData({
          sr_no: "",
          reg_no: "",
          date: "",
          first_name: "",
          mid_name: "",
          last_name: "",
          udise_pen_no: "",
          promoted_to: "",
          School_Board: "",
          stud_id_no: "",
          stud_id: "",
          father_name: "",
          mother_name: "",
          religion: "",
          caste: "",
          subcaste: "",
          birth_place: "",
          state: "",
          mother_tongue: "",
          dob: "",
          dob_words: "",
          nationality: "",
          prev_school_class: "",
          admission_date: "",
          class_when_learning: "",
          leaving_reason: "",
          lc_date_n_no: "",
          lc_date_n_school: "",
          prev_class: "",
          stu_aadhaar_no: "",
        });
        setSelectedClass(null);
        setSelectedStudent(null);

        setTimeout(() => setParentInformation(null), 3000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("An error occurred while updating the Cast Certificate.");

      if (error.response && error.response.data) {
        setBackendErrors(error.response.data);
      } else {
        toast.error("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add the activity if checked
      setSelectedActivities((prev) => [...prev, value]);
    } else {
      // Remove the activity if unchecked
      setSelectedActivities((prev) =>
        prev.filter((activity) => activity !== value)
      );
    }
  };

  // Log or save selectedActivities when needed
  console.log(selectedActivities);
  // Handle selection of each subject
  const handleSubjectSelection = (e, subjectName) => {
    setFormData((prevData) => {
      const updatedSelectedSubjects = e.target.checked
        ? [...prevData.selectedSubjects, subjectName] // add subject if checked
        : prevData.selectedSubjects.filter((name) => name !== subjectName); // remove subject if unchecked

      return {
        ...prevData,
        selectedSubjects: updatedSelectedSubjects,
      };
    });
  };
  console.log("handleSubjectSelection", formData.selectedSubjects);

  return <div>Coming soon...</div>;
};

export default LeavingCertificate;
