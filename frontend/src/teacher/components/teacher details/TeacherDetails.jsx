import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import {
  Cake as AgeIcon,
  Wc as GenderIcon,
  School as QualificationIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../environment";

export default function TeacherDetails() {
  const [teacher, setTeacher] = useState(null);

  const getTeacherDetails = () => {
    axios
      .get(`${baseUrl}/teacher/fetch-own`)
      .then((resp) => {
        setTeacher(resp.data.data);
        console.log("Single Teacher Details from Teacher Details page", resp);
      })
      .catch((e) => {
        console.log("Error in teacher", e);
      });
  };

  useEffect(() => {
    getTeacherDetails();
  }, []);

  return (
    <>
      {teacher && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "100vh",
            background: "#f8f9fa",
            p: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 800,
              borderRadius: 5,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                background: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)",
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  width: 140,
                  height: 160,
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "4px solid #ffffff",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
              >
                <Avatar
                  src={`/images/uploaded/teacher/${teacher.teacher_image}`}
                  alt="Teacher"
                  variant="square"
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Box sx={{ textAlign: { xs: "center", sm: "left" }, mt: { xs: 2, sm: 0 } }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {teacher.name}
                </Typography>
                <Typography variant="body2">{teacher.email}</Typography>
              </Box>
            </Box>

            {/* Details Section */}
            <CardContent sx={{ background: "#fafafa" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InfoCard
                    icon={<AgeIcon sx={{ color: "#3f5efb" }} />}
                    label="Age"
                    value={teacher.age}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoCard
                    icon={<GenderIcon sx={{ color: "#fc466b" }} />}
                    label="Gender"
                    value={teacher.gender}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoCard
                    icon={<QualificationIcon sx={{ color: "#00b894" }} />}
                    label="Qualification"
                    value={teacher.qualification}
                  />
                </Grid>
              </Grid>

             
             
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

// Info Card component
function InfoCard({ icon, label, value }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "#ffffff",
        borderLeft: "6px solid #3f5efb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Box sx={{ mr: 2 }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value || "-"}
        </Typography>
      </Box>
    </Paper>
  );
}