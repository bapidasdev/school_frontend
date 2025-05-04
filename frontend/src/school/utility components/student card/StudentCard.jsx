/* eslint-disable react/prop-types */

import { Card, Typography, Button, Box, Avatar } from "@mui/material";
import { useEffect } from "react";

export default function StudentCardAdmin({ handleEdit, student, handleDelete }) {
  const convertDate = (dateData) => {
    const date = new Date(dateData);
    const dateNu = date.getDate();
    const month = +date.getMonth() + 1;
    const year = date.getFullYear();
    return dateNu + "/" + month + "/" + year;
  };

  useEffect(() => {
    console.log("Student", student);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "blue",
        borderRadius: "12px",
        p: 3,
        position: "relative",
        overflow: "visible",
        maxWidth: 350,
        mx: "auto",
        my: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "visible",
          textAlign: "center",
          p: 3,
          boxShadow: 3,
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
        <Avatar
          src={`/images/uploaded/student/${student.student_image}`}
          alt={student.name}
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mt: "-60px",
            border: "5px solid white",
          }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mt: 1, color: "#008060" }}
        >
          {student.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
         class: {student.student_class?.class_text || "Class not assigned"}
        </Typography>

        <Box sx={{ textAlign: "left", mt: 2 }}>
          <Typography variant="body2"><b>Age:</b> {student.age}</Typography>
          <Typography variant="body2"><b>Gender:</b> {student.gender}</Typography>
          <Typography variant="body2"><b>Address:</b> {student.address}</Typography>
          <Typography variant="body2"><b>Blood Group:</b> {student.blood_group}</Typography>
          <Typography variant="body2"><b>DOB:</b> {student.dob}</Typography>
          <Typography variant="body2"><b>Guardian:</b> {student.guardian}</Typography>
          <Typography variant="body2"><b>Guardian Phone:</b> {student.guardian_phone}</Typography>
          <Typography variant="body2">
            <b>Admission Date:</b> {convertDate(student.createdAt)}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            variant="contained"
            sx={{ background: "red", color: "#fff" }}
            onClick={() => handleDelete(student._id)}
          >
            Delete
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ background: "gold", color: "#222" }}
            onClick={() => handleEdit(student._id)}
          >
            Edit
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
