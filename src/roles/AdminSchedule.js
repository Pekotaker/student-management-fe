import React, { useEffect, useState } from "react";
import { createSchedule, getClasses, getSubjects } from "../services/api";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AdminSchedule() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);


  const [classId, setClassId] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await createSchedule(
        { class_id: classId, time_slot: timeSlot, subject },
        token
      );
      setMessage("Schedule created successfully");
    } catch (err) {
      setMessage("Error creating schedule");
    }
  }

  // Fetch classes and subjects from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const classesResponse = await getClasses(token);
        const subjectsResponse = await getSubjects(token);
        setClasses(classesResponse.data);
        setSubjects(subjectsResponse.data);
      } catch (err) {
        console.error("Error fetching classes or subjects", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Create Schedule
      </Typography>
      <form onSubmit={handleCreate}>
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Time Slot</InputLabel>
          <Select
            value={timeSlot}
            label="Time Slot"
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            {[...Array(7)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Subject</InputLabel>
          <Select
            value={subject}
            label="Subject"
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects.map((subjectItem) => (
              <MenuItem key={subjectItem.id} value={subjectItem.id}>
                {`${subjectItem.name} (ID: ${subjectItem.id})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </div>
  );
}

export default AdminSchedule;
