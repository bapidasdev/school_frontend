import {
  Avatar,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../environment";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

export default function StudentDetails() {
  const [student, setStudent] = useState(null);

  const getStudentDetails = () => {
    axios
      .get(`${baseUrl}/student/fetch-own`)
      .then((resp) => {
        setStudent(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in student", e);
      });
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  return (
    <>
      {student && (
        <Box
          sx={{
            maxWidth: 800,
            margin: "40px auto",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            
          }}
        >
          {/* Header with gradient */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              background: "linear-gradient(90deg, #f54ea2, #ff7676, #6a82fb)",
              color: "#fff",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={`/images/uploaded/student/${student.student_image}`}
              alt="Student"
              sx={{
                width: 100,
                height: 100,
                border: "4px solid white",
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {student.name}
              </Typography>
              <Typography>{student.email}</Typography>
            </Box>
          </Box>

          {/* Detail Cards */}
          <Box sx={{ padding: 3 }}>
            <Grid container spacing={2}>
              <DetailCard
                icon={<CakeIcon sx={{ color: "#673ab7" }} />}
                label="Age"
                value={student.age}
              />
              <DetailCard
                icon={<WcIcon sx={{ color: "#e91e63" }} />}
                label="Gender"
                value={student.gender}
              />
              <DetailCard
                icon={<PersonIcon sx={{ color: "#00bcd4" }} />}
                label="Guardian"
                value={student.guardian}
              />
              <DetailCard
                icon={<SchoolIcon sx={{ color: "#4caf50" }} />}
                label="Class"
                value={student.student_class.class_text}
              />
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

// Card component
function DetailCard({ icon, label, value }) {
  return (
    <Grid item xs={12} sm={6}>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          borderRadius: 3,
          gap: 2,
        }}
      >
        <Box>{icon}</Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, color: "#666" }}
          >
            {label}
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {value}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}
