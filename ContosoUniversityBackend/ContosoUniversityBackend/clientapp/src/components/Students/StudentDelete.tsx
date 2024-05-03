import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider} from "@mui/joy";
import useStudents, {getSingleStudent} from "../../useData/useStudents.ts";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {IStudent} from "../../interfaces/global_interfaces.ts";
import {Box, Typography} from "@mui/material";

export async function loader({params}: {params: {id: string}}) {
  const student = await  getSingleStudent(params.id);
  return {student};
}

export default function StudentDelete() {
  const {student} = useLoaderData() as {student: IStudent};
  const navigate = useNavigate();
  const [,,,deleteStudent] = useStudents();

  return(
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div className="delete-message">
        <div>
          <h1 style={{marginBottom: "20px"}}>Delete</h1>
          <h2 style={{marginBottom: "20px"}}>
            Are you sure you want to delete this?
          </h2>
          <h3>Student</h3>

          <Divider style={{margin: "40px 0"}}/>
          <Box className="delete-allInfos">
            <div className="delete-infos">
              <Typography variant="body1" >First Name:</Typography>
              <Typography variant="h6" fontWeight="bold">{student.firstMidName}</Typography>
            </div>
            <div className="delete-infos">
              <Typography variant="body1">Last Name:</Typography>
              <Typography variant="h6" fontWeight="bold">{student.lastName}</Typography>
            </div>
            <div className="delete-infos">
              <Typography variant="body1">Enrollment Date:</Typography>
              <Typography variant="h6" fontWeight="bold">{student.enrollmentDate.slice(0, 10)}</Typography>
            </div>
          </Box>
          <div className="delete-buttons">
            <Button onClick={() => {
              (deleteStudent as (studentToDelete: IStudent) => Promise<void>)(student);
              navigate("/students")}}>Confirm</Button>
            <span><Link to={"/students"}>Cancel</Link></span>
          </div>
        </div>
      </div>
      <Footer/>
    </>

  )
}