import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./History.css";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [historyData, setHistoryData] = useState([
    { id: 1, date: "2024-02-18", result: "Normal" },
    { id: 2, date: "2024-02-15", result: "Anemia Detected" },
    { id: 3, date: "2024-02-10", result: "Low RBC Count" }
  ]);

  // Filter history based on search query
  const filteredData = historyData.filter(item =>
    item.date.includes(searchQuery) || item.result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to generate & download PDF
  const downloadPDF = (item) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Patient Report", 80, 20);

    doc.autoTable({
      startY: 40,
      head: [["ID", "Date", "Result"]],
      body: [[item.id, item.date, item.result]],
      theme: "grid",
    });

    doc.save(`Patient_Report_${item.id}.pdf`);
  };

  // Function to delete history entry
  const deleteHistory = (id) => {
    const updatedHistory = historyData.filter(item => item.id !== id);
    setHistoryData(updatedHistory);
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Patient History</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by date or result..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>

      {/* History Table */}
      {filteredData.length > 0 ? (
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.result}</td>
                <td className="action-buttons">
                  <button className="view-btn" onClick={() => downloadPDF(item)}>View</button>
                  <button className="delete-btn" onClick={() => deleteHistory(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-history">No records found</p>
      )}
    </div>
  );
};

export default History;
