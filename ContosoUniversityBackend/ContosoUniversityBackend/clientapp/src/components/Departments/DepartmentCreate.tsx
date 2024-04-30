import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import {Link, useNavigate} from "react-router-dom";
import {IDepartment, IInstructor} from "../../interfaces/global_interfaces.ts";
import  {useState} from "react";
import useDepartments from "../../useData/useDepartments.ts";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import useInstructors from "../../useData/useInstructors.ts";


//TODO: Administrator / Instructor Object input not working

export default function DepartmentCreate() {
  const navigate = useNavigate();
  const [,,createDepartment] = useDepartments()
  const [instructors] = useInstructors() as [instructors: IInstructor[]];
  const [currentDepartment, setCurrentDepartment] = useState<IDepartment>({
    name: "",
    startDate: "2024-01-01",
    budget: 0,
    instructorID: 0,
  });

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Create</h1>
          <h3>Department</h3>
        </div>

        <div style={{ height: "250px", width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>Department Name</FormLabel>
          <Input onChange={(e) => setCurrentDepartment(prevState => ({...prevState, name: (e.target.value)}))}/>
          <FormLabel>Administrator</FormLabel>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size={"small"}
                value={currentDepartment.instructorID}
                onChange={(e) => setCurrentDepartment(prevState => ({...prevState, InstructorId: parseInt(e.target.value as string)}))}
              >
                {instructors.map((instructor, index) => {
                  return (
                    <MenuItem key={index} value={instructor.id}>{instructor.firstMidName + " " + instructor.lastName}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
          <FormLabel>Budget</FormLabel>
          <Input onChange={(e) => setCurrentDepartment(prevState => ({...prevState, budget: parseInt(e.target.value)}))}/>
          <FormLabel>Implementation</FormLabel>
          <Input type={"date"} onChange={(e) => setCurrentDepartment(prevState => ({...prevState, startDate: (e.target.value)}))}/>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (createDepartment as (departmentToCreate: IDepartment) => Promise<void>)(currentDepartment);
            navigate("/departments")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/departments"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}