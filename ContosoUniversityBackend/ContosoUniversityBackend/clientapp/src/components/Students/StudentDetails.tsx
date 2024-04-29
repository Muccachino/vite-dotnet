import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {getSingleStudent} from "../../useData/useStudents.ts";
import {Link, useLoaderData} from "react-router-dom";
import {IEnrollment, IStudent} from "../../interfaces/global_interfaces.ts";
import {Divider} from "@mui/joy";
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Table from "@mui/joy/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";


const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export async function loader({params}: {params: {id: string}}) {
  const student: IStudent = await getSingleStudent(params.id);

  return [student];
}

export default function StudentDetails() {
  const [student] = useLoaderData() as [student: IStudent];

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 20vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Details</h1>
          <h3>{student.firstMidName + " " + student.lastName}</h3>
        </div>
        <Divider/>
        <Grid container spacing={2} marginBottom={10}>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>First Name</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{student.firstMidName}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Last Name</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{student.lastName}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Enrollment Date</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{student.enrollmentDate.slice(0,10)}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Enrollments</Item>
          </Grid>
          <Grid xs={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.enrollments &&
                  (student.enrollments as IEnrollment[]).map((item, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell>{item.course?.title}</TableCell>
                      <TableCell>{item.gradeString}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Grid>

        </Grid>

        <Link to={"/students"}>Back to List</Link>
      </div>
      <Footer/>
    </>
  )
}