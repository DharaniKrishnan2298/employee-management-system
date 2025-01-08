import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const departments = ['HR', 'IT', 'Sales', 'Finance', 'Marketing'];
const positions = {
  HR: ['Manager', 'Analyst', 'Executive', 'Intern', 'Consultant'],
  IT: ['Developer', 'Tester', 'Architect', 'Intern', 'Engineer'],
  Sales: ['Manager', 'Executive', 'Representative', 'Consultant', 'Intern'],
  Finance: ['Analyst', 'Accountant', 'Auditor', 'Intern', 'Manager'],
  Marketing: ['Specialist', 'Manager', 'Analyst', 'Intern', 'Executive'],
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ department: '', position: '' });

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: Date.now(), ...employee }]);
  };

  const editEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map((emp) => (emp.id === id ? { ...emp, ...updatedEmployee } : emp)));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesDepartment = filters.department ? emp.department === filters.department : true;
    const matchesPosition = filters.position ? emp.position === filters.position : true;
    return matchesDepartment && matchesPosition;
  });

  
  const handleDepartmentFilterChange = (e) => {
    const selectedDepartment = e.target.value;
    setFilters({ department: selectedDepartment, position: '' }); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Management System</h1>
      <EmployeeForm addEmployee={addEmployee} departments={departments} positions={positions} />
      <div className="flex gap-4 my-4">
        <select
          name="department"
          className="p-2 border rounded w-1/2"
          value={filters.department}
          onChange={handleDepartmentFilterChange}
        >
          <option value="">All Departments</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
        <select
          name="position"
          className="p-2 border rounded w-1/2"
          value={filters.position}
          onChange={(e) => setFilters({ ...filters, position: e.target.value })}
          disabled={!filters.department} 
        >
          <option value="">All Positions</option>
          {filters.department &&
            positions[filters.department].map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
        </select>
      </div>
      <EmployeeTable
        employees={filteredEmployees}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
        departments={departments}
        positions={positions}
      />
    </div>
  );
};

export default EmployeeManagement;
