import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {ICourse, IInstructor} from "../../interfaces/global_interfaces.ts";
import {useEffect, useState} from "react";
import useInstructors, {getSingleInstructor} from "../../useData/useInstructors.ts";
import useCourses from "../../useData/useCourses.ts";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

export async function loader({params}: {params: {id: string}}) {
  const instructor = await getSingleInstructor(params.id);
  return {instructor};
}


export default function InstructorEdit() {
  const navigate = useNavigate();
  const {instructor} = useLoaderData() as {instructor: IInstructor};
  const [courses] = useCourses() as [ICourse[]];
  const [,editInstructor] = useInstructors();
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [currentInstructor, setCurrentInstructor] = useState<IInstructor>(instructor);


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
    const setCourses = () => {
      const courseList: number[] = [];
      currentInstructor.courseAssignments?.forEach(course => {
        courseList.push(course.courseID);
      })
      setSelectedCourses(courseList);
    }
    setCourses();
  }, []);

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
          <h1 style={{marginBottom: "20px"}}>Edit</h1>
          <h3>Instructor</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>First Name</FormLabel>
          <Input value={currentInstructor.firstMidName} onChange={(e) => setCurrentInstructor(prevState => ({...prevState, firstMidName: (e.target.value)}))}/>
          <FormLabel>Last Name</FormLabel>
          <Input value={currentInstructor.lastName} onChange={(e) => setCurrentInstructor(prevState => ({...prevState, lastName: (e.target.value)}))}/>
          <FormLabel>Hire Date</FormLabel>
          <Input value={currentInstructor.hireDate.slice(0,10)} onChange={(e) => setCurrentInstructor(prevState => ({...prevState, hireDate: (e.target.value)}))} type="date"/>
          <FormLabel>Office</FormLabel>
          <Input value={currentInstructor.officeAssignment?.location} onChange={(e) => setCurrentInstructor(prevState => ({...prevState, officeAssignment: {location:(e.target.value)}}))}/>
          <FormLabel>Courses Taught</FormLabel>
          <FormGroup sx={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
            {courses.map(course => {
              return <FormControlLabel key={course.courseID}
                                       control={<Checkbox checked={selectedCourses.includes(course.courseID)}
                                                          onChange={(e) => handleCourseCheckboxes(e.target.checked, course.courseID)}/>}
                                       label={course.title} />
            })}
          </FormGroup>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            const editedInstructor: IInstructor = {
              id: currentInstructor.id,
              firstMidName: currentInstructor.firstMidName,
              lastName: currentInstructor.lastName,
              hireDate: currentInstructor.hireDate,
              officeAssignment: {location: currentInstructor.officeAssignment!.location},
              courseIds: currentInstructor.courseIds
            };
            (editInstructor as (instructorToEdit: IInstructor) => Promise<void>)(editedInstructor);
            navigate("/instructors")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/instructors"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}