import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarkAttendance = () => {
  const [date, setDate] = useState('');
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/employee');
        setEmployees(response.data);
        // Initialize attendance state with fetched employees
        const initialAttendance = response.data.reduce((acc, employee) => {
          acc[employee._id] = 'present'; // default status
          return acc;
        }, {});
        setAttendance(initialAttendance);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  const handleStatusChange = (employeeID, status) => {
    setAttendance({ ...attendance, [employeeID]: status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/attendance/mark/', {
        date,
        attendance,
      });
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      alert('Failed to mark attendance');
    }
    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-3xl font-semibold mb-4'>Mark Employee Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='date' className='block text-sm font-medium text-gray-700'>
            Date
          </label>
          <input
            id='date'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='overflow-x-auto mb-4'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Employee ID
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{employee.ID}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{employee.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <select
                      value={attendance[employee._id]}
                      onChange={(e) => handleStatusChange(employee._id, e.target.value)}
                      className='focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      required
                    >
                      <option value='present'>Present</option>
                      <option value='absent'>Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          {loading ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;
