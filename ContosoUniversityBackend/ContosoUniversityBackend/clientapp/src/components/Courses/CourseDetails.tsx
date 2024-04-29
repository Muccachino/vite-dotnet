import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Link, useLoaderData} from "react-router-dom";
import {ICourse, IEnrollment} from "../../interfaces/global_interfaces.ts";
import {Divider} from "@mui/joy";
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Table from "@mui/joy/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getSingleCourse} from "../../useData/useCourses.ts";

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
  const course: ICourse = await getSingleCourse(params.id);
  return {course}
}

export default function CourseDetails() {
  const {course} = useLoaderData() as {course: ICourse};


  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 20vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Details</h1>
          <h3>{course.title}</h3>
        </div>
        <Divider/>
        <Grid container spacing={2} marginBottom={10}>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Course Number</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{course.courseID}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Title</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{course.title}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Credits</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{course.credits}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Department</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{course.department?.name}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Enrollments</Item>
          </Grid>
          <Grid xs={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.enrollments &&
                  (course.enrollments as IEnrollment[]).map((item, index) => {
                    return(
                      <TableRow key={index}>
                        <TableCell>{item.student?.id}</TableCell>
                        <TableCell>{item.student?.fullName}</TableCell>
                        <TableCell>{item.gradeString}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </Grid>

        </Grid>
        <Link to={"/courses"}>Back to List</Link>

      </div>
      <Footer/>
    </>
  )
}