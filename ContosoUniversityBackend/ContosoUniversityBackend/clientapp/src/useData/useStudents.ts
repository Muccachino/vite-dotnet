import {useEffect, useState} from "react";
import {IStudent} from "../interfaces/global_interfaces.ts";
import axios from "axios";


export async function getSingleStudent(id: string) {
  const response = await axios.get(`https://localhost:7088/api/Students/${id}`);
  return response.data;
}


export default function useStudents(){
  const [students, setStudents] = useState<IStudent[]>([]);

  useEffect(()=> {
    const connectStudents = async () => {
        const response = await axios.get("https://localhost:7088/api/Students");
        setStudents((await response.data) as IStudent[]);
    }
    connectStudents();
  }, [])


  const editStudents = async (studentToEdit: IStudent) => {
    const response: IStudent = await axios.put(`https://localhost:7088/api/Students/${studentToEdit.id}`, studentToEdit);
    setStudents((prevStudents) =>
      prevStudents.map((prevStudent) => {
        if (prevStudent.id === studentToEdit.id) {
          return response;
        }
        return prevStudent
      })
    )
  }

  const createStudent = async (studentToAdd: IStudent) => {

    const response = await axios.post(`https://localhost:7088/api/Students`, studentToAdd);
    setStudents((prevStudents) => [...prevStudents, response.data]);
  }

  const deleteStudent = async (studentToDelete: IStudent) => {

    const response = await axios.delete(`https://localhost:7088/api/Students/${studentToDelete.id}`);

    if(response.status === 200){
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentToDelete.id))
    }


  }

  return [students, editStudents, createStudent, deleteStudent];
}