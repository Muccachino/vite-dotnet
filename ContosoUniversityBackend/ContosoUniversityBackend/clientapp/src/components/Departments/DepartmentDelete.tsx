import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Button, Divider} from "@mui/joy";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {IDepartment} from "../../interfaces/global_interfaces.ts";
import {Box, Typography} from "@mui/material";
import useDepartments, {getSingleDepartment} from "../../useData/useDepartments.ts";

export async function loader({params}: {params: {id: string}}) {
  const department = await getSingleDepartment(params.id);
  return {department};
}


export default function DepartmentDelete() {
  const {department} = useLoaderData() as {department: IDepartment};
  const navigate = useNavigate();
  const [,,,deleteDepartment] = useDepartments();

  return(
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div className="delete-message">
        <div>
          <h1 style={{marginBottom: "20px"}}>Delete</h1>
          <h2 style={{marginBottom: "20px"}}>
            Are you sure you want to delete this?
          </h2>
          <h3>Department</h3>

          <Divider style={{margin: "40px 0"}}/>
          <Box>
            <Typography variant="h6" fontWeight="bold">Department Name</Typography>
            <Typography variant="body1">{department.name}</Typography>
            <Typography variant="h6" fontWeight="bold">Administrator</Typography>
            <Typography variant="body1">{department.administrator?.fullName}</Typography>
            <Typography variant="h6" fontWeight="bold">Implementation</Typography>
            <Typography variant="body1">{department.startDate.slice(0,10)}</Typography>
          </Box>
          <div className="delete-buttons">
            <Button onClick={() => {
              (deleteDepartment as (departmentToDelete: IDepartment) => Promise<void>)(department);
              navigate("/departments")}}>Confirm</Button>
            <span><Link to={"/departments"}>Cancel</Link></span>
          </div>
        </div>
      </div>
      <Footer/>
    </>

  )
}