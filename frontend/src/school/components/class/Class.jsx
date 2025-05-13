/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CardMedia,
  Paper,
  TextField,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  IconButton,
  CircularProgress,
  CardContent,
  Stack,
  Divider,
  CardActions,
  Card, // <- loader
} from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import { studentSchema } from "../../../yupSchema/studentSchema";
import StudentCardAdmin from "../../utility components/student card/StudentCard";
import { classSchema } from "../../../yupSchema/classSchema";
import { Link } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Class() {
  const [studentClass, setStudentClass] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // <- loader state

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`${baseUrl}/class/delete/${id}`)
        .then((resp) => {
          setMessage(resp.data.message);
          setType("success");
        })
        .catch((e) => {
          setMessage(e.response.data.message);
          setType("error");
          console.log("Error, deleting", e);
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Handle  Edit is called", id);
    setEdit(true);
    axios
      .get(`${baseUrl}/class/fetch-single/${id}`)
      .then((resp) => {
        formik.setFieldValue("class_num", resp.data.data.class_num);
        formik.setFieldValue("class_text", resp.data.data.class_text);
        setEditId(resp.data.data._id);
      })
      .catch((e) => {
        console.log("Error  in fetching edit data.");
      });
  };

  const cancelEdit = () => {
    setEdit(false);
    formik.resetForm();
  };

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // fixed typo

  const resetMessage = () => {
    setMessage("");
  };

  const initialValues = {
    class_num: "",
    class_text: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: classSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      const apiCall = isEdit
        ? axios.patch(`${baseUrl}/class/update/${editId}`, values)
        : axios.post(`${baseUrl}/class/create`, values);

      apiCall
        .then((resp) => {
          setMessage(resp.data.message);
          setType("success");
          if (isEdit) {
            cancelEdit();
          } else {
            formik.resetForm();
          }
          fetchstudentsClass();
        })
        .catch((e) => {
          setMessage(e.response?.data?.message || "Something went wrong");
          setType("error");
          console.log("Submission error:", e);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const fetchStudentClass = () => {
    // Placeholder
  };

  const fetchstudentsClass = () => {
    axios
      .get(`${baseUrl}/class/fetch-all`)
      .then((resp) => {
        setStudentClass(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching casting calls admin data", e);
      });
  };

  useEffect(() => {
    fetchstudentsClass();
    fetchStudentClass();
  }, [message]);

  return (
    <>
      {message && (
        <CustomizedSnackbars
          reset={resetMessage}
          type={type}
          message={message}
        />
      )}
      <Box sx={{ padding: "40px 10px 20px 10px" }}>
      

        <Box component={"div"} sx={{ padding: "40px" }}>
          <Paper sx={{ padding: "20px", margin: "10px" }}>
            {isEdit ? (
              <Typography
                variant="h4"
                sx={{ fontWeight: "800", textAlign: "center" }}
              >
                Edit Class
              </Typography>
            ) : (
              <Typography
                variant="h4"
                sx={{ fontWeight: "800", textAlign: "center" }}
              >
                Add New  Class
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="class_text"
                label="Class Text "
                variant="outlined"
                name="class_text"
                value={formik.values.class_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.class_text && formik.errors.class_text && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.class_text}
                </p>
              )}

              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="class_num"
                label="Class Number "
                variant="outlined"
                name="class_num"
                value={formik.values.class_num}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.class_num && formik.errors.class_num && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.class_num}
                </p>
              )}

              <Box sx={{ marginTop: "10px" }} component={"div"}>
                <Button
                  type="submit"
                  sx={{ marginRight: "10px" }}
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>
                {isEdit && (
                  <Button
                    sx={{ marginRight: "10px" }}
                    variant="outlined"
                    onClick={cancelEdit}
                  >
                    Cancel Edit
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>

       
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
          {studentClass.map((value) => (
            <Card
              key={value._id}
              sx={{
                width: 300,
                borderRadius: 3,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" color="primary">
                    Class: {value.class_text} [{value.class_num}]
                  </Typography>
                  <Divider />
                  <Typography variant="body1" color="text.secondary">
                    {value.message}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <IconButton onClick={() => handleEdit(value._id)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(value._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
