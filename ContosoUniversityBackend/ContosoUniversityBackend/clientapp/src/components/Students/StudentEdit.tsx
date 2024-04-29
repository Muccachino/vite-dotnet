import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import useStudents, {getSingleStudent} from "../../useData/useStudents.ts";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {IEnrollment, IStudent} from "../../interfaces/global_interfaces.ts";
import  {useState} from "react";
import Table from "@mui/joy/Table";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableHead,
  TableRow
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
          <Input sx={{marginBottom: "15px"}} value={currentStudent.firstMidName} onChange={(e) => setCurrentStudent(prevState => ({...prevState, firstMidName: (e.target.value)}))}/>
          <FormLabel>Last Name</FormLabel>
          <Input sx={{marginBottom: "15px"}} value={currentStudent.lastName} onChange={(e) => setCurrentStudent(prevState => ({...prevState, lastName: (e.target.value)}))}/>
          <FormLabel>Enrollment Date</FormLabel>
          <Input sx={{marginBottom: "15px"}} value={currentStudent.enrollmentDate.slice(0,10)} onChange={(e) => setCurrentStudent(prevState => ({...prevState, enrollmentDate: (e.target.value)}))} type="date"/>

          <FormLabel>Courses</FormLabel>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Title</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStudent.enrollments &&
                (currentStudent.enrollments as IEnrollment[]).map((item, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell>{item.course?.title}</TableCell>
                      <TableCell>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={item.grade}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setCurrentStudent(prevState => ({...prevState, grade: (e.target.value)}))}}
                          >
                            <MenuItem value={0}>A</MenuItem>
                            <MenuItem value={1}>B</MenuItem>
                            <MenuItem value={2}>C</MenuItem>
                            <MenuItem value={3}>D</MenuItem>
                            <MenuItem value={4}>F</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" size="large">
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
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (editStudents as (studentToEdit: IStudent) => Promise<void>)(currentStudent);
          navigate("/students")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/students"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}