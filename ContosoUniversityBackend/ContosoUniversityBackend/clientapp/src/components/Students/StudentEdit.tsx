import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel} from "@mui/joy";
import useStudents, {getSingleStudent} from "../../useData/useStudents.ts";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {IEnrollment, IStudent} from "../../interfaces/global_interfaces.ts";
import {ChangeEvent, useState} from "react";
import Table from "@mui/joy/Table";
import {
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export async function loader({params}: {params: {id: string}}) {
  const student = await getSingleStudent(params.id);
  return {student};
}


export default function StudentEdit() {
  const navigate = useNavigate();
  const {student} = useLoaderData() as {student: IStudent};
  const [,editStudents] = useStudents()
  const [currentStudent, setCurrentStudent] = useState<IStudent>(student);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [enrollmentDateError, setEnrollmentDateError] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  function handleDeleteCourse(id: number) {
    const newCourses = currentStudent.enrollments!.filter(x => x.enrollmentID !== id);
    setCurrentStudent(prevState => ({...prevState, enrollments: newCourses}))
  }

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdateError(false);
    setCurrentStudent(prevState => ({...prevState, firstMidName: (e.target.value)}))
    e.target.validity.valid ? setFirstNameError(false) : setFirstNameError(true);
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdateError(false);
    setCurrentStudent(prevState => ({...prevState, lastName: (e.target.value)}))
    e.target.validity.valid ? setLastNameError(false) : setLastNameError(true);
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setUpdateError(false);
    setCurrentStudent(prevState => ({...prevState, enrollmentDate: (e.target.value)}))
    e.target.validity.valid ? setEnrollmentDateError(false) : setEnrollmentDateError(true);
  }

  function handleSubmit(){
    if(!firstNameError && !lastNameError &&
      !enrollmentDateError &&
      currentStudent.firstMidName !== "" &&
      currentStudent.lastName !== "" &&
      currentStudent.enrollmentDate !== "" &&
      currentStudent.enrollments!.length !== 0){
      (editStudents as (studentToEdit: IStudent) => Promise<void>)(currentStudent);
      navigate("/students")
    } else {
      setUpdateError(true);
    }
  }

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Edit</h1>
          <h3>Student</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>First Name</FormLabel>
          <TextField
            sx={{marginBottom: "15px"}}
            value={currentStudent.firstMidName}
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleFirstNameChange(e)}
            error={firstNameError}
            helperText={firstNameError ? "Please enter a first name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}/>

          <FormLabel>Last Name</FormLabel>
          <TextField
            sx={{marginBottom: "15px"}}
            value={currentStudent.lastName}
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleLastNameChange(e)}
            error={lastNameError}
            helperText={lastNameError ? "Please enter a last name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}/>

          <FormLabel>Enrollment Date</FormLabel>
          <TextField
            sx={{marginBottom: "15px"}}
            value={currentStudent.enrollmentDate.slice(0,10)}
            required
            size={"small"}
            type={"date"}
            onChange={(e) => handleDateChange(e)}
            error={enrollmentDateError}
            helperText={enrollmentDateError ? "Please enter a valid date" : ""}/>

          <FormLabel sx={{marginBottom: "15px"}}>Courses</FormLabel>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{paddingLeft: "25px"}}>Course Title</TableCell>
                <TableCell style={{paddingLeft: "25px"}}>Grade</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStudent.enrollments &&
                (currentStudent.enrollments as IEnrollment[]).map((item, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell style={{paddingLeft: "30px"}}>{item.course?.title}</TableCell>
                      <TableCell style={{paddingLeft: "35px"}}>{item.gradeString}</TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" size="large" onClick={() => handleDeleteCourse(item.enrollmentID)}>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => handleSubmit()}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/students"}>Back to List</Link></span>
          {updateError &&
              <p style={{color: "red", marginTop: "20px"}}>One or more inputs are invalid !</p>}
        </div>
      </div>
      <Footer/>
    </>
  )
}