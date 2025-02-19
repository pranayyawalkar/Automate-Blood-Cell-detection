import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaDownload, FaShareAlt } from "react-icons/fa";
import "./Result.css";

const Result = ({ results = [] }) => {  // ✅ Ensure `results` is always an array
  if (!Array.isArray(results)) results = []; // Extra safety check

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("🩸 Blood Cell Analysis Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    const tableColumn = ["Cell Type", "Confidence", "Status"];
    const tableRows = results.map((result) => [
      result.type || "N/A",
      result.confidence ? result.confidence + "%" : "N/A",
      result.status || "Unknown",
    ]);

    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      styles: { fontSize: 12 },
    });

    doc.save("Blood_Cell_Analysis_Report.pdf");
  };

  const sharePDF = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Blood Cell Analysis Report",
          text: "Here is the blood cell analysis report. Please check it.",
          url: window.location.href, // Change if needed
        })
        .then(() => console.log("Report Shared Successfully!"))
        .catch((error) => console.log("Sharing failed:", error));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="result-container">
      <h2>Blood Cell Analysis Results</h2>

      {results.length === 0 ? (
        <p className="no-results">No results available. Please analyze an image first.</p>
      ) : (
        <>
          <div className="result-table">
            <table>
              <thead>
                <tr>
                  <th>Cell Type</th>
                  <th>Confidence</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.type || "N/A"}</td>
                    <td>{result.confidence ? result.confidence + "%" : "N/A"}</td>
                    <td>{result.status || "Unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="button-group">
            <button onClick={generatePDF} className="download-button">
              <FaDownload /> Download PDF
            </button>
            <button onClick={sharePDF} className="share-button">
              <FaShareAlt /> Share Report
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
