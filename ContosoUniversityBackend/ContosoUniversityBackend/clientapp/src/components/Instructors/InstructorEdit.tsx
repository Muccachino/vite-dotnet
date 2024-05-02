import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel} from "@mui/joy";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {ICourse, IInstructor} from "../../interfaces/global_interfaces.ts";
import {ChangeEvent, useEffect, useState} from "react";
import useInstructors, {getSingleInstructor} from "../../useData/useInstructors.ts";
import useCourses from "../../useData/useCourses.ts";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, TextField} from "@mui/material";

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
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [hireDateError, setHireDateError] = useState(false);
  const [officeError, setOfficeError] = useState(false);
  const [coursesError, setCoursesError] = useState(false);
  const [createError, setCreateError] = useState(false);


  function handleCourseCheckboxes(checked: boolean ,courseID: number) {
    setCreateError(false);
    setCoursesError(false);
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


  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentInstructor(prevState => ({...prevState, firstMidName: (e.target.value)}))
    e.target.validity.valid ? setFirstNameError(false) : setFirstNameError(true);
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentInstructor(prevState => ({...prevState, lastName: (e.target.value)}))
    e.target.validity.valid ? setLastNameError(false) : setLastNameError(true);
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setCreateError(false);
    setCurrentInstructor(prevState => ({...prevState, hireDate: (e.target.value)}))
    e.target.validity.valid ? setHireDateError(false) : setHireDateError(true);
  }

  function handleOfficeChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentInstructor(prevState => ({...prevState, officeAssignment: {location:(e.target.value)}}))
    e.target.validity.valid ? setOfficeError(false) : setOfficeError(true);
  }

  function handleSubmit(){
    if(!firstNameError && !lastNameError &&
      !hireDateError &&
      !officeError &&
      currentInstructor.firstMidName !== "" &&
      currentInstructor.lastName !== "" &&
      currentInstructor.hireDate !== "" &&
      currentInstructor.courseIds!.length !== 0){
      const editedInstructor: IInstructor = {
        id: currentInstructor.id,
        firstMidName: currentInstructor.firstMidName,
        lastName: currentInstructor.lastName,
        hireDate: currentInstructor.hireDate,
        officeAssignment: {location: currentInstructor.officeAssignment!.location},
        courseIds: currentInstructor.courseIds
      };
      (editInstructor as (instructorToEdit: IInstructor) => Promise<void>)(editedInstructor);
      navigate("/instructors")
    } else {
      if (currentInstructor.courseIds!.length === 0){
        setCoursesError(true);
      }
      setCreateError(true);
    }
  }

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
          <TextField
            value={currentInstructor.firstMidName}
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleFirstNameChange(e)}
            error={firstNameError}
            helperText={firstNameError ? "Please enter a first name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}/>

          <FormLabel>Last Name</FormLabel>
          <TextField
            value={currentInstructor.lastName}
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleLastNameChange(e)}
            error={lastNameError}
            helperText={lastNameError ? "Please enter a last name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}/>

          <FormLabel>Hire Date</FormLabel>
          <TextField
            value={currentInstructor.hireDate.slice(0,10)}
            required
            size={"small"}
            type={"date"}
            onChange={(e) => handleDateChange(e)}
            error={hireDateError}
            helperText={hireDateError ? "Please enter a valid date" : ""}/>

          <FormLabel>Office</FormLabel>
          <TextField
            value={currentInstructor.officeAssignment?.location}
            size={"small"}
            onChange={(e) => handleOfficeChange(e)}
            error={officeError}
            helperText={officeError ? "Please enter a valid office name" : ""}
            inputProps={{pattern: "^[a-zA-Z0-9_ -]*$"}}/>

          <FormLabel>Courses Taught</FormLabel>
          <FormGroup sx={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
            {courses.map(course => {
              return <FormControlLabel key={course.courseID}
                                       control={<Checkbox checked={selectedCourses.includes(course.courseID)}
                                                          onChange={(e) => handleCourseCheckboxes(e.target.checked, course.courseID)}/>}
                                       label={course.title} />})}
          </FormGroup>
          {coursesError &&
              <FormHelperText style={{color: "red", marginTop: "20px"}}>Choose at least one course!</FormHelperText>}
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => handleSubmit()}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/instructors"}>Back to List</Link></span>
          {createError &&
              <p style={{color: "red", marginTop: "20px"}}>One or more inputs are invalid !</p>}
        </div>
      </div>
      <Footer/>
    </>
  )
}