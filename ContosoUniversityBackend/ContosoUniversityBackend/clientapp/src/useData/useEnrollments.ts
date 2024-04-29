import axios from "axios";

export async function getSingleEnrollment(id: string) {
  const response = await axios.get(`https://localhost:44395/api/Students/${id}`);
  return response.data;
}