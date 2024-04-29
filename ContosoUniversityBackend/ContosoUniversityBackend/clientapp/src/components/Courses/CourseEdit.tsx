import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import useCourses, {getSingleCourse} from "../../useData/useCourses.ts";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {ICourse, IDepartment} from "../../interfaces/global_interfaces.ts";
import  {useState} from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import useDepartments from "../../useData/useDepartments.ts";

export async function loader({params}: {params: {id: string}}) {
  const course = await  getSingleCourse(params.id);
  return {course};
}


export default function CourseEdit() {
  const navigate = useNavigate();
  const {course} = useLoaderData() as {course: ICourse};
  const [,editCourses] = useCourses()
  const [departments] = useDepartments()
  const [currentCourse, setCurrentCourse] = useState<ICourse>(course);

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Edit</h1>
          <h3>Course</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>Course Number</FormLabel>
          <Input value={currentCourse.courseID} onChange={(e) => setCurrentCourse(prevState => ({...prevState, courseID: parseInt(e.target.value)}))}/>
          <FormLabel>Title</FormLabel>
          <Input value={currentCourse.title} onChange={(e) => setCurrentCourse(prevState => ({...prevState, title: (e.target.value)}))}/>
          <FormLabel>Credits</FormLabel>
          <Input value={currentCourse.credits} onChange={(e) => setCurrentCourse(prevState => ({...prevState, credits: parseInt(e.target.value)}))} />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Department</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue={course.departmentID}
              onChange={(e) => setCurrentCourse(prevState => ({...prevState, departmentID: parseInt(e.target.value)}))}
            >
              {(departments as IDepartment[]).map(department => {
                return(
                  <FormControlLabel key={department.departmentID} value={department.departmentID} control={<Radio />} label={department.name} />
                )
              })}
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (editCourses as (courseToEdit: ICourse) => Promise<void>)(currentCourse);
            navigate("/courses")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/courses"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}