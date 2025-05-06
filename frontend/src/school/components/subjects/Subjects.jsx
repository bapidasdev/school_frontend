import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import { subjectSchema } from "../../../yupSchema/subjectSchema";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Subject() {
  const [studentSubject, setStudentSubject] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // loader state

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`${baseUrl}/subject/delete/${id}`)
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
    setEdit(true);
    axios.get(`${baseUrl}/subject/fetch-single/${id}`)
      .then((resp) => {
        Formik.setFieldValue("subject_name", resp.data.data.subject_name);
        Formik.setFieldValue("subject_codename", resp.data.data.subject_codename);
        setEditId(resp.data.data._id);
      })
      .catch((e) => {
        console.log("Error  in fetching edit data.");
      });
  };

  const cancelEdit = () => {
    setEdit(false);
    Formik.resetForm();
  };

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const resetMessage = () => {
    setMessage("");
  };

  const initialValues = {
    subject_name: "",
    subject_codename: ""
  };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: subjectSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      if (isEdit) {
        axios
          .patch(`${baseUrl}/subject/update/${editId}`, values)
          .then((resp) => {
            setMessage(resp.data.message);
            setType("success");
            cancelEdit();
          })
          .catch((e) => {
            setMessage(e.response.data.message);
            setType("error");
            console.log("Error, edit casting submit", e);
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      } else {
        axios
          .post(`${baseUrl}/subject/create`, values)
          .then((resp) => {
            setMessage(resp.data.message);
            setType("success");
            Formik.resetForm();
          })
          .catch((e) => {
            setMessage(e.response.data.message);
            setType("error");
            console.log("Error, response admin casting calls", e);
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      }
    },
  });

  const fetchStudentSubject = () => {
    // reserved
  };

  const fetchstudentssubject = () => {
    axios
      .get(`${baseUrl}/subject/fetch-all`)
      .then((resp) => {
        setStudentSubject(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching casting calls admin data", e);
      });
  };

  useEffect(() => {
    fetchstudentssubject();
    fetchStudentSubject();
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
      <Box>
        <Box component={"div"}>
          <Paper sx={{ padding: '20px', margin: "10px" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "800", textAlign: "center" }}
            >
              {isEdit ? "Edit Subject" : "Add New Subject"}
            </Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={Formik.handleSubmit}
            >
              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                label="Subject Text"
                variant="outlined"
                name="subject_name"
                value={Formik.values.subject_name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.subject_name && Formik.errors.subject_name && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.subject_name}
                </p>
              )}

              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                label="Subject Codename"
                variant="outlined"
                name="subject_codename"
                value={Formik.values.subject_codename}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.subject_codename && Formik.errors.subject_codename && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.subject_codename}
                </p>
              )}

              <Box sx={{ marginTop: "10px" }}>
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

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Subject Name</TableCell>
                  <TableCell align="right">Codename</TableCell>
                  <TableCell align="right">Details</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentSubject.map((value, i) => (
                  <TableRow key={i}>
                    <TableCell>{value.subject_name}</TableCell>
                    <TableCell align="right">{value.subject_codename}</TableCell>
                    <TableCell align="right">Details</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: "end" }}>
                        <Button variant='contained' sx={{ background: "red", color: "#fff" }} onClick={() => handleDelete(value._id)}>
                          <DeleteIcon />
                        </Button>
                        <Button variant='contained' sx={{ background: "gold", color: "#222222" }} onClick={() => handleEdit(value._id)}>
                          <EditIcon />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}