import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider} from "@mui/joy";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {IInstructor} from "../../interfaces/global_interfaces.ts";
import {Box, Typography} from "@mui/material";
import useInstructors, {getSingleInstructor} from "../../useData/useInstructors.ts";

export async function loader({params}: {params: {id: string}}) {
  const instructor = await  getSingleInstructor(params.id);
  return {instructor};
}

export default function InstructorDelete() {
  const {instructor} = useLoaderData() as {instructor: IInstructor};
  const navigate = useNavigate();
  const [,,,deleteInstructor] = useInstructors();

  return(
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div className="delete-message">
        <div>
          <h1 style={{marginBottom: "20px"}}>Delete</h1>
          <h2 style={{marginBottom: "20px"}}>
            Are you sure you want to delete this?
          </h2>
          <h3>Instructor</h3>

          <Divider style={{margin: "40px 0"}}/>
          <Box>
            <Typography variant="h6" fontWeight="bold">First Name</Typography>
            <Typography variant="body1">{instructor.firstMidName}</Typography>
            <Typography variant="h6" fontWeight="bold">Last Name</Typography>
            <Typography variant="body1">{instructor.lastName}</Typography>
            <Typography variant="h6" fontWeight="bold">Hire Date</Typography>
            <Typography variant="body1">{instructor.hireDate.slice(0,10)}</Typography>
          </Box>
          <div className="delete-buttons">
            <Button onClick={() => {
              (deleteInstructor as (instructorToDelete: IInstructor) => Promise<void>)(instructor);
              navigate("/instructors")}}>Confirm</Button>
            <span><Link to={"/instructors"}>Cancel</Link></span>
          </div>
        </div>
      </div>
      <Footer/>
    </>

  )
}