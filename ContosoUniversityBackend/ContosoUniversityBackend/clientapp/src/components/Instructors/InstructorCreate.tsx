import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import {Link, useNavigate} from "react-router-dom";
import {ICourse, IInstructor} from "../../interfaces/global_interfaces.ts";
import {useEffect, useState} from "react";
import useInstructors from "../../useData/useInstructors.ts";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import useCourses from "../../useData/useCourses.ts";


export default function InstructorCreate() {
  const [courses] = useCourses() as [ICourse[]];
  const navigate = useNavigate();
  const [,,createInstructor] = useInstructors()
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [currentInstructor, setCurrentInstructor] = useState<IInstructor>({
    firstMidName: "",
    lastName: "",
    hireDate: "2024-01-01",
    courseIds: [],
    officeAssignment: {location: ""}
  });

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
      setCurrentInstructor(prevState => ({...prevState, courseIds: selectedCourses}))
    }
    setStudent();
  }, [selectedCourses])

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Create</h1>
          <h3>Instructor</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>First Name</FormLabel>
          <Input onChange={(e) => setCurrentInstructor(prevState => ({...prevState, firstMidName: (e.target.value)}))}/>
          <FormLabel>Last Name</FormLabel>
          <Input onChange={(e) => setCurrentInstructor(prevState => ({...prevState, lastName: (e.target.value)}))}/>
          <FormLabel>Hire Date</FormLabel>
          <Input onChange={(e) => setCurrentInstructor(prevState => ({...prevState, hireDate: (e.target.value)}))} type="date"/>
          <FormLabel>Office</FormLabel>
          <Input onChange={(e) => setCurrentInstructor(prevState => ({...prevState, officeAssignment: {location:(e.target.value)}}))}/>
          <FormLabel>Courses Taught</FormLabel>
          <FormGroup sx={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
            {courses.map(course => {
              return <FormControlLabel key={course.courseID} control={<Checkbox onChange={(e) => handleCourseCheckboxes(e.target.checked, course.courseID)}/>} label={course.title} />
            })}
          </FormGroup>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (createInstructor as (instructorToAdd: IInstructor) => Promise<void>)(currentInstructor);
            navigate("/instructors")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/instructors"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}