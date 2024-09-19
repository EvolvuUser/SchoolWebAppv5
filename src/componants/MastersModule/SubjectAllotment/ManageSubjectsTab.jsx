import React from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

const ManageSubjectsTab = ({
  classSection,
  nameError,
  handleChangeClassSection,
  handleSearch,
  classes,
  subjects,
  displayedSections,
  setSearchTerm,
  handleEdit,
  handleDelete,
  pageCount,
  handlePageClick,
}) => {
  return (
    <div>
      <ToastContainer />
      <div className="mb-4">
        <div className="md:w-[80%] mx-auto">
          <div className="form-group flex justify-center gap-x-1 md:gap-x-6">
            <label
              htmlFor="classSection"
              className="w-1/4 pt-2 items-center text-center"
            >
              Select Class <span className="text-red-500">*</span>
            </label>
            <div className="w-full">
              <select
                id="classSection"
                className="border w-[50%] h-10 md:h-auto rounded-md px-3 py-2 md:w-full mr-2"
                value={classSection}
                onChange={handleChangeClassSection}
              >
                <option value="">Select </option>
                {classes.map((cls) => (
                  <option key={cls.section_id} value={cls.section_id}>
                    {`${cls?.get_class?.name} ${cls?.name}`}
                  </option>
                ))}
              </select>
              {nameError && (
                <div className=" relative top-0.5 ml-1 text-danger text-xs">
                  {nameError}
                </div>
              )}{" "}
            </div>
            <button
              onClick={handleSearch}
              type="button"
              className="btn h-10  w-18 md:w-auto btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {subjects.length > 0 && (
        <div className="container mt-4">
          <div className="card mx-auto lg:w-full shadow-lg">
            <div className="card-header border-none flex justify-between items-center">
              <h3 className="text-gray-700 mt-1 text-[1.2em] lg:text-xl text-nowrap">
                Manage Subjects List
              </h3>
              <div className="w-1/2 md:w-fit mr-1 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search "
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div
              className=" relative  mb-3 h-1 w-full mx-auto bg-red-700"
              style={{
                backgroundColor: "#C03078",
              }}
            ></div>

            <div className="card-body w-full">
              <div className="h-96 lg:h-96 overflow-y-scroll lg:overflow-x-hidden">
                <table className="min-w-full leading-normal table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        S.No
                      </th>
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Class
                      </th>
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Division
                      </th>
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Subject
                      </th>
                      <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
                        Teacher
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
                    {displayedSections.map((subject, index) => (
                      <tr
                        key={subject.section_id}
                        className="text-gray-700 text-sm font-light"
                      >
                        <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
                          {subject?.get_class?.name}
                        </td>
                        <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
                          {subject?.get_division?.name}
                        </td>
                        <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
                          {subject?.get_subject?.name}
                        </td>
                        <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
                          {subject?.get_teacher?.name}
                        </td>
                        <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
                          <button
                            onClick={() => handleEdit(subject)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-transparent "
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td>
                        <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
                          <button
                            onClick={() => handleDelete(subject?.subject_id)}
                            className="text-red-600 hover:text-red-800 hover:bg-transparent "
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className=" flex justify-center pt-2 -mb-3">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjectsTab;

// // Make select only react-select above code working fine 100%

// import React from "react";
// import ReactPaginate from "react-paginate";
// import Select from "react-select";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// const customSelectStyles = {
//   control: (provided) => ({
//     ...provided,
//     minHeight: "40px", // Adjust the height as needed
//   }),
//   valueContainer: (provided) => ({
//     ...provided,
//     height: "40px", // Adjust the height as needed
//     display: "flex",
//     alignItems: "center",
//   }),
// };

// const ManageSubjectsTab = ({
//   classSection,
//   nameError,
//   handleChangeClassSection,
//   handleSearch,
//   classes,
//   subjects,
//   displayedSections,
//   setSearchTerm,
//   handleEdit,
//   handleDelete,
//   pageCount,
//   handlePageClick,
// }) => {
//   // Convert classes to the format required by react-select
//   const classOptions = classes.map((cls) => ({
//     value: cls.section_id,
//     label: `${cls?.get_class?.name} ${cls?.name}`,
//   }));

//   // Find the current selected option
//   const selectedClass =
//     classOptions.find((option) => option.value === classSection) || null;

//   return (
//     <div>
//       <div className="mb-4">
//         <div className="md:w-[80%] mx-auto">
//           <div className="form-group flex justify-center gap-x-1 md:gap-x-6">
//             <label
//               htmlFor="classSection"
//               className="w-1/4 pt-2 items-center text-center"
//             >
//               Select Class <span className="text-red-500">*</span>
//             </label>
//             <div className="w-full">
//               <Select
//                 id="classSection"
//                 styles={customSelectStyles}
//                 options={classOptions}
//                 value={selectedClass} // Set the value for the select
//                 onChange={(selectedOption) => {
//                   handleChangeClassSection(selectedOption); // Pass selectedOption, which may be null
//                 }}
//                 placeholder="Select"
//                 isClearable
//               />
//               {nameError && (
//                 <div className="relative top-0.5 ml-1 text-danger text-xs">
//                   {nameError}
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={handleSearch}
//               type="button"
//               className="btn h-10 w-18 md:w-auto btn-primary"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {subjects.length > 0 && (
//         <div className="container mt-4">
//           <div className="card mx-auto lg:w-full shadow-lg">
//             <div className="card-header flex justify-between items-center">
//               <h3 className="text-gray-700 mt-1 text-[1.2em] lg:text-xl text-nowrap">
//                 Manage Subjects List
//               </h3>
//               <div className="w-1/2 md:w-fit mr-1">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search"
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="card-body w-full">
//               <div className="h-96 lg:h-96 overflow-y-scroll lg:overflow-x-hidden">
//                 <table className="min-w-full leading-normal table-auto">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         S.No
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Class
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Division
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Subject
//                       </th>
//                       <th className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm font-semibold text-gray-900 tracking-wider">
//                         Teacher
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
//                     {displayedSections.map((subject, index) => (
//                       <tr
//                         key={subject.section_id}
//                         className="text-gray-700 text-sm font-light"
//                       >
//                         <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
//                           {index + 1}
//                         </td>
//                         <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
//                           {subject?.get_class?.name}
//                         </td>
//                         <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
//                           {subject?.get_division?.name}
//                         </td>
//                         <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
//                           {subject?.get_subject?.name}
//                         </td>
//                         <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
//                           {subject?.get_teacher?.name}
//                         </td>
//                         <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
//                           <button
//                             onClick={() => handleEdit(subject)}
//                             className="text-blue-600 hover:text-blue-800 hover:bg-transparent "
//                           >
//                             <FontAwesomeIcon icon={faEdit} />
//                           </button>
//                         </td>
//                         <td className="px-2 text-center lg:px-3 py-2 border border-gray-950 text-sm">
//                           <button
//                             onClick={() => handleDelete(subject?.subject_id)}
//                             className="text-red-600 hover:text-red-800 hover:bg-transparent "
//                           >
//                             <FontAwesomeIcon icon={faTrash} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="flex justify-center pt-2 -mb-3">
//                 <ReactPaginate
//                   previousLabel={"Previous"}
//                   nextLabel={"Next"}
//                   breakLabel={"..."}
//                   pageCount={pageCount}
//                   onPageChange={handlePageClick}
//                   containerClassName={"pagination"}
//                   pageClassName={"page-item"}
//                   pageLinkClassName={"page-link"}
//                   previousClassName={"page-item"}
//                   previousLinkClassName={"page-link"}
//                   nextClassName={"page-item"}
//                   nextLinkClassName={"page-link"}
//                   breakClassName={"page-item"}
//                   breakLinkClassName={"page-link"}
//                   activeClassName={"active"}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageSubjectsTab;
