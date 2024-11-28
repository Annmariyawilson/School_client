import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Add from '../components/Add';
import Edit from '../components/Edit';
import { getStudentsApi, deleteStudentApi } from '../services/allApi';
import { addResponseContext,editResponseContext } from '../contextApi/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [students, setStudents] = useState([]);
const [searchkey,setSearchkey]=useState("")
// console.log(searchkey);

const nav=useNavigate()
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const { editResponse } = useContext(editResponseContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
      getData();
   
  }, [addResponse,searchkey]);

  const getData = async () => {
    try {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      };
      const res = await getStudentsApi(header,searchkey);

      if (res.status === 200) {
        setStudents(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load students.");
    }
  };

  const updateStudentList = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
  };

  const deleteStudent = async (id) => {
    try {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      };
      const res = await deleteStudentApi(id, header);

      if (res.status === 200) {
        toast.success("Student Details Removed");
        getData();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  const logout=()=>{
    sessionStorage.clear()
    nav('/auth')
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <i className="fa-solid fa-graduation-cap" /> School Management
          </Navbar.Brand>
          <button className='btn btn-danger' onClick={logout}>Logout</button>
        </Container>
      </Navbar>
      <div className="p-5">
        <div className='d-flex justify-content-between'>
      <div>
        <input type="text"   onChange={(e) => setSearchkey(e.target.value )} placeholder='Enter wt u want to search' className='form-control' />
      </div>
      </div>
        <Add />
        {students.length > 0 ? (
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Class</td>
                <td>Phone</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.batch}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Edit student={item} updateStudentList={updateStudentList} />
                    <button
                      className="btn"
                      onClick={() => deleteStudent(item._id)}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#aa0818" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className="text-danger">No students Details Available!!</h4>
        )}
      </div>
    </>
  );
}

export default Dashboard;
