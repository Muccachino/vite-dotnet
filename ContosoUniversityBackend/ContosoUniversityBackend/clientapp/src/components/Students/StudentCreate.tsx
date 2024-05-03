import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel} from "@mui/joy";
import useStudents from "../../useData/useStudents.ts";
import {Link, useNavigate} from "react-router-dom";
import {ICourse, IStudent} from "../../interfaces/global_interfaces.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, TextField} from "@mui/material";
import useCourses from "../../useData/useCourses.ts";


export default function StudentCreate() {
  const navigate = useNavigate();
  const [,,addStudent] = useStudents()
  const [courses] = useCourses() as [courses: ICourse[]];
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [currentStudent, setCurrentStudent] = useState<IStudent>({ firstMidName: "", lastName: "", enrollmentDate: "2024-01-01", courseIds: []});
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [enrollmentDateError, setEnrollmentDateError] = useState(false);
  const [coursesError, setCoursesError] = useState(false);
  const [createError, setCreateError] = useState(false);

  function handleCourseCheckboxes(checked: boolean ,courseID: number) {
    setCoursesError(false);
    setCreateError(false);
    if(checked) {
      setSelectedCourses(prevState => [...prevState, courseID]);
    } else {
      setSelectedCourses(prevState => {
        return prevState.filter(id => id !== courseID)
      })
    }
  }

    useEffect(() => {
      const setStudent = () => {
        setCurrentStudent(prevState => ({...prevState, courseIds: selectedCourses}))
      }
      setStudent();
    }, [selectedCourses])

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentStudent(prevState => ({...prevState, firstMidName: (e.target.value)}))
    e.target.validity.valid ? setFirstNameError(false) : setFirstNameError(true);
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentStudent(prevState => ({...prevState, lastName: (e.target.value)}))
    e.target.validity.valid ? setLastNameError(false) : setLastNameError(true);
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setCreateError(false);
    setCurrentStudent(prevState => ({...prevState, enrollmentDate: (e.target.value)}))
    e.target.validity.valid ? setEnrollmentDateError(false) : setEnrollmentDateError(true);
  }

  function handleSubmit(){
    if(!firstNameError && !lastNameError &&
      !enrollmentDateError &&
      currentStudent.firstMidName !== "" &&
      currentStudent.lastName !== "" &&
      currentStudent.enrollmentDate !== "" &&
      currentStudent.courseIds!.length !== 0){
      (addStudent as (studentToCreate: IStudent) => Promise<void>)(currentStudent);
      navigate("/students")
    } else {
      if (currentStudent.courseIds!.length === 0){
        setCoursesError(true);
      }
      setCreateError(true);
    }
  }


  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Create</h1>
          <h3>Student</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>First Name</FormLabel>
          <TextField
            hiddenLabel
            sx={{marginBottom: "15px"}}
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleFirstNameChange(e)}
            error={firstNameError}
            helperText={firstNameError ? "Please enter a first name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}/>

          <FormLabel>Last Name</FormLabel>
          <TextField
            hiddenLabel
            sx={{marginBottom: "15px"}}
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleLastNameChange(e)}
            error={lastNameError}
            helperText={lastNameError ? "Please enter a last name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}/>

          <FormLabel>Enrollment Date</FormLabel>
          <TextField
            required
            sx={{marginBottom: "15px"}}
            size={"small"}
            type={"date"}
            onChange={(e) => handleDateChange(e)}
            error={enrollmentDateError}
            helperText={enrollmentDateError ? "Please enter a valid date" : ""}/>

          <FormLabel sx={{marginBottom: "10px"}}>Courses</FormLabel>
          <FormGroup sx={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
            {courses.map(course => {
              return <FormControlLabel key={course.courseID} control={<Checkbox onChange={(e) => handleCourseCheckboxes(e.target.checked, course.courseID)}/>} label={course.title} />
            })}
            {coursesError &&
                <FormHelperText style={{color: "red", marginTop: "20px"}}>Choose at least one course!</FormHelperText>}
          </FormGroup>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => handleSubmit()}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/students"}>Back to List</Link></span>
          {createError &&
              <p style={{color: "red", marginTop: "20px"}}>One or more inputs are invalid !</p>}
        </div>
      </div>
      <Footer/>
    </>
  )
}