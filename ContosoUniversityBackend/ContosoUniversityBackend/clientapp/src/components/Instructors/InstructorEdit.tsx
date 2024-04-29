import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider, FormLabel, Input} from "@mui/joy";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {IInstructor} from "../../interfaces/global_interfaces.ts";
import  {useState} from "react";
import useInstructors, {getSingleInstructor} from "../../useData/useInstructors.ts";

export async function loader({params}: {params: {id: string}}) {
  const instructor = await getSingleInstructor(params.id);
  return {instructor};
}


export default function InstructorEdit() {
  const navigate = useNavigate();
  const {instructor} = useLoaderData() as {instructor: IInstructor};
  const [,editInstructor] = useInstructors();
  const [currentInstructor, setCurrentInstructor] = useState<IInstructor>(instructor);

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Edit</h1>
          <h3>Instructor</h3>
        </div>

        <div style={{ height: "250px", width: "30vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Divider sx={{marginBottom: "20px"}}/>

          <FormLabel>First Name</FormLabel>
          <Input value={currentInstructor.firstMidName} onChange={(e) => setCurrentInstructor(prevState => ({...prevState, firstMidName: (e.target.value)}))}/>
          <FormLabel>Last Name</FormLabel>
          <Input value={currentInstructor.lastName} onChange={(e) => setCurrentInstructor(prevState => ({...prevState, lastName: (e.target.value)}))}/>
          <FormLabel>Hire Date</FormLabel>
          <Input value={currentInstructor.hireDate.slice(0,10)} onChange={(e) => setCurrentInstructor(prevState => ({...prevState, hireDate: (e.target.value)}))} type="date"/>
        </div>

        <div>
          <Button sx={{marginTop: "30px"}} onClick={() => {
            (editInstructor as (instructorToEdit: IInstructor) => Promise<void>)(currentInstructor);
            navigate("/instructors")}}>Save</Button>
          <span style={{marginLeft: "30px"}}><Link to={"/instructors"}>Back to List</Link></span>
        </div>
      </div>
      <Footer/>
    </>
  )
}