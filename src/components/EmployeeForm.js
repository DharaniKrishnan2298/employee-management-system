import React, { useState } from 'react';

const EmployeeForm = ({ addEmployee, departments, positions }) => {
  const [employee, setEmployee] = useState({ name: '', department: '', position: '' });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(employee);
    setEmployee({ name: '', department: '', position: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="department"
          value={employee.department}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
        <select
          name="position"
          value={employee.position}
          onChange={handleChange}
          className="p-2 border rounded"
          disabled={!employee.department}
          required
        >
          <option value="">Select Position</option>
          {employee.department &&
            positions[employee.department].map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
