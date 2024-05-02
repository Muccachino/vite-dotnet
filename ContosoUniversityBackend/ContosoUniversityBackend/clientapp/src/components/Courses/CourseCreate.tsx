import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel} from "@mui/joy";
import useCourses from "../../useData/useCourses.ts";
import {Link, useNavigate} from "react-router-dom";
import {ICourse, IDepartment} from "../../interfaces/global_interfaces.ts";
import {ChangeEvent, useState} from "react";
import {FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField} from "@mui/material";
import useDepartments from "../../useData/useDepartments.ts";


export default function CourseCreate() {
  const navigate = useNavigate();
  const [,,createCourse] = useCourses()
  const [departments] = useDepartments()
  const [currentCourse, setCurrentCourse] = useState<ICourse>({
    courseID: 0,
    title: "",
    credits: 0,
    departmentID: 0
    });
  const [numberError, setNumberError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [creditsError, setCreditsError] = useState<boolean>(false);
  const [departmentError, setDepartmentError] = useState<boolean>(false);
  const [createError, setCreateError] = useState<boolean>(false);

  function handleCourseNumberChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentCourse(prevState => ({...prevState, courseID: parseInt(e.target.value)}))
    e.target.validity.valid ? setNumberError(false) : setNumberError(true);
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentCourse(prevState => ({...prevState, title: (e.target.value)}))
    e.target.validity.valid ? setTitleError(false) : setTitleError(true);
  }

  function handleCreditsChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setCurrentCourse(prevState => ({...prevState, credits: parseInt(e.target.value)}))
    e.target.validity.valid ? setCreditsError(false) : setCreditsError(true);
  }

  function handleDepartmentChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCreateError(false);
    setDepartmentError(false);
    setCurrentCourse(prevState => ({...prevState, departmentID: parseInt(e.target.value)}))
  }

  function handleSubmit(){
    if(!numberError &&
      !titleError &&
      !creditsError &&
      currentCourse.courseID !== 0 &&
      currentCourse.title !== "" &&
      currentCourse.credits !== 0 &&
      currentCourse.departmentID !== 0){
      (createCourse as (courseToCreate: ICourse) => Promise<void>)(currentCourse);
      navigate("/courses")
    } else {
      if (currentCourse.departmentID === 0){
        setDepartmentError(true);
      }
      setCreateError(true);
    }
  }

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Create</h1>
          <h3>Course</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>Course Number</FormLabel>
          <TextField
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleCourseNumberChange(e)}
            error={numberError}
            helperText={numberError ? "Numbers Only!" : ""}
            inputProps={{pattern: "^[0-9]{1,45}$",}}/>

          <FormLabel>Title</FormLabel>
          <TextField
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleTitleChange(e)}
            error={titleError}
            helperText={titleError ? "Please enter a title (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}} />

          <FormLabel>Credits</FormLabel>
          <TextField
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleCreditsChange(e)}
            error={creditsError}
            helperText={creditsError ? "Choose a number between 1 and 5!" : ""}
            inputProps={{pattern: "^[1-5]{1}",}}/>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Department</FormLabel>
            <RadioGroup
              name="radio-buttons-group"
              onChange={(e) => handleDepartmentChange(e)}
            >
              {(departments as IDepartment[]).map(department => {
                return(
                  <FormControlLabel key={department.departmentID} value={department.departmentID} control={<Radio />} label={department.name} />
                )
              })}
            </RadioGroup>
            {departmentError &&
            <FormHelperText sx={{color: "red", marginTop: "20px"}}>Choose a Department</FormHelperText>}
          </FormControl>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => handleSubmit()}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/courses"}>Back to List</Link></span>
          {createError &&
              <p style={{color: "red", marginTop: "20px"}}>One or more inputs are invalid !</p>}
        </div>
      </div>
      <Footer/>
    </>
  )
}