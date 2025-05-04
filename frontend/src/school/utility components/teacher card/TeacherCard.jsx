/* eslint-disable react/prop-types */

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#fff",
  boxShadow: "none",
  textTransform: "uppercase",
}));

export default function TeacherCardAdmin({
  handleEdit,
  teacher,
  handleDelete,
}) {
  const convertDate = (dateData) => {
    const date = new Date(dateData);
    const dateNu = date.getDate();
    const month = +date.getMonth() + 1;
    const year = date.getFullYear();

    return dateNu + "/" + month + "/" + year;
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        alt={teacher.name}
        image={`/images/uploaded/teacher/${teacher.teacher_image}`}
        sx={{
          borderRadius: "8px 8px 0 0",
          objectFit: "cover", // This ensures the image covers the area without being distorted
          height: "200px", // Fixed height
        }}
      />
      <CardContent sx={{ padding: 3 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          <b>Name :</b> <span>{teacher.name}</span>
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          <b>Email :</b> {teacher.email}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          <b>Age :</b> {teacher.age}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          <b>Gender :</b> {teacher.gender}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          <b>Qualification:</b> {teacher.qualification}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          <b>Date of Join:</b> <span>{convertDate(teacher.createdAt)}</span>
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
        <Button
          size="small"
          variant="contained"
          color="error"
          sx={{ width: "45%" }}
          onClick={() => {
            handleDelete(teacher._id);
          }}
        >
          Delete
        </Button>
        <Button
          size="small"
          variant="contained"
          color="warning"
          sx={{ width: "45%" }}
          onClick={() => {
            handleEdit(teacher._id);
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
