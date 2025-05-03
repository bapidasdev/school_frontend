import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../../yupSchema/loginSchema";
import { useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { AuthContext } from "../../../context/AuthContext";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";


export default function Login() {
    const { authenticated, login } = useContext(AuthContext);

    const [loginType, setLoginType] = useState("student")
    const [message, setMessage] = useState("");
    const [type, setType] = useState("succeess");

    const navigate = useNavigate()


    const resetMessage = () => {
        setMessage("")
    }

    const handleSelection = (e) => {
        setLoginType(e.target.value)
        resetInitialValue();

    }

    const resetInitialValue = () => {
        Formik.setFieldValue("email", "");
        Formik.setFieldValue("password", "")
    }

    const initialValues = {
        email: "",
        password: ""
    }
    const Formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log("Login Formik values", values)
            let url;
            let navUrl;
            if (loginType == "school_owner") {
                url = `${baseUrl}/school/login`;
                navUrl = '/school'
            } else if (loginType == "teacher") {
                url = `${baseUrl}/teacher/login`
                navUrl = '/teacher'
            } else if (loginType == "student") {
                url = `${baseUrl}/student/login`
                navUrl = '/student'
            }
            axios.post(url, { ...values }).then(resp => {
                setMessage(resp.data.message)
                setType("success")
                let token = resp.headers.get("Authorization");
                if (resp.data.success) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(resp.data.user));
                    navigate(navUrl)
                    login(resp.data.user)
                }
                Formik.resetForm();
            }).catch(e => {
                setMessage(e.response.data.message);
                setType("error")
                console.log("Error in  register submit", e.response.data.message)
            })


        }
    })

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                background: "#1E40AF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxSizing: "border-box",
            }}
        >
            {message && (
                <CustomizedSnackbars
                    reset={resetMessage}
                    type={type}
                    message={message}
                />
            )}

            <Paper
                elevation={10}
                sx={{
                    padding: 5,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: 420,
                    backgroundColor: "#1E3A8A",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                {/* Logo */}
                <Box sx={{ mb: 4 }}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/747/747545.png"
                        alt="login"
                        width={70}
                        height={70}
                        style={{ margin: "auto" }}
                    />


                </Box>

                {/* Form */}
                <Box component="form" onSubmit={Formik.handleSubmit} noValidate>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel sx={{ color: "#fff" }} id="user-type-label">
                            User Type
                        </InputLabel>
                        <Select
                            labelId="user-type-label"
                            value={loginType}
                            onChange={handleSelection}
                            sx={{
                                color: "#fff",
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                            }}
                        >
                            <MenuItem value="student">Student </MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="school_owner">School Owner</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        placeholder="EMAIL"
                        variant="outlined"
                        name="email"
                        value={Formik.values.email}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        error={Boolean(Formik.touched.email && Formik.errors.email)}
                        helperText={Formik.touched.email && Formik.errors.email}
                        sx={{
                            marginBottom: 2,
                            input: { color: "#fff" },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "& fieldset": { borderColor: "#fff" },
                                "&:hover fieldset": { borderColor: "#fff" },
                                "&.Mui-focused fieldset": { borderColor: "#fff" },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: "#fff" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        placeholder="PASSWORD"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={Formik.values.password}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        error={Boolean(Formik.touched.password && Formik.errors.password)}
                        helperText={Formik.touched.password && Formik.errors.password}
                        sx={{
                            marginBottom: 3,
                            input: { color: "#fff" },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "& fieldset": { borderColor: "#fff" },
                                "&:hover fieldset": { borderColor: "#fff" },
                                "&.Mui-focused fieldset": { borderColor: "#fff" },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: "#fff" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: "#fff",
                            color: "#1E40AF",
                            fontWeight: "bold",
                            paddingY: 1.2,
                            fontSize: "1rem",
                            marginBottom: 2,
                            "&:hover": {
                                backgroundColor: "#e2e8f0",
                            },
                        }}
                    >
                        LOGIN
                    </Button>


                </Box>
            </Paper>

        </Box>

    );
}
