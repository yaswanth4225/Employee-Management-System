
import React, { useMemo, useState } from "react";
import "./Documents.css";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    category: "Resume",
    file: null
  });

  const categories = [
    "Resume",
    "ID Proof",
    "Education Certificate",
    "Offer Letter",
    "Experience Letter",
    "Other"
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFormData(previous => ({
        ...previous,
        file: selectedFile
      }));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please select a document.");
      return;
    }

    const fileUrl = URL.createObjectURL(formData.file);

    const newDocument = {
      id: Date.now(),
      employeeName: formData.employeeName,
      employeeId: formData.employeeId,
      category: formData.category,
      fileName: formData.file.name,
      fileSize: formData.file.size,
      fileType: formData.file.type,
      fileUrl,
      uploadDate: new Date().toLocaleDateString("en-IN")
    };

    setDocuments(previous => [newDocument, ...previous]);

    setFormData({
      employeeName: "",
      employeeId: "",
      category: "Resume",
      file: null
    });

    e.target.reset();
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    const documentToDelete = documents.find(doc => doc.id === id);

    if (documentToDelete) {
      URL.revokeObjectURL(documentToDelete.fileUrl);
    }

    setDocuments(previous =>
      previous.filter(doc => doc.id !== id)
    );
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch =
        doc.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        doc.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        doc.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [documents, search, categoryFilter]);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const totalSize = documents.reduce(
    (total, doc) => total + doc.fileSize,
    0
  );

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    if (extension === "pdf") return "📕";
    if (["jpg", "jpeg", "png"].includes(extension)) return "🖼️";
    if (["doc", "docx"].includes(extension)) return "📘";
    return "📄";
  };

  return (
    <div className="documents-page">

      {/* Header */}
      <div className="documents-header">
        <div>
          <h1>Employee Documents</h1>
          <p>Upload and manage employee documents in one place.</p>
        </div>

        <button
          className="document-upload-main-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Upload Document
        </button>
      </div>

      {/* Statistics */}
      <div className="document-stats">

        <div className="document-stat-card">
          <div className="document-stat-icon blue">📁</div>
          <div>
            <p>Total Documents</p>
            <h2>{documents.length}</h2>
          </div>
        </div>

        <div className="document-stat-card">
          <div className="document-stat-icon green">📄</div>
          <div>
            <p>Resumes</p>
            <h2>
              {documents.filter(doc => doc.category === "Resume").length}
            </h2>
          </div>
        </div>

        <div className="document-stat-card">
          <div className="document-stat-icon orange">🪪</div>
          <div>
            <p>ID Proofs</p>
            <h2>
              {documents.filter(doc => doc.category === "ID Proof").length}
            </h2>
          </div>
        </div>

        <div className="document-stat-card">
          <div className="document-stat-icon purple">💾</div>
          <div>
            <p>Total Storage</p>
            <h2>{formatFileSize(totalSize)}</h2>
          </div>
        </div>

      </div>

      {/* Upload Form */}
      {showForm && (
        <form className="document-form" onSubmit={handleUpload}>
          <div className="document-form-heading">
            <div>
              <h2>Upload New Document</h2>
              <p>Enter employee information and select a file.</p>
            </div>

            <button
              type="button"
              className="document-close-btn"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
          </div>

          <div className="document-form-grid">

            <div className="document-field">
              <label>Employee Name</label>
              <input
                type="text"
                placeholder="Enter employee name"
                value={formData.employeeName}
                onChange={e =>
                  setFormData({
                    ...formData,
                    employeeName: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="document-field">
              <label>Employee ID</label>
              <input
                type="text"
                placeholder="Example: EMP101"
                value={formData.employeeId}
                onChange={e =>
                  setFormData({
                    ...formData,
                    employeeId: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="document-field">
              <label>Document Category</label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData({
                    ...formData,
                    category: e.target.value
                  })
                }
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="document-field">
              <label>Select Document</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
              <small>Allowed: PDF, DOC, DOCX, JPG, PNG</small>
            </div>

          </div>

          {formData.file && (
            <p className="selected-file">
              Selected: {formData.file.name}
            </p>
          )}

          <div className="document-form-actions">
            <button type="submit" className="document-save-btn">
              Upload Document
            </button>

            <button
              type="button"
              className="document-cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search and Filter */}
      <div className="document-toolbar">
        <div className="document-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by employee, ID or file name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          className="document-filter"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Documents Table */}
      <div className="document-table-card">
        <div className="document-table-heading">
          <div>
            <h2>All Documents</h2>
            <p>{filteredDocuments.length} documents found</p>
          </div>
        </div>

        <div className="document-table-scroll">
          <table className="document-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Category</th>
                <th>File Size</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div className="document-file-cell">
                      <span className="document-file-icon">
                        {getFileIcon(doc.fileName)}
                      </span>
                      <span>{doc.fileName}</span>
                    </div>
                  </td>

                  <td>{doc.employeeName}</td>
                  <td>{doc.employeeId}</td>

                  <td>
                    <span className="document-category">
                      {doc.category}
                    </span>
                  </td>

                  <td>{formatFileSize(doc.fileSize)}</td>
                  <td>{doc.uploadDate}</td>

                  <td>
                    <div className="document-actions">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="document-view-btn"
                      >
                        View
                      </a>

                      <a
                        href={doc.fileUrl}
                        download={doc.fileName}
                        className="document-download-btn"
                      >
                        Download
                      </a>

                      <button
                        className="document-delete-btn"
                        onClick={() => handleDelete(doc.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan="7" className="document-empty">
                    <div>📂</div>
                    <h3>No documents found</h3>
                    <p>Upload a document or change your search filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Documents;
