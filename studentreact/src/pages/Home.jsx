import React, { useState, useEffect } from 'react';

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/students');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty array means this runs once on mount

  return (
    <div className="row">
      {<div class="spinner-border m-5" role="status">
  <span class="visually-hidden"></span>
</div>}{students && students.length < 1 }
      {students.length > 0 ? (
        students.map(student => (
          <div className="col-md-3 mb-4" key={student.id}>
            <div className="card">
              <img src={student.image} className="card-img-top" alt={student.name} />
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">Age: {student.age}</p>
                <p className="card-text">Course: {student.course}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default Home;