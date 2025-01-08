import React, { useState } from 'react';

const EmployeeTable = ({ employees, editEmployee, deleteEmployee, departments, positions }) => {
  const [editId, setEditId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({ name: '', department: '', position: '' });
  const [sortColumn, setSortColumn] = useState('name');  
  const [sortDirection, setSortDirection] = useState('asc');  
  const [filteredDepartment, setFilteredDepartment] = useState('All Departments');
  const [filteredPosition, setFilteredPosition] = useState('All Positions');

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setEditedEmployee({ ...employee });
    setEditId(id);
  };

  const handleChange = (e) => {
    setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    editEmployee(editId, editedEmployee);
    setEditId(null);
  };

  const handleSort = (column) => {
  
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const handleDepartmentFilterChange = (e) => {
    const selectedDepartment = e.target.value;
    setFilteredDepartment(selectedDepartment);

   
    if (selectedDepartment === 'All Departments') {
      setFilteredPosition('All Positions');
    }
  };

  const handlePositionFilterChange = (e) => {
    const selectedPosition = e.target.value;
    setFilteredPosition(selectedPosition);

    
    if (selectedPosition === 'All Positions') {
      setFilteredDepartment('All Departments');
    }
  };

  
  const filteredEmployees = employees
    .filter((emp) => (filteredDepartment === 'All Departments' ? true : emp.department === filteredDepartment))
    .filter((emp) => (filteredPosition === 'All Positions' ? true : emp.position === filteredPosition));

 
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      
      <div className="mb-4 flex gap-4">

        
        {filteredDepartment !== 'All Departments' && (
          <select
            value={filteredPosition}
            onChange={handlePositionFilterChange}
            className="p-2 border rounded"
          >
            <option value="All Positions">All Positions</option>
            {positions[filteredDepartment]?.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        )}
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name
              {sortColumn === 'name' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th
              className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
              onClick={() => handleSort('department')}
            >
              Department
              {sortColumn === 'department' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Position</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((emp) => (
            <tr key={emp.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.department}</td>
              <td className="px-4 py-2">{emp.position}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(emp.id)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(emp.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {editId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={editedEmployee.name}
                onChange={handleChange}
                className="p-2 border rounded"
                placeholder="Name"
              />
              <select
                name="department"
                value={editedEmployee.department}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
              <select
                name="position"
                value={editedEmployee.position}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                {positions[editedEmployee.department]?.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-500 text-white py-1 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
