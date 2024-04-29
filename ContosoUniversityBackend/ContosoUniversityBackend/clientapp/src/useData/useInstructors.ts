import {useEffect, useState} from "react";
import {IInstructor} from "../interfaces/global_interfaces.ts";
import axios from "axios";


export async function getSingleInstructor(id: string) {
  const response = await axios.get(`https://localhost:44395/api/Instructors/${id}`);
  return response.data;
}


export default function useInstructors(){
  const [instructors, setInstructors] = useState<IInstructor[]>([]);

  useEffect(()=> {
    const connectInstructors = async () => {
      const response = await axios.get("https://localhost:44395/api/Instructors");
      setInstructors((await response.data) as IInstructor[]);
    }
    connectInstructors();
  }, [])


  const editInstructors = async (instructorToEdit: IInstructor) => {
    const response: IInstructor = await axios.put(`https://localhost:44395/api/Instructors/${instructorToEdit.id}`, instructorToEdit);
    setInstructors((prevInstructors) =>
      prevInstructors.map((prevInstructor) => {
        if (prevInstructor.id === instructorToEdit.id) {
          return response;
        }
        return prevInstructor
      })
    )
  }

  const createInstructor = async (instructorToAdd: IInstructor) => {

    const response = await axios.post(`https://localhost:44395/api/Instructors`, instructorToAdd);
    setInstructors((prevInstructors) => [...prevInstructors, response.data]);
  }

  const deleteInstructor = async (instructorToDelete: IInstructor) => {

    const response = await axios.delete(`https://localhost:44395/api/Instructors/${instructorToDelete.id}`);

    if(response.status === 200){
      setInstructors((prevInstructors) =>
        prevInstructors.filter((instructor) => instructor.id !== instructorToDelete.id))
    }


  }

  return [instructors, editInstructors, createInstructor, deleteInstructor];
}