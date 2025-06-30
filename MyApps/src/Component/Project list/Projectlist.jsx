import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const LOCAL_STORAGE_KEY = 'construction_workers';

const defaultProjects = [
  { id: 1, name: "Skyline Towers", location: "New York", status: "Ongoing", manager: "John Doe" },
  { id: 2, name: "Green Valley", location: "San Francisco", status: "Completed", manager: "Jane Smith" },
  { id: 3, name: "Ocean View", location: "Miami", status: "Planning", manager: "Alice Johnson" },
];

const ProjectList = () => {
  const [projects] = useState(defaultProjects);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) setWorkers(JSON.parse(data));
  }, []);

  // Auto-assign workers equally across projects
  const getAssignedWorkers = (projectId) => {
    const assigned = workers.filter((_, i) => i % projects.length === (projectId - 1));
    return assigned.map(w => w.name).join(', ') || 'Unassigned';
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Project Report', 14, 22);

    const tableColumn = ['Project Name', 'Location', 'Status', 'Manager', 'Assigned Workers'];
    const tableRows = projects.map(project => [
      project.name,
      project.location,
      project.status,
      project.manager,
      getAssignedWorkers(project.id)
    ]);

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [25, 118, 210] }
    });

    doc.save(`projects_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '40px auto',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      padding: '32px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#111', fontWeight: 700, fontSize: 28, margin: 0 }}>Project List</h2>
        <div>
          <button
            onClick={handleBack}
            style={{
              background: '#f5f5f5',
              color: '#111',
              border: '1px solid #ccc',
              borderRadius: 6,
              padding: '8px 18px',
              marginRight: 12,
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: 16
            }}
          >
            &#8592; Back
          </button>
          <button
            onClick={handleDownloadPDF}
            style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: 16
            }}
          >
            Download PDF
          </button>
        </div>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 17,
        color: '#111',
        background: '#fff'
      }}>
        <thead>
          <tr style={{ background: '#f0f4f8' }}>
            <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 600 }}>Project Name</th>
            <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 600 }}>Location</th>
            <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 600 }}>Manager</th>
            <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 600 }}>Assigned Workers</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '10px 10px' }}>{project.name}</td>
              <td style={{ padding: '10px 10px' }}>{project.location}</td>
              <td style={{ padding: '10px 10px' }}>
                <span style={{
                  background: project.status === "Completed" ? "#c8e6c9" : project.status === "Ongoing" ? "#fff9c4" : "#bbdefb",
                  color: '#111',
                  borderRadius: 4,
                  padding: '4px 10px',
                  fontWeight: 500
                }}>
                  {project.status}
                </span>
              </td>
              <td style={{ padding: '10px 10px' }}>{project.manager}</td>
              <td style={{ padding: '10px 10px' }}>{getAssignedWorkers(project.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
