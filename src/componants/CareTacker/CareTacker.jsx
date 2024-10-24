import axios from "axios";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

function CareTacker() {
  const API_URL = import.meta.env.VITE_API_URL; // url for host
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [currentStaffName, setCurrentStaffName] = useState(null);

  const [newStaffName, setNewStaffName] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 10;
  const navigate = useNavigate();
  const fetchStaffs = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_URL}/api/get_caretaker`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setStaffs(response?.data?.data);
      setPageCount(Math.ceil(response.data?.data.length / pageSize));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);
  console.log("the response of the stafflist", staffs);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // const handleEdit = (staffItem) => {
  //   setCurrentStaff(staffItem);
  //   setNewStaffName(staffItem.get_teacher.name);
  //   setNewDesignation(staffItem.get_teacher.designation);
  //   setShowEditModal(true);
  // };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setNewStaffName("");
    setNewDesignation("");
    setCurrentStaff(null);
  };

  const handleSubmitEdit = (staffItem) => {
    console.log("this is the )))))))))", staffItem.get_teacher);
    // navigate(`/editStaff/${staffItem.user_id}`
    navigate(
      `/CareTacker/edit/${staffItem.teacher_id}`,

      {
        state: { staff: staffItem },
      }
    );
  };

  const handleDelete = (staffCurrent) => {
    console.log("insise detelt");
    // const staffToDelete = staffs.find((staff) => staff.user_id === id);
    console.log("this is staffUersid", staffCurrent.teacher_id);
    setCurrentStaff(staffCurrent.teacher_id);
    setCurrentStaffName(staffCurrent.name);
    setShowDeleteModal(true);
  };
  const handleView = async (staffItem) => {
    console.log("handleview is running on");
    navigate(
      `/CareTacker/view/${staffItem.teacher_id}`,

      {
        state: { staff: staffItem },
      }
    );
  };

  const handleSubmitDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token || !currentStaff) {
        throw new Error("Caretacker ID is missing");
      }

      const response = await axios.delete(
        `${API_URL}/api/delete_caretaker/${currentStaff}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        fetchStaffs(); // Refresh staff list after successful deletion
        handleCloseModal();
        toast.success("CareTacker deleted successfully!");
      } else {
        toast.error("Failed to delete CareTacker");
      }
    } catch (error) {
      console.error("Error deleting CareTacker:", error);
      toast.error("Failed to delete CareTacker");
    }
  };

  const filteredStaffs = staffs.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedStaffs = filteredStaffs.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ToastContainer />
      <h3 className="text-white text-center mt-[30%]">Coming Soon...</h3>
    </>
  );
}

export default CareTacker;
