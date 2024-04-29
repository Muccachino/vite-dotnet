import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider} from "@mui/joy";
import useCourses, {getSingleCourse} from "../../useData/useCourses.ts";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {ICourse} from "../../interfaces/global_interfaces.ts";
import {Box, Typography} from "@mui/material";

export async function loader({params}: {params: {id: string}}) {
  const course = await getSingleCourse(params.id);
  return {course};
}

export default function CourseDelete() {
  const {course} = useLoaderData() as {course: ICourse};
  const navigate = useNavigate();
  const [,,,deleteCourse] = useCourses();

  return(
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div className="delete-message">
        <div>
          <h1 style={{marginBottom: "20px"}}>Delete</h1>
          <h2 style={{marginBottom: "20px"}}>
            Are you sure you want to delete this?
          </h2>
          <h3>Course</h3>

          <Divider style={{margin: "40px 0"}}/>
          <Box>
            <Typography variant="h6" fontWeight="bold">Course Number</Typography>
            <Typography variant="body1">{course.courseID}</Typography>
            <Typography variant="h6" fontWeight="bold">Title</Typography>
            <Typography variant="body1">{course.title}</Typography>
            <Typography variant="h6" fontWeight="bold">Credits</Typography>
            <Typography variant="body1">{course.credits}</Typography>
          </Box>
          <div className="delete-buttons">
            <Button onClick={() => {
              (deleteCourse as (courseToDelete: ICourse) => Promise<void>)(course);
              navigate("/courses")}}>Confirm</Button>
            <span><Link to={"/courses"}>Cancel</Link></span>
          </div>
        </div>
      </div>
      <Footer/>
    </>

  )
}