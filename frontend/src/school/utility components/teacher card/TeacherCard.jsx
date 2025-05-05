import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s, box-shadow 0.3s",
  '&:hover': {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: "background-color 0.3s, transform 0.3s",
  '&:hover': {
    transform: "scale(1.05)",
  },
}));

export default function TeacherCardAdmin({ handleEdit, teacher, handleDelete }) {
  const convertDate = (dateData) => {
    const date = new Date(dateData);
    const dateNu = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dateNu}/${month}/${year}`;
  };

  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar
            src={`/images/uploaded/teacher/${teacher.teacher_image}`}
            alt={teacher.name}
            sx={{ width: 56, height: 56 }}
          />
        }
        title={
          <Typography variant="h6" component="div">
            {teacher.name}
          </Typography>
        }
        subheader={teacher.email}
      />
      <CardContent>
        <List dense>
          <ListItem>
            <ListItemText primary="Age" secondary={teacher.age} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Gender" secondary={teacher.gender} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Qualification" secondary={teacher.qualification} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Date of Join" secondary={convertDate(teacher.createdAt)} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <AnimatedButton
          size="small"
          variant="contained"
          color="error"
          onClick={() => handleDelete(teacher._id)}
        >
          Delete
        </AnimatedButton>
        <AnimatedButton
          size="small"
          variant="contained"
          color="warning"
          onClick={() => handleEdit(teacher._id)}
        >
          Edit
        </AnimatedButton>
      </CardActions>
    </StyledCard>
  );
}