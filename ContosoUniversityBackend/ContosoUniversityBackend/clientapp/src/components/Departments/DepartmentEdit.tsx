import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import { IDepartment, IInstructor} from "../../interfaces/global_interfaces.ts";
import  {useState} from "react";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
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
          <Input value={currentDepartment.name} onChange={(e) => setCurrentDepartment(prevState => ({...prevState, name: (e.target.value)}))}/>
          <FormLabel>Administrator</FormLabel>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size={"small"}
                value={currentDepartment.instructorID}
                onChange={(e) => setCurrentDepartment(prevState => ({...prevState, instructorID: parseInt(e.target.value as string)}))}
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
          <Input value={currentDepartment.budget} onChange={(e) => setCurrentDepartment(prevState => ({...prevState, budget: parseInt(e.target.value)}))}/>
          <FormLabel>Implementation</FormLabel>
          <Input type={"date"} value={currentDepartment.startDate.slice(0,10)} onChange={(e) => setCurrentDepartment(prevState => ({...prevState, startDate: (e.target.value)}))}/>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (editDepartment as (departmentToEdit: IDepartment) => Promise<void>)(currentDepartment);
            navigate("/departments")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/departments"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}