// import { useState, useEffect } from "react";
// import LoaderStyle from "../../common/LoaderFinal/LoaderStyle";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function CommonTable({
//   periods,
//   subjects,
//   loading,
//   selectedSubjects,
//   handleTableData,
//   activeTab,
//   tabs,
//   rowCounts,
//   allocatedPeriods,
//   usedPeriods,
//   setUsedPeriods,
//   classSectionNames,
//   onOverrideChange,
// }) {
//   const [localSelectedSubjects, setLocalSelectedSubjects] = useState({});
//   const [globalSubjectSelection, setGlobalSubjectSelection] = useState({});
//   // This is test
//   const [hoverInfo, setHoverInfo] = useState({
//     show: false,
//     x: 0,
//     y: 0,
//     items: [], // array of { subject, teacher }
//   });

//   const [modalInfo, setModalInfo] = useState({
//     show: false,
//     subject: "",
//     teacher: "",
//   });

//   const showOverrideConfirmToast = (day, period_no, selectedSub) => {
//     toast.info(
//       <div
//         style={{
//           maxWidth: "600px",
//           width: "100%",
//           padding: "20px",
//           fontFamily: "'Segoe UI', sans-serif",
//           borderRadius: "8px",
//           boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
//           backgroundColor: "#fff",
//           textAlign: "center",
//           margin: "0 auto",
//           position: "relative",
//         }}
//       >
//         {/* ❌ Close Button */}
//         <button
//           onClick={() => toast.dismiss()}
//           style={{
//             position: "absolute",
//             top: "1px",
//             right: "5px",
//             background: "transparent",
//             border: "none",
//             fontSize: "18px",
//             // fontWeight: "medium",
//             color: "red",
//             cursor: "pointer",
//           }}
//           aria-label="Close"
//         >
//           ✖
//         </button>
//         <p
//           style={{ fontSize: "0.95em", marginBottom: "16px", color: "#1f2937" }}
//         >
//           <strong>Subject is already allotted for this period.</strong>
//           <br />
//           What would you like to do?
//         </p>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "8px",

//             flexWrap: "wrap",
//           }}
//           className="flex justify-center gap-2"
//         >
//           <button
//             onClick={() => {
//               toast.dismiss();
//               onOverrideChange?.(day, period_no, "N");
//               applySubjectChange(day, period_no, selectedSub);
//             }}
//             className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
//           >
//             ➕ Add subject
//           </button>

//           <button
//             onClick={() => {
//               toast.dismiss();
//               onOverrideChange?.(day, period_no, "Y");
//               applySubjectChange(day, period_no, selectedSub);
//             }}
//             className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#dc2626")}
//           >
//             🗑 Overwrite subject(s)
//           </button>
//         </div>
//       </div>,
//       {
//         position: "top-center",
//         autoClose: false,
//         closeOnClick: false,
//         closeButton: false,
//         draggable: false,
//         pauseOnHover: true,
//         style: {
//           background: "transparent", // ensures no box is added around
//           boxShadow: "none",
//         },
//       }
//     );
//   };

//   const activeTabData = tabs.find((tab) => tab.id === activeTab);
//   const classId = activeTabData?.class_id;
//   const sectionId = activeTabData?.section_id;
//   const key = `${classId}-${sectionId}`;

//   // Sync local & global selections
//   useEffect(() => {
//     setLocalSelectedSubjects(selectedSubjects[key] || {});
//   }, [selectedSubjects, key]);

//   useEffect(() => {
//     if (Object.keys(localSelectedSubjects).length) {
//       setGlobalSubjectSelection((prev) => ({
//         ...prev,
//         [key]: localSelectedSubjects,
//       }));
//     }
//   }, [localSelectedSubjects, key]);

//   const applySubjectChange = (day, period_no, selectedSubject) => {
//     const cur = localSelectedSubjects?.[day]?.[period_no];
//     const updated = {
//       ...localSelectedSubjects,
//       [day]: {
//         ...localSelectedSubjects[day],
//         [period_no]: selectedSubject.id
//           ? { id: selectedSubject.id, name: selectedSubject.name }
//           : null,
//       },
//     };
//     setUsedPeriods((prev) => {
//       const wasEmpty = !cur?.id;
//       const nowEmpty = !selectedSubject.id;

//       if (wasEmpty && !nowEmpty) return prev + 1;
//       if (!wasEmpty && nowEmpty) return Math.max(prev - 1, 0); // ✅ Prevent negative
//       return prev;
//     });
//     // setUsedPeriods((prev) =>
//     //   selectedSubject.id ? (cur ? prev : prev + 1) : cur ? prev - 1 : prev
//     // );

//     setLocalSelectedSubjects(updated);
//     setGlobalSubjectSelection((prev) => ({ ...prev, [key]: updated[day] }));
//     handleTableData(classId, sectionId, day, period_no, selectedSubject);
//   };

//   const handleSubjectChange = (day, period_no, selectedSubject) => {
//     if (!classId || !sectionId) return;

//     const current = localSelectedSubjects?.[day]?.[period_no];

//     // STEP 1: Check another section
//     const inOther = Object.entries(globalSubjectSelection).some(
//       ([sec, data]) => {
//         return sec !== key && data?.[day]?.[period_no]?.id;
//       }
//     );
//     if (selectedSubject.id && inOther) {
//       const conflictKey = Object.keys(globalSubjectSelection).find(
//         (sec) =>
//           sec !== key && globalSubjectSelection[sec]?.[day]?.[period_no]?.id
//       );
//       const confSecName = conflictKey
//         ? classSectionNames[conflictKey.split("-")[1]]
//         : "another section";
//       toast.error(
//         <div>
//           <strong style={{ color: "#e74c3c" }}>
//             Subject already selected in another section ({confSecName})
//           </strong>
//           <br />
//           <span style={{ color: "#2980b9" }}>
//             for {day}, Period {period_no}.
//           </span>
//         </div>,
//         { position: "top-right", autoClose: 5000 }
//       );
//       return; // Block here
//     }

//     // STEP 2: Same-section override logic
//     const assignedName =
//       periods.find((p) => p.day === day && p.period_no === period_no)
//         ?.subject_id || "";
//     const assignedTeacher =
//       periods.find((p) => p.day === day && p.period_no === period_no)
//         ?.teachers || "";
//     const rowHasAssignment = assignedName.trim() && assignedTeacher.trim();

//     if (rowHasAssignment && selectedSubject.id) {
//       showOverrideConfirmToast(day, period_no, selectedSubject);
//       return; // Wait for user decision
//     }

//     // STEP 3: Normal apply
//     onOverrideChange?.(day, period_no, selectedSubject.id ? "Y" : "N");
//     applySubjectChange(day, period_no, selectedSubject);
//   };

//   const renderRows = (days) => {
//     const rows = [];
//     const maxRows = Math.max(rowCounts.mon_fri, rowCounts.sat);

//     for (let r = 0; r < maxRows; r++) {
//       rows.push(
//         <tr key={r}>
//           <td className="border p-2 bg-gray-100 text-center w-16">{r + 1}</td>

//           {days.map((day) => {
//             // 👉 Skip rendering for Saturday if period exceeds allowed
//             if (day === "Saturday" && r >= rowCounts.sat) {
//               return <td key={day} className="border p-2 bg-gray-50"></td>;
//             }

//             // 👉 Skip rendering for Mon–Fri if period exceeds allowed
//             if (day !== "Saturday" && r >= rowCounts.mon_fri) {
//               return <td key={day} className="border p-2 bg-gray-50"></td>;
//             }

//             const sel = localSelectedSubjects[day]?.[r + 1];
//             const periodData =
//               periods.find((p) => p.day === day && p.period_no === r + 1) || {};
//             const subjectName = periodData.subject_id || "";
//             const teacherName = periodData.teachers || "";

//             const onChange = (e) => {
//               const val = e.target.value;
//               const sub = {
//                 id: val,
//                 name: subjects.find((s) => s.sm_id === val)?.subjectname || "",
//               };
//               handleSubjectChange(day, r + 1, sub);
//             };

//             const inOther = Object.entries(globalSubjectSelection).some(
//               ([sec, data]) => sec !== key && data?.[day]?.[r + 1]?.id
//             );

//             return (
//               <td key={day} className="border p-2 text-center  relative">
//                 {subjectName && (
//                   <div
//                     className="text-pink-600 cursor-pointer text-[.75em]"
//                     onMouseEnter={(e) => {
//                       const subjectList = subjectName
//                         .split(",")
//                         .map((s) => s.trim());
//                       const teacherList = teacherName
//                         .split(",")
//                         .map((t) => t.trim());
//                       const items = subjectList.map((sub, idx) => ({
//                         subject: sub,
//                         teacher: teacherList[idx] || "",
//                       }));
//                       setHoverInfo({
//                         show: true,
//                         x: e.clientX,
//                         y: e.clientY,
//                         items,
//                       });
//                     }}
//                     onMouseLeave={() =>
//                       setHoverInfo((prev) => ({ ...prev, show: false }))
//                     }
//                   >
//                     {subjectName.split(",").map((s, idx) => (
//                       <div key={idx}>{s.trim()}</div>
//                     ))}
//                   </div>
//                 )}

//                 <select
//                   value={sel?.id || ""}
//                   onChange={onChange}
//                   className={`border p-1 w-full mt-2 ${
//                     inOther ? "bg-pink-100" : ""
//                   }`}
//                   disabled={usedPeriods >= allocatedPeriods && !sel?.id}
//                 >
//                   <option value="">Select</option>
//                   {subjects.map((s) => (
//                     <option key={s.subject_id} value={s.sm_id}>
//                       {s.subjectname}
//                     </option>
//                   ))}
//                 </select>
//               </td>

//               // <td key={day} className="border p-2">
//               //   {subjectName && teacherName && (
//               //     // <div className="text-center text-[.7em] text-gray-600">
//               //     //   <div className="font-medium">
//               //     //     <span className="text-pink-600">Mathematics</span>{" "}
//               //     //     <span className="text-black">(Mr. Sharma)</span>
//               //     //   </div>
//               //     //   <div className="font-medium">
//               //     //     <span className="text-pink-600">Science</span>{" "}
//               //     //     <span className="text-black">(Ms. Verma)</span>
//               //     //   </div>
//               //     //   <div className="font-medium">
//               //     //     <span className="text-pink-600">History</span>{" "}
//               //     //     <span className="text-black">(Dr. Khan)</span>
//               //     //   </div>
//               //     //   <div className="font-medium">
//               //     //     <span className="text-pink-600">English</span>{" "}
//               //     //     <span className="text-black">(Mrs. D'Souza)</span>
//               //     //   </div>
//               //     // </div>

//               //     <>
//               //       <div className="font-medium">{subjectName}</div>
//               //       <div className="text-pink-600">{teacherName}</div>
//               //     </>
//               //   )}
//               //   <select
//               //     value={sel?.id || ""}
//               //     onChange={onChange}
//               //     className={`border p-1 w-full mt-2 ${
//               //       inOther ? "bg-pink-100" : ""
//               //     }`}
//               //     disabled={usedPeriods >= allocatedPeriods && !sel?.id}
//               //   >
//               //     <option value="">Select</option>
//               //     {subjects.map((s) => (
//               //       <option key={s.subject_id} value={s.sm_id}>
//               //         {s.subjectname}
//               //       </option>
//               //     ))}
//               //   </select>
//               // </td>
//             );
//           })}
//         </tr>
//       );
//     }

//     return rows;
//   };

//   const daysForTable = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     ...(rowCounts.sat ? ["Saturday"] : []),
//   ];

//   return (
//     <div className="overflow-x-auto">
//       {loading ? (
//         <div className="flex justify-center items-center  p-5 ">
//           <LoaderStyle />
//         </div>
//       ) : (
//         <table className="w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600">
//               <th className="border p-2">Periods</th>
//               {daysForTable.map((d, i) => (
//                 <th key={i} className="border p-2">
//                   {d}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>{renderRows(daysForTable)}</tbody>
//         </table>
//       )}
//       <ToastContainer />
//       {hoverInfo.show && (
//         <div
//           className="fixed z-50 bg-white text-gray-700 shadow-lg rounded-lg p-2 border border-gray-300 text-[1em]"
//           style={{
//             top: hoverInfo.y + 10,
//             left: hoverInfo.x + 10,
//             pointerEvents: "none",
//             whiteSpace: "pre-line",
//           }}
//         >
//           {hoverInfo.items.map((item, i) => (
//             <div key={i} className="font-medium">
//               <span className="text-pink-600">{item.subject}</span>{" "}
//               <span className="text-black">({item.teacher})</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {modalInfo.show && (
//         <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
//             <h2 className="text-xl font-semibold mb-2">Subject Details</h2>
//             <p className="text-gray-700">
//               <span className="text-pink-600">{modalInfo.subject}</span>{" "}
//               <span className="text-black">({modalInfo.teacher})</span>
//             </p>
//             <button
//               onClick={() => setModalInfo({ show: false })}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// upper bala working well kar rhaa hai but ismai apn preselected subject dropdown show nhi kar rhe hai
import { useState, useEffect, useRef } from "react";
import LoaderStyle from "../../common/LoaderFinal/LoaderStyle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CommonTable({
  periods,
  subjects,
  loading,
  selectedSubjects,
  handleTableData,
  activeTab,
  tabs,
  rowCounts,
  allocatedPeriods,
  usedPeriods,
  setUsedPeriods,
  classSectionNames,
  onOverrideChange,
}) {
  const toastShownRef = useRef({});

  const [localSelectedSubjects, setLocalSelectedSubjects] = useState({});
  const [globalSubjectSelection, setGlobalSubjectSelection] = useState({});
  const [hoverInfo, setHoverInfo] = useState({
    show: false,
    x: 0,
    y: 0,
    items: [],
  });

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const classId = activeTabData?.class_id;
  const sectionId = activeTabData?.section_id;
  const key = `${classId}-${sectionId}`;

  useEffect(() => {
    if (!periods || !Array.isArray(periods)) return;

    const updated = {};
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    days.forEach((day) => {
      if (!updated[day]) updated[day] = {};

      const maxRow = day === "Saturday" ? rowCounts.sat : rowCounts.mon_fri;

      for (let i = 1; i <= maxRow; i++) {
        const override = selectedSubjects?.[key]?.[day]?.[i];
        const periodData = periods.find(
          (p) => p.day === day && p.period_no === i
        );

        updated[day][i] =
          override !== undefined && override !== null
            ? override
            : {
                id: periodData?.subject_id ? String(periodData.subject_id) : "",
                name: periodData?.subject || "",
              };
      }
    });

    setLocalSelectedSubjects(updated);
    setGlobalSubjectSelection((prev) => ({ ...prev, [key]: updated }));
  }, [periods, selectedSubjects]);

  const applySubjectChange = (day, period_no, selectedSubject) => {
    const cur = localSelectedSubjects?.[day]?.[period_no];
    const subjectRemove = !selectedSubject.id && cur?.id ? cur.id : undefined;

    const updated = {
      ...localSelectedSubjects,
      [day]: {
        ...localSelectedSubjects[day],
        [period_no]: selectedSubject.id
          ? { id: selectedSubject.id, name: selectedSubject.name }
          : { id: "", name: "", ...(subjectRemove ? { subjectRemove } : {}) },
      },
    };

    // correct working code not show negative values in the used periods
    setUsedPeriods((prev) => {
      const wasEmpty = !cur?.id;
      const nowEmpty = !selectedSubject.id;

      if (wasEmpty && !nowEmpty) return prev + 1;
      if (!wasEmpty && nowEmpty) return Math.max(prev - 1, 0); // ✅ Prevent negative
      return prev;
    });

    setLocalSelectedSubjects(updated);
    setGlobalSubjectSelection((prev) => ({ ...prev, [key]: updated[day] }));

    handleTableData(classId, sectionId, day, period_no, {
      ...selectedSubject,
      ...(subjectRemove ? { subjectRemove } : {}),
    });
  };

  const handleSubjectChange = (day, period_no, selectedSubject) => {
    const current = localSelectedSubjects?.[day]?.[period_no];
    const assigned = periods.find(
      (p) => p.day === day && p.period_no === period_no
    );
    const rowHasAssignment =
      (assigned?.subject && assigned.subject.trim()) ||
      (assigned?.teachers && assigned.teachers.trim());

    const inOther = Object.entries(globalSubjectSelection).some(
      ([sec, data]) => sec !== key && data?.[day]?.[period_no]?.id
    );

    if (selectedSubject.id && inOther) {
      const conflictKey = Object.keys(globalSubjectSelection).find(
        (sec) =>
          sec !== key && globalSubjectSelection[sec]?.[day]?.[period_no]?.id
      );
      const confSecName = conflictKey
        ? classSectionNames[conflictKey.split("-")[1]]
        : "another section";
      toast.error(
        <div>
          <strong style={{ color: "#e74c3c" }}>
            Subject already selected in another section ({confSecName})
          </strong>
          <br />
          <span style={{ color: "#2980b9" }}>
            for {day}, Period {period_no}.
          </span>
        </div>,
        { position: "top-right", autoClose: 5000 }
      );
      return;
    }

    const currentValue = current?.id || "";
    if (
      rowHasAssignment &&
      selectedSubject.id &&
      selectedSubject.id !== currentValue
    ) {
      const toastKey = `${day}-${period_no}-${selectedSubject.id}`;
      toastShownRef.current[toastKey] = false;
      if (!toastShownRef.current[toastKey]) {
        toastShownRef.current[toastKey] = true;
        toast.info(
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              padding: "20px",
              fontFamily: "'Segoe UI', sans-serif",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
              backgroundColor: "#fff",
              textAlign: "center",
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => toast.dismiss()}
              style={{
                position: "absolute",
                top: "1px",
                right: "5px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                // fontWeight: "medium",
                color: "red",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              ✖
            </button>
            <p
              style={{
                fontSize: "0.95em",
                marginBottom: "16px",
                color: "#1f2937",
              }}
            >
              <strong>Subject is already allotted for this period.</strong>
              <br />
              What would you like to do?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",

                flexWrap: "wrap",
              }}
              className="flex justify-center gap-2"
            >
              <button
                onClick={() => {
                  toast.dismiss();
                  onOverrideChange?.(day, period_no, "N");
                  applySubjectChange(day, period_no, selectedSubject);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                ➕ Add subject
              </button>
              <button
                onClick={() => {
                  toast.dismiss();
                  onOverrideChange?.(day, period_no, "Y");
                  applySubjectChange(day, period_no, selectedSubject);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                🗑 Overwrite subject(s)
              </button>
            </div>
          </div>,
          {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
            pauseOnHover: true,
            style: {
              background: "transparent", // ensures no box is added around
              boxShadow: "none",
            },
          }
        );
        return;
      }
    } else {
      onOverrideChange?.(day, period_no, selectedSubject.id ? "Y" : "N");
      applySubjectChange(day, period_no, selectedSubject);
    }
  };

  const renderRows = (days) => {
    const rows = [];
    const maxRows = Math.max(rowCounts.mon_fri, rowCounts.sat);

    for (let r = 0; r < maxRows; r++) {
      rows.push(
        <tr key={r}>
          <td className="border p-2 bg-gray-100 text-center w-16">{r + 1}</td>
          {days.map((day) => {
            if (day === "Saturday" && r >= rowCounts.sat)
              return <td key={day}></td>;
            if (day !== "Saturday" && r >= rowCounts.mon_fri)
              return <td key={day}></td>;

            const sel = localSelectedSubjects[day]?.[r + 1] || {
              id: "",
              name: "",
            };
            const periodData =
              periods.find((p) => p.day === day && p.period_no === r + 1) || {};
            const subjectName = periodData.subject || "";
            const teacherName = periodData.teachers || "";
            const inOther = Object.entries(globalSubjectSelection).some(
              ([sec, data]) => sec !== key && data?.[day]?.[r + 1]?.id
            );

            return (
              <td key={day} className="border p-2 text-center relative">
                {subjectName && (
                  <div
                    className="text-pink-600 cursor-pointer text-xs"
                    onMouseEnter={(e) => {
                      const subjectList = subjectName
                        .split(",")
                        .map((s) => s.trim());
                      const teacherList = teacherName
                        .split(",")
                        .map((t) => t.trim());
                      const items = subjectList.map((sub, idx) => ({
                        subject: sub,
                        teacher: teacherList[idx] || "",
                      }));
                      setHoverInfo({
                        show: true,
                        x: e.clientX,
                        y: e.clientY,
                        items,
                      });
                    }}
                    onMouseLeave={() =>
                      setHoverInfo((prev) => ({ ...prev, show: false }))
                    }
                  >
                    {subjectName.split(",").map((s, idx) => (
                      <div key={idx}>{s.trim()}</div>
                    ))}
                  </div>
                )}

                <select
                  value={sel.id !== undefined ? String(sel.id) : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const sub = {
                      id: val,
                      name:
                        subjects.find((s) => Number(s.sm_id) === Number(val))
                          ?.subjectname || "",
                    };
                    handleSubjectChange(day, r + 1, sub);
                  }}
                  className={`border p-1 w-full mt-2 ${
                    inOther ? "bg-pink-100" : ""
                  }`}
                  disabled={
                    usedPeriods >= allocatedPeriods && !sel?.id
                    // !periodData?.subject &&
                    // !periodData?.teachers
                  }
                >
                  <option value="">Select</option>
                  {subjects.map((s) => (
                    <option key={s.subject_id} value={s.sm_id}>
                      {s.subjectname}
                    </option>
                  ))}
                </select>
              </td>
            );
          })}
        </tr>
      );
    }
    return rows;
  };

  const daysForTable = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    ...(rowCounts.sat > 0 ? ["Saturday"] : []),
  ];

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="mt-24 flex justify-center items-center p-5">
          <LoaderStyle />
        </div>
      ) : (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-200 w-16 text-center">
                Period
              </th>
              {daysForTable.map((day) => (
                <th key={day} className="border p-2 bg-gray-200 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderRows(daysForTable)}</tbody>
        </table>
      )}

      <ToastContainer />

      {hoverInfo.show && (
        <div
          className="fixed z-50 bg-white text-gray-700 shadow-lg rounded-lg p-2 border border-gray-300 text-sm"
          style={{
            top: hoverInfo.y + 10,
            left: hoverInfo.x + 10,
            pointerEvents: "none",
          }}
        >
          {hoverInfo.items.map((item, i) => (
            <div key={i} className="font-medium">
              <span className="text-pink-600">{item.subject}</span>{" "}
              <span className="text-black">({item.teacher})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
