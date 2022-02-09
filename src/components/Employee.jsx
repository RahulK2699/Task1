import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import styles from "./Employee.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export const Employee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [hobbies, setHobbies] = useState([]);
  const [data, setData] = useState([]);

  const HandleChangeName = (e) => {
    setName(e.target.value);
  };

  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const HandleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const HandleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const HandleCheck = (e) => {
    setHobbies({
      ...hobbies,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/Employees`, {
      method: "POST",
      body: JSON.stringify({
        Name: name,
        email: email,
        phone: phone,
        gender: gender,
        dob: date,
        hobbies: hobbies,
      }),
      headers: {
        "content-Type": "application/json",
      },
    }).then(getEmployees);
    //.then(UpdateEmployees);
  };

  const getEmployees = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/Employees");
      setLoading(false);
      setData(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRemove = async (el) => {
    setData(
      data.filter((e) => {
        return e.id !== el.id;
      })
    );
    try {
      const res = await axios.delete(
        `http://localhost:3001/Employees/${el.id}`
      );
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  return loading ? (
    "....loading"
  ) : (
    <div>
      <div className={styles.EmployeeForm}>Employee Form</div>
      <div id={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.textfield}>
            <TextField
              id="outlined-Name"
              style={{ margin: "10px 0px 10px 0px" }}
              onChange={HandleChangeName}
              label="Name"
              variant="outlined"
            />
            <TextField
              id="outlined-Email"
              style={{ margin: "10px 0px 10px 0px" }}
              onChange={HandleChangeEmail}
              label="Email"
              variant="outlined"
            />
            <TextField
              id="outlined-Phone"
              style={{ margin: "10px 0px 10px 0px" }}
              onChange={HandleChangePhone}
              label="Phone"
              variant="outlined"
            />
            <input
              type="date"
              label="dob"
              className={styles.dob}
              style={{ margin: "20px 0px 20px 0px" }}
              onChange={HandleChangeDate}
            />
          </div>
          <div className={styles.flexbox}>
            <div className={styles.Radio}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                className={styles.glabel}
              >
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="male"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </div>
            <div className={styles.CheckBox}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                className={styles.CLabel}
              >
                Hobbies
              </FormLabel>
              <FormControlLabel
                name="Travelling"
                onChange={HandleCheck}
                control={<Checkbox />}
                label="Travelling"
              />
              <FormControlLabel
                name="BikeRiding"
                onChange={HandleCheck}
                control={<Checkbox />}
                label="Bike Riding"
              />
              <FormControlLabel
                name="Foodie"
                onChange={HandleCheck}
                control={<Checkbox />}
                label="Foodie"
              />
              <FormControlLabel
                name="Gaming"
                onChange={HandleCheck}
                control={<Checkbox />}
                label="Mobile Gaming"
              />
            </div>
          </div>
          <Button
            variant="contained"
            type="submit"
            className={styles.submitBtn}
          >
            Submit
          </Button>
        </form>
      </div>
      <h1 className={styles.empdetail}>Employee List</h1>
      <div className={styles.displayData}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell align="left">Email Id</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Date of Birth</TableCell>
                <TableCell align="left">Hobbies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((e) => (
                <TableRow key={e.id}>
                  <TableCell component="th" scope="row">
                    {e.Name}
                  </TableCell>
                  <TableCell align="left">{e.email}</TableCell>
                  <TableCell align="left">{e.phone}</TableCell>
                  <TableCell align="left">{e.gender}</TableCell>
                  <TableCell align="left">{e.dob}</TableCell>
                  <TableCell align="left">
                    {Object.keys(e.hobbies).join(" ")}
                  </TableCell>
                  <button
                    onClick={() => handleRemove(e)}
                    className={styles.removeBtn}
                  >
                    Remove Employee
                  </button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        );
      </div>
    </div>
  );
};
