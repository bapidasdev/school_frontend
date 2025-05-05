import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  Button,
  IconButton,
} from "@mui/material";
import {
  Cake as AgeIcon,
  Wc as GenderIcon,
  School as QualificationIcon,
  Delete,
  Edit,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../environment";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TeacherDetails() {
  const [teacher, setTeacher] = useState(null);

  const getTeacherDetails = () => {
    axios
      .get(`${baseUrl}/teacher/fetch-own`)
      .then((resp) => {
        setTeacher(resp.data.data);
      })
      .catch((e) => {
        console.error("Error fetching teacher:", e);
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
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 3,
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <Card
            sx={{
              width: 500,
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            {/* Gradient Header */}
            <Box
              sx={{
                background: "linear-gradient(90deg, #fc466b 0%, #3f5efb 100%)",
                color: "#fff",
                textAlign: "center",
                py: 4,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <Avatar
                src={
                  teacher.teacher_image
                    ? `/images/uploaded/teacher/${teacher.teacher_image}`
                    : ""
                }
                alt={teacher.name}
                sx={{
                  width: 80,
                  height: 80,
                  border: "3px solid white",
                  margin: "0 auto 12px",
                  fontSize: 28,
                  bgcolor: "#fff",
                  color: "#3f5efb",
                }}
              >
                {!teacher.teacher_image && teacher.name?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                {teacher.name}
              </Typography>
              <Typography variant="body2">{teacher.email}</Typography>
            </Box>

            {/* Info Grid */}
            <Box sx={{ px: 3, py: 3 }}>
              <Grid container spacing={2}>
                <InfoItem icon={<AgeIcon color="secondary" />} label="Age" value={teacher.age} />
                <InfoItem icon={<GenderIcon sx={{ color: "#e91e63" }} />} label="Gender" value={teacher.gender} />
                <Grid item xs={12}>
                  <InfoItem
                    icon={<QualificationIcon sx={{ color: "#4caf50" }} />}
                    label="Qualification"
                    value={teacher.qualification}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Action Buttons */}
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                pb: 3,
                pt: 1,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #ff5c8a, #ff7eb3)",
                  color: "#fff",
                  px: 3,
                  "&:hover": {
                    background: "linear-gradient(135deg, #ff4170, #ff6ca0)",
                  },
                }}
              >
                <DeleteIcon />
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #6a82fb, #fc5c7d)",
                  color: "#fff",
                  px: 3,
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a6edc, #e94e6e)",
                  },
                }}
              >
                <EditIcon />
              </Button>
            </Box> */}
          </Card>
        </Box>
      )}
    </>
  );
}

// Info item subcomponent
function InfoItem({ icon, label, value }) {
  return (
    <Grid item xs={6}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ mr: 1 }}>{icon}</Box>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {label}:
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {value || "-"}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
