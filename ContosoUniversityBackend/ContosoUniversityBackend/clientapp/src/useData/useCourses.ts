import {useEffect, useState} from "react";
import {ICourse} from "../interfaces/global_interfaces.ts";
import axios from "axios";


export async function getSingleCourse(id: string) {
  const course = await axios.get(`https://localhost:7088/api/courses/${id}`);
  return course.data
}

export async function getCourseTitle(courseID: number) {
  const response = await axios.get(`https://localhost:7088/api/Courses`);
  const data: ICourse[] = response.data;
  let courseTitle: string;
  data.forEach((course) => {
    if(course.courseID === courseID){
      courseTitle = course.title;
    }
  })
  return courseTitle!;
}


export default function useCourses(){
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(()=> {
    const connectCourses = async () => {
      try{
        const response = await axios.get("https://localhost:7088/api/courses");
        if(!(response.status === 200)){
          throw new Error("Failed to connect to server");
        }
        setCourses((await response.data) as ICourse[]);
      } catch (error) {
        console.error(error);
      }
    }
    connectCourses();
  }, [])


  const editCourses = async (courseToEdit: ICourse) => {
    if(!courseToEdit.enrollments){
      courseToEdit.enrollments = [];
    }
    const response: ICourse = await axios.put(`https://localhost:7088/api/courses/${courseToEdit.courseID}`, courseToEdit);
    setCourses((prevCourses) =>
      prevCourses.map((prevCourse) => {
        if (prevCourse.courseID === courseToEdit.courseID) {
          return response;
        }
        return prevCourse
      })
    )
  }

  const createCourse = async (courseToAdd: ICourse) => {
    const response = await axios.post(`https://localhost:7088/api/Courses`, courseToAdd);
    setCourses((prevCourses) => [...prevCourses, response.data]);
  }

  const deleteCourse = async (courseToDelete: ICourse) => {
    const response = await axios.delete(`https://localhost:7088/api/Courses/${courseToDelete.courseID}`);
    if(response.status === 200){
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseID !== courseToDelete.courseID))
    }
  }

  return [courses, editCourses, createCourse, deleteCourse];
}