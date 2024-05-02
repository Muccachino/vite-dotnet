import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel} from "@mui/joy";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import { IDepartment, IInstructor} from "../../interfaces/global_interfaces.ts";
import {ChangeEvent, useState} from "react";
import {Box, FormControl, MenuItem, TextField} from "@mui/material";
import useDepartments, {getSingleDepartment} from "../../useData/useDepartments.ts";
import useInstructors from "../../useData/useInstructors.ts";

export async function loader({params}: {params: {id: string}}) {
  const department = await getSingleDepartment(params.id);
  return {department};
}


export default function DepartmentEdit() {
  const navigate = useNavigate();
  const {department} = useLoaderData() as {department: IDepartment};
  const [,editDepartment] = useDepartments()
  const [instructors] = useInstructors() as [instructors: IInstructor[]];
  const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({
    departmentID: department.departmentID,
    name: department.name,
    startDate: department.startDate,
    budget: department.budget,
    instructorID: department.instructorID});
  const [nameError, setNameError] = useState<boolean>(false);
  const [budgetError, setBudgetError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<boolean>(false);

  function handleNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdateError(false);
    setCurrentDepartment(prevState => ({...prevState, name: (e.target.value)}))
    e.target.validity.valid ? setNameError(false) : setNameError(true);
  }

  function handleBudgetChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setUpdateError(false);
    setCurrentDepartment(prevState => ({...prevState, budget: parseInt(e.target.value)}))
    e.target.validity.valid ? setBudgetError(false) : setBudgetError(true);
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setUpdateError(false);
    setCurrentDepartment(prevState => ({...prevState, startDate: (e.target.value)}))
    e.target.validity.valid ? setDateError(false) : setDateError(true);
  }

  function handleSubmit(){
    if(!nameError && !budgetError &&
      !dateError &&
      currentDepartment.name !== "" &&
      currentDepartment.instructorID !== 0 &&
      currentDepartment.budget !== 0 &&
      currentDepartment.startDate !== ""){
      (editDepartment as (departmentToEdit: IDepartment) => Promise<void>)(currentDepartment);
      navigate("/departments")
    } else {
      setUpdateError(true);
    }
  }


  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Edit</h1>
          <h3>Department</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>Department Name</FormLabel>
          <TextField
            value={currentDepartment.name}
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleNameChange(e)}
            error={nameError}
            helperText={nameError ? "Please enter a name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}/>
          <FormLabel>Administrator</FormLabel>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <TextField
                select
                size={"small"}
                value={currentDepartment.instructorID}
                onChange={(e) => setCurrentDepartment(prevState => ({...prevState, instructorID: parseInt(e.target.value as string)}))}
              >
                {instructors.map((instructor, index) => {
                  return (
                    <MenuItem key={index} value={instructor.id}>{instructor.firstMidName + " " + instructor.lastName}</MenuItem>
                  )
                })}
              </TextField>
            </FormControl>
          </Box>
          <FormLabel>Budget</FormLabel>
          <TextField
            value={currentDepartment.budget}
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleBudgetChange(e)}
            error={budgetError}
            helperText={budgetError ? "Numbers Only!" : ""}
            inputProps={{pattern: "^[0-9]{1,45}$",}}/>
          <FormLabel>Implementation</FormLabel>
          <TextField
            type={"date"}
            value={currentDepartment.startDate.slice(0,10)}
            required
            size={"small"}
            onChange={(e) => handleDateChange(e)}
            error={dateError}
            helperText={dateError ? "Please enter a valid date" : ""}/>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => handleSubmit()}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/departments"}>Back to List</Link></span>
          {updateError &&
              <p style={{color: "red", marginTop: "20px"}}>One or more inputs are invalid !</p>}
        </div>
      </div>
      <Footer/>
    </>
  )
}