import { Card, Typography, Button, Box, Avatar, Grid } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        maxWidth: 500,
        mx: "auto",
        my: 3,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #ff5f6d, #ffc371, #7F00FF)",
          color: "#fff",
          textAlign: "center",
          p: 4,
          position: "relative",
        }}
      >
        <Avatar
          src={`/images/uploaded/student/${student.student_image}`}
          alt={student.name}
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            border: "4px solid #fff",
            mb: 1,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {student.name}
        </Typography>
        <Typography variant="subtitle2">{student.email || "No Email"}</Typography>
      </Box>

      {/* Info Section */}
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CakeIcon color="secondary" />
            <Typography variant="body2"><b>Age:</b> {student.age}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WcIcon color="secondary" />
            <Typography variant="body2"><b>Gender:</b> {student.gender}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon color="secondary" />
            <Typography variant="body2"><b>Address:</b> {student.address}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BloodtypeIcon color="error" />
            <Typography variant="body2"><b>Blood Group:</b> {student.blood_group}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarTodayIcon color="primary" />
            <Typography variant="body2"><b>DOB:</b> {student.dob}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon color="primary" />
            <Typography variant="body2"><b>Guardian:</b> {student.guardian}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneIcon color="primary" />
            <Typography variant="body2"><b>Phone:</b> {student.guardian_phone}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SchoolIcon color="success" />
            <Typography variant="body2">
              <b>Class:</b> {student.student_class?.class_text || "Class not assigned"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            <b>Admission Date:</b> {convertDate(student.createdAt)}
          </Typography>
        </Grid>
      </Grid>

      {/* Action Buttons */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          pb: 3,
          pt: 1,
        }}
      >
        <Button
          size="small"
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #ff5c8a, #ff7eb3)",
            color: "#fff",
            px: 3,
            "&:hover": {
              background: "linear-gradient(135deg, #ff4170, #ff6ca0)",
            },
          }}
          onClick={() => handleDelete(student._id)}
        >
          <DeleteIcon />
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #6a82fb, #fc5c7d)",
            color: "#fff",
            px: 3,
            "&:hover": {
              background: "linear-gradient(135deg, #5a6edc, #e94e6e)",
            },
          }}
          onClick={() => handleEdit(student._id)}
        >
          <EditIcon />
        </Button>
      </Box>

    </Card>
  );
}