import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel} from "@mui/joy";
import {Link, useNavigate} from "react-router-dom";
import {IDepartment, IInstructor} from "../../interfaces/global_interfaces.ts";
import {ChangeEvent, useState} from "react";
import useDepartments from "../../useData/useDepartments.ts";
import {Box, FormControl, MenuItem, TextField} from "@mui/material";
import useInstructors from "../../useData/useInstructors.ts";



export default function DepartmentCreate() {
  const navigate = useNavigate();
  const [,,createDepartment] = useDepartments()
  const [instructors] = useInstructors() as [instructors: IInstructor[]];
  const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({
    name: "",
    startDate: "",
    budget: 0,
    instructorID: 0,
  });
  const [nameError, setNameError] = useState<boolean>(false);
  const [budgetError, setBudgetError] = useState<boolean>(false);
  const [adminError, setAdminError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [createError, setCreateError] = useState<boolean>(false);

function handleNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  setCreateError(false);
  setCurrentDepartment(prevState => ({...prevState, name: (e.target.value)}))
  e.target.validity.valid ? setNameError(false) : setNameError(true);
}

function handleBudgetChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
  setCreateError(false);
  setCurrentDepartment(prevState => ({...prevState, budget: parseInt(e.target.value)}))
  e.target.validity.valid ? setBudgetError(false) : setBudgetError(true);
}

function handleAdministratorChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
  setCreateError(false);
  setCurrentDepartment(prevState => ({...prevState, instructorID: parseInt(e.target.value as string)}))
  parseInt(e.target.value) !== 0 ? setAdminError(false) : setAdminError(true);
}

function handleDateChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
  setCreateError(false);
  setCurrentDepartment(prevState => ({...prevState, startDate: (e.target.value)}))
  e.target.validity.valid ? setDateError(false) : setDateError(true);
}

function handleSubmit(){
  if(!nameError && !budgetError &&
    !adminError &&
    !dateError &&
    currentDepartment.name !== "" &&
    currentDepartment.instructorID !== 0 &&
    currentDepartment.budget !== 0 &&
    currentDepartment.startDate !== ""){
    (createDepartment as (departmentToCreate: IDepartment) => Promise<void>)(currentDepartment);
    navigate("/departments")
  } else {
    setCreateError(true);
  }
}

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Create</h1>
          <h3>Department</h3>
        </div>

        <div style={{ width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>Department Name</FormLabel>
          <TextField
            hiddenLabel
            size={"small"}
            variant="outlined"
            required
            onChange={(e) => handleNameChange(e)}
            error={nameError}
            helperText={nameError ? "Please enter your name (letters and spaces only)" : ""}
            inputProps={{pattern: "[A-Za-z ]+",}}
          />
          <FormLabel>Administrator</FormLabel>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <TextField
                select
                required
                size={"small"}
                error={adminError}
                helperText={adminError ? "Choose an Administrator!" : ""}
                value={currentDepartment.instructorID?.toString()}
                onChange={(e) => handleAdministratorChange(e)}
              >
                <MenuItem value={0}>-- Choose an Administrator --</MenuItem>
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
            required
            size={"small"}
            type={"date"}
            onChange={(e) => handleDateChange(e)}
            error={dateError}
            helperText={dateError ? "Please enter a valid date" : ""}/>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => handleSubmit()}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/departments"}>Back to List</Link></span>
          {createError &&
              <p style={{color: "red", marginTop: "20px"}}>One or more inputs are invalid !</p>}
        </div>
      </div>
      <Footer/>
    </>
  )
}