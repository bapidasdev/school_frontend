/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { baseUrl } from "../../../environment";
import { examSchema } from "../../../yupSchema/examinationSchema";
import { convertDate } from "../../../utilityFunctions";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";

export default function Examinations() {
  const [isEditExam, setEditExam] = useState(false);
  const [examForm, setExamForm] = useState(false);
  const [examEditId, setExamEditId] = useState(null);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [examinations, setExaminations] = useState([]);
  const [submitted, setSubmitted] = useState("not submitted");
  const [allSubjects, setAllSubjects] = useState([]);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [editLoadingId, setEditLoadingId] = useState(null);
  const [addExamLoading, setAddExamLoading] = useState(false);

  const resetMessage = () => setMessage("");

  const handleMessage = (type, message) => {
    setType(type);
    setMessage(message);
  };

  const handleNewExam = () => {
    setAddExamLoading(true);
    cancelEditExam();
    setTimeout(() => {
      setExamForm(true);
      setAddExamLoading(false);
    }, 300);
  };

  const handleEditExam = (id) => {
    setEditLoadingId(id);
    setExamEditId(id);
    setEditExam(true);
    setExamForm(true);
    axios
      .get(`${baseUrl}/examination/single/${id}`)
      .then((resp) => {
        examFormik.setFieldValue("exam_date", dayjs(resp.data.data.examDate));
        examFormik.setFieldValue("subject", resp.data.data.subject);
        examFormik.setFieldValue("exam_type", resp.data.data.examType);
      })
      .catch((e) => {
        handleMessage("error", e.response.data.message);
      })
      .finally(() => setEditLoadingId(null));
  };

  const handleDeleteExam = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      setDeleteLoadingId(id);
      axios
        .delete(`${baseUrl}/examination/delete/${id}`)
        .then((resp) => handleMessage("success", resp.data.message))
        .catch((e) => handleMessage("error", e.response.data.message))
        .finally(() => setDeleteLoadingId(null));
    }
  };

  const cancelEditExam = () => {
    setExamForm(false);
    setExamEditId(null);
    examFormik.resetForm();
  };

  const examFormik = useFormik({
    initialValues: { exam_date: "", subject: "", exam_type: "" },
    validationSchema: examSchema,
    onSubmit: (values) => {
      setFormLoading(true);
      const apiCall = isEditExam
        ? axios.patch(`${baseUrl}/examination/update/${examEditId}`, values)
        : axios.post(`${baseUrl}/examination/new`, {
            ...values,
            class_id: selectedClass,
          });

      apiCall
        .then((resp) => handleMessage("success", resp.data.message))
        .catch((e) =>
          handleMessage("error", e.response?.data?.message || "Something went wrong")
        )
        .finally(() => {
          setFormLoading(false);
          cancelEditExam();
          setSubmitted("Submitted");
        });
    },
  });

  const handleClassChange = (e) => setSelectedClass(e.target.value);

  const fetchExaminations = () => {
    axios
      .get(`${baseUrl}/examination/fetch-class/${selectedClass}`)
      .then((resp) => setExaminations(resp.data.data))
      .catch(() => console.log("Error in fetching Examinations."));
  };

  useEffect(() => {
    if (selectedClass) {
      fetchExaminations();
    }
  }, [selectedClass, message]);

  const fetchAllSubjects = () => {
    axios
      .get(`${baseUrl}/subject/fetch-all`)
      .then((resp) => setAllSubjects(resp.data.data))
      .catch(() => console.log("Error in fetching all Subjects"));
  };

  const fetchStudentClass = () => {
    axios
      .get(`${baseUrl}/class/fetch-all`)
      .then((resp) => {
        setAllClasses(resp.data.data);
        setSelectedClass(resp.data.data[0]._id);
      })
      .catch((e) => console.log("Error in fetching student Class", e));
  };

  useEffect(() => {
    fetchStudentClass();
    fetchAllSubjects();
  }, []);

  return (
    <>
      {message && <CustomizedSnackbars reset={resetMessage} type={type} message={message} />}
      <Box>
        <Typography className="hero-text" variant="h2" sx={{ textAlign: "center" }}>
          Examinations
        </Typography>
      </Box>

      <Paper sx={{ margin: "10px", padding: "10px" }}>
        <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
          <Typography>Change Class</Typography>
          <Select
            value={selectedClass}
            onChange={handleClassChange}
            onBlur={handleClassChange}
          >
            {allClasses.map((value) => (
              <MenuItem key={value._id} value={value._id}>
                {value.class_text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {examForm && (
        <Paper sx={{ padding: "20px", margin: "10px" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "700" }} variant="h6">
            Assign Examination
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={examFormik.handleSubmit}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Exam Date"
                    name="exam_date"
                    value={dayjs(examFormik.values.exam_date)}
                    onChange={(e) => examFormik.setFieldValue("exam_date", dayjs(e))}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
              <InputLabel>Subject</InputLabel>
              <Select
                label="Subject"
                name="subject"
                onChange={examFormik.handleChange}
                onBlur={examFormik.handleBlur}
                value={examFormik.values.subject}
              >
                <MenuItem value={""}>Select Sub</MenuItem>
                {allSubjects.map((subject, i) => (
                  <MenuItem key={i} value={subject._id}>
                    {subject.subject_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {examFormik.touched.subject && examFormik.errors.subject && (
              <p style={{ color: "red", textTransform: "capitalize" }}>{examFormik.errors.subject}</p>
            )}

            <TextField
              fullWidth
              sx={{ marginTop: "10px" }}
              label="Exam Type"
              variant="outlined"
              name="exam_type"
              value={examFormik.values.exam_type}
              onChange={examFormik.handleChange}
              onBlur={examFormik.handleBlur}
              placeholder="(1st Semester, 2nd Semester, Half yearly etc)"
            />
            {examFormik.touched.exam_type && examFormik.errors.exam_type && (
              <p style={{ color: "red", textTransform: "capitalize" }}>{examFormik.errors.exam_type}</p>
            )}

            <Box sx={{ marginTop: "10px" }}>
              <Button
                type="submit"
                sx={{ marginRight: "10px", minWidth: "100px" }}
                variant="contained"
                disabled={formLoading}
              >
                {formLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
              </Button>
              <Button
                sx={{ background: "tomato", color: "#fff" }}
                variant="contained"
                onClick={cancelEditExam}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      <Paper sx={{ padding: "20px", margin: "10px" }}>
        <Typography sx={{ textAlign: "center" }} className="text-beautify2" variant="h5">
          Examinations
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "700" }}>Exam Date</TableCell>
                <TableCell sx={{ fontWeight: "700" }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: "700" }} align="center">Exam Type</TableCell>
                <TableCell sx={{ fontWeight: "700" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examinations.map((examination, i) => (
                <TableRow key={i}>
                  <TableCell>{convertDate(examination.examDate)}</TableCell>
                  <TableCell>{examination.subject?.subject_name || "Add One"}</TableCell>
                  <TableCell align="center">{examination.examType}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
                      <Button
                        variant="contained"
                        sx={{ background: "red", color: "#fff", minWidth: "80px" }}
                        onClick={() => handleDeleteExam(examination._id)}
                        disabled={deleteLoadingId === examination._id}
                      >
                        {deleteLoadingId === examination._id ? (
                          <CircularProgress size={20} sx={{ color: "white" }} />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ background: "gold", color: "#222", minWidth: "80px" }}
                        onClick={() => handleEditExam(examination._id)}
                        disabled={editLoadingId === examination._id}
                      >
                        {editLoadingId === examination._id ? (
                          <CircularProgress size={20} sx={{ color: "#222" }} />
                        ) : (
                          "Edit"
                        )}
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <Button variant="contained" onClick={handleNewExam} disabled={addExamLoading}>
            {addExamLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Add Exam"}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
