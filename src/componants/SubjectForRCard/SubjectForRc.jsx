import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
// import NavBar from "../../../Layouts/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";

function SubjectForRc() {
  const API_URL = import.meta.env.VITE_API_URL; // url for host
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [newSectionName, setNewSectionName] = useState("");
  const [newSubjectType, setNewSubjectType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({}); // For field-specific errors
  // validations state for unique name
  const [nameAvailable, setNameAvailable] = useState(true);
  const [nameError, setNameError] = useState("");
  const pageSize = 10;

  const fetchSections = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `${API_URL}/api/subject_for_reportcard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setSections(response?.data?.subjects);
      console.log("subject_for_reportcard", response.data?.subjects);
      setPageCount(Math.ceil(response?.data?.subjects.length / pageSize));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const validateSectionName = (name) => {
    const regex = /^[a-zA-Z]+$/;
    let errors = {};
    if (!name) errors.name = "Please enter section name.";
    if (name.length > 255)
      errors.name = "The name field must not exceed 255 characters.";
    if (!regex.test(name))
      errors.name = "Please enter alphabets without space.";
    return errors;
  };
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // APi calling for check unique name
  const handleBlur = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("the response of the namechack api____", newSectionName);

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${API_URL}/api/check_section_name`,
        { name: newSectionName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("the response of the namechack api", response.data);
      if (response.data?.exists === true) {
        setNameError("Name is already taken.");
        setNameAvailable(false);
      } else {
        setNameError("");
        setNameAvailable(true);
      }
    } catch (error) {
      console.error("Error checking class name:", error);
    }
  };
  const handleEdit = (section) => {
    setCurrentSection(section);
    setNewSectionName(section.name);
    setNewSubjectType(section);

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
    setCurrentSection(null);
    setFieldErrors({}); // Clear field-specific errors when closing the modal
    setNameError("");
  };

  const handleSubmitAdd = async () => {
    const validationErrors = validateSectionName(newSectionName);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token or academic year found");
      }
      console.log("Name is:", newSectionName);

      //   const checkNameResponse = await axios.post(
      //     `${API_URL}/api/check_subject_name`,
      //     { name: newSectionName },
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //       withCredentials: true,
      //     }
      //   );

      //   if (checkNameResponse.data?.exists === true) {
      //     setNameError("Name is already taken.");
      //     setNameAvailable(false);
      //     return;
      //   } else {
      //     setNameError("");
      //     setNameAvailable(true);
      //   }
      await axios.post(
        `${API_URL}/api/subject_for_reportcard`,
        { name: newSectionName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      fetchSections();
      handleCloseModal();
      toast.success("Subject added successfully!");
    } catch (error) {
      console.error("Error adding subject:", error);
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
    const validationErrors = validateSectionName(newSectionName);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token or academic year found");
      }
      //   const nameCheckResponse = await axios.post(
      //     `${API_URL}/api/check_subject_name`,
      //     { name: newSectionName },
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //       withCredentials: true,
      //     }
      //   );

      //   if (nameCheckResponse.data?.exists === true) {
      //     setNameError("Name already taken.");
      //     setNameAvailable(false);
      //     return;
      //   } else {
      //     setNameError("");
      //     setNameAvailable(true);
      //   }
      await axios.put(
        `${API_URL}/api/subject_for_reportcard/${currentSection.sub_rc_master_id}`,
        { name: newSectionName, sequence: currentSection?.sequence },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      fetchSections();
      handleCloseModal();
      toast.success("Subject Updated successfully!");
    } catch (error) {
      console.error("Error editing Subject:", error);
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
    const sectionToDelete = sections.find((sec) => sec.sub_rc_master_id === id);
    console.log("sectionToDelete", sectionToDelete, "subjectId", id);
    setCurrentSection(sectionToDelete);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token || !currentSection || !currentSection.sub_rc_master_id) {
        throw new Error("Subject_rc_master_id  is missing");
      }

      const response = await axios.delete(
        `${API_URL}/api/subject_for_reportcard/${currentSection.sub_rc_master_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        fetchSections();
        setShowDeleteModal(false);
        setCurrentSection(null);
        toast.success("Subject deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete subject");
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
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
      name: validateSectionName(value).name,
    }));
  };

  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedSections = filteredSections.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* <NavBar /> */}
      <ToastContainer />
      <h1>commign soon..</h1>
    </>
  );
}

export default SubjectForRc;
