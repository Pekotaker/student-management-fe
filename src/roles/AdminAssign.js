import React, { useEffect, useState } from "react";
import { assignTeacherToClass, getTeachers, getClasses } from "../services/api";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function AdminAssign() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [message, setMessage] = useState("");

  async function handleAssign(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await assignTeacherToClass(
        { teacher_id: teacherId, class_id: classId },
        token
      );
      setMessage("Teacher assigned successfully");
    } catch (err) {
      setMessage("Error assigning teacher");
    }
  }

  // Fetch teachers and classes from the API (this should be done in a useEffect in a real app)
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const teachersResponse = await getTeachers(token);
        const classesResponse = await getClasses(token);
        setTeachers(teachersResponse.data);
        setClasses(classesResponse.data);
      } catch (err) {
        console.error("Error fetching teachers or classes", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Assign Teacher to Class
      </Typography>
      <form onSubmit={handleAssign}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Teacher</InputLabel>
          <Select
            value={teacherId}
            label="Teacher"
            onChange={(e) => setTeacherId(e.target.value)}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.teacher_id} value={teacher.teacher_id}>
                {`${teacher.name} (ID: ${teacher.teacher_id})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Class</InputLabel>
            <Select
              value={classId}
              label="Class"
              onChange={(e) => setClassId(e.target.value)}
              >
              {classes.map((classItem) => (
                <MenuItem key={classItem.id} value={classItem.id}>
                  {`${classItem.name} (ID: ${classItem.id})`}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Assign
        </Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </div>
  );
}

export default AdminAssign;
