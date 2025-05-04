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

import bg from "../../../assets/background_img.jpg"

export default function Login() {
    const { authenticated, login } = useContext(AuthContext);
    const [loginType, setLoginType] = useState("student");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const navigate = useNavigate();

    const resetMessage = () => setMessage("");

    const handleSelection = (e) => {
        setLoginType(e.target.value);
        resetInitialValue();
    };

    const resetInitialValue = () => {
        Formik.setFieldValue("email", "");
        Formik.setFieldValue("password", "");
    };

    const initialValues = { email: "", password: "" };

    const Formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            let url;
            let navUrl;
            if (loginType === "school_owner") {
                url = `${baseUrl}/school/login`;
                navUrl = "/school";
            } else if (loginType === "teacher") {
                url = `${baseUrl}/teacher/login`;
                navUrl = "/teacher";
            } else {
                url = `${baseUrl}/student/login`;
                navUrl = "/student";
            }
            axios
                .post(url, { ...values })
                .then((resp) => {
                    setMessage(resp.data.message);
                    setType("success");
                    let token = resp.headers.get("Authorization");
                    if (resp.data.success) {
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(resp.data.user));
                        navigate(navUrl);
                        login(resp.data.user);
                    }
                    Formik.resetForm();
                })
                .catch((e) => {
                    setMessage(e.response.data.message);
                    setType("error");
                });
        },
    });

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                backgroundImage:`url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: 2,
                boxSizing: "border-box",
            }}
        >
            {/* Dark overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                }}
            />

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
                    zIndex: 2,
                    padding: 5,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: 420,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                {/* Logo */}
                <Box sx={{ mb: 4 }}>
                    <img
                        src="https://img.icons8.com/ios-filled/100/ffffff/graduation-cap.png"
                        alt="login"
                        width={70}
                        height={70}
                        style={{ margin: "auto" }}
                    />
                </Box>

                {/* Form */}
                <Box component="form" onSubmit={Formik.handleSubmit} noValidate>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>

                        <InputLabel
                            id="user-type-label"
                            sx={{
                                color: "#fff",
                                "&.Mui-focused": {
                                    color: "#fff",
                                },
                            }}
                        >
                            User Type
                        </InputLabel>
                        
                        <Select
                            labelId="user-type-label"
                            id="user-type"
                            label="User Type"
                            value={loginType}
                            onChange={handleSelection}
                            sx={{
                                color: "#fff",
                                textAlign: "left",
                                ".MuiSelect-select": {
                                    textAlign: "left",
                                    paddingLeft: 2,
                                },
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fff",
                                },
                                ".MuiSvgIcon-root": {
                                    color: "#fff",
                                },
                                borderRadius: 2,
                                backgroundColor: "rgba(255,255,255,0.05)",
                            }}
                        >
                            <MenuItem value="student">Student</MenuItem>
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
                                backgroundColor: "rgba(255,255,255,0.05)",
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
                        error={Boolean(
                            Formik.touched.password && Formik.errors.password
                        )}
                        helperText={
                            Formik.touched.password && Formik.errors.password
                        }
                        sx={{
                            marginBottom: 3,
                            input: { color: "#fff" },
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "& fieldset": { borderColor: "#fff" },
                                "&:hover fieldset": { borderColor: "#ff" },
                                "&.Mui-focused fieldset": { borderColor: "#fff" },
                                backgroundColor: "rgba(255,255,255,0.05)",
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
                            color: "black",
                            fontWeight: "bold",
                            paddingY: 1.2,
                            fontSize: "1rem",
                            marginBottom: 2,
                            borderRadius: 2,
                            background: '#fff',
                            "&:hover": {
                                backgroundColor: "black",
                                color: '#fff'

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
