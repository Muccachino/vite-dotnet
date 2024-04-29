import {useEffect, useState} from "react";
import {IDepartment} from "../interfaces/global_interfaces.ts";
import axios from "axios";


export async function getSingleDepartment(id: string) {
  const response = await axios.get(`https://localhost:7088/api/Departments/${id}`);
  return response.data;
}


export default function useDepartments(){
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(()=> {
    const connectDepartments = async () => {
      const response = await axios.get("https://localhost:7088/api/Departments");
      setDepartments((await response.data) as IDepartment[]);
    }
    connectDepartments();
  }, [])


  const editDepartments = async (departmentToEdit: IDepartment) => {
    const response: IDepartment = await axios.put(`https://localhost:7088/api/Departments/${departmentToEdit.departmentID}`, departmentToEdit);
    setDepartments((prevDepartments) =>
      prevDepartments.map((prevDepartment) => {
        if (prevDepartment.departmentID === departmentToEdit.departmentID) {
          return response;
        }
        return prevDepartment
      })
    )
  }

  const createDepartment = async (departmentToAdd: IDepartment) => {

    const response = await axios.post(`https://localhost:7088/api/Departments`, departmentToAdd);
    setDepartments((prevDepartments) => [...prevDepartments, response.data]);
  }

  const deleteDepartment = async (departmentToDelete: IDepartment) => {

    const response = await axios.delete(`https://localhost:7088/api/Departments/${departmentToDelete.departmentID}`);

    if(response.status === 200){
      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department.departmentID !== departmentToDelete.departmentID))
    }


  }

  return [departments, editDepartments, createDepartment, deleteDepartment];
}