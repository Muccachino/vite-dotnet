import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import useStudents from "../../useData/useStudents.ts";
import {Link, useNavigate} from "react-router-dom";
import {ICourse, IStudent} from "../../interfaces/global_interfaces.ts";
import {useEffect, useState} from "react";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import useCourses from "../../useData/useCourses.ts";


export default function StudentCreate() {
  const navigate = useNavigate();
  const [,,addStudent] = useStudents()
  const [courses] = useCourses() as [courses: ICourse[]];
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [currentStudent, setCurrentStudent] = useState<IStudent>({ firstMidName: "", lastName: "", enrollmentDate: "2024-01-01", courseIds: []});

  function handleCourseCheckboxes(checked: boolean ,courseID: number) {
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
          <Input onChange={(e) => setCurrentStudent(prevState => ({...prevState, firstMidName: (e.target.value)}))}/>
          <FormLabel>Last Name</FormLabel>
          <Input onChange={(e) => setCurrentStudent(prevState => ({...prevState, lastName: (e.target.value)}))}/>
          <FormLabel>Enrollment Date</FormLabel>
          <Input onChange={(e) => setCurrentStudent(prevState => ({...prevState, enrollmentDate: (e.target.value)}))} type="date"/>
          <FormLabel>Courses</FormLabel>
          <FormGroup sx={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
            {courses.map(course => {
              return <FormControlLabel key={course.courseID} control={<Checkbox onChange={(e) => handleCourseCheckboxes(e.target.checked, course.courseID)}/>} label={course.title} />
            })}
          </FormGroup>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (addStudent as (studentToEdit: IStudent) => Promise<void>)(currentStudent);
            navigate("/students")}}
          >
            Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/students"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}