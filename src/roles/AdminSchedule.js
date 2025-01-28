import React, { useState } from "react";
import { createSchedule } from "../services/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AdminSchedule() {
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

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Create Schedule
      </Typography>
      <form onSubmit={handleCreate}>
        <TextField
          label="Class ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <TextField
          label="Time Slot (1-7)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </div>
  );
}

export default AdminSchedule;
