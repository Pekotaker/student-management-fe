import React, { useState } from "react";
import { assignTeacherToClass } from "../services/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AdminAssign() {
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

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Assign Teacher to Class
      </Typography>
      <form onSubmit={handleAssign}>
        <TextField
          label="Teacher ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />
        <TextField
          label="Class ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Assign
        </Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </div>
  );
}

export default AdminAssign;
