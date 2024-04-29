import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import {Link, useNavigate} from "react-router-dom";
import {IInstructor} from "../../interfaces/global_interfaces.ts";
import  {useState} from "react";
import useInstructors from "../../useData/useInstructors.ts";


export default function InstructorCreate() {
  const navigate = useNavigate();
  const [,,createInstructor] = useInstructors()
  const [currentInstructor, setCurrentInstructor] = useState<IInstructor>({
    firstMidName: "",
    lastName: "",
    hireDate: "2024-01-01",
    courseAssignments: null,
    officeAssignment: null
  });

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Create</h1>
          <h3>Instructor</h3>
        </div>

        <div style={{ height: "250px", width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>First Name</FormLabel>
          <Input onChange={(e) => setCurrentInstructor(prevState => ({...prevState, firstMidName: (e.target.value)}))}/>
          <FormLabel>Last Name</FormLabel>
          <Input onChange={(e) => setCurrentInstructor(prevState => ({...prevState, lastName: (e.target.value)}))}/>
          <FormLabel>Hire Date</FormLabel>
          <Input onChange={(e) => setCurrentInstructor(prevState => ({...prevState, hireDate: (e.target.value)}))} type="date"/>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (createInstructor as (instructorToAdd: IInstructor) => Promise<void>)(currentInstructor);
            navigate("/instructors")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/instructors"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}