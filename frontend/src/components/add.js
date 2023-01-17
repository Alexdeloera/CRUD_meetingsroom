import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const endpoint = "http://localhost/meet-app/api/public/api/";
const Add = (props) => {
  const [data, setData] = useState({
    sala: "",
    fecha_inicial: "",
    fecha_final: "",
  });

  let history = useNavigate();

  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    getAllSchedules();
  }, []);

  const getAllSchedules = async () => {
    const response = await axios.post(`${endpoint}showMeetings`);
    setSchedules(response.data);
  };

  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let today = new Date();
    const yesterday = new Date(today);
    yesterday.setMinutes(yesterday.getMinutes() - 1);
    const dateReferenceFirst = new Date(data.fecha_inicial);
    const dateReferenceSecond = new Date(data.fecha_final);
    console.log(dateReferenceFirst.getMonth());
    if (dateReferenceFirst < yesterday || dateReferenceSecond < yesterday)
      alert("Brooooo don't use the past");
    else if (dateReferenceFirst > dateReferenceSecond)
      alert("Brooooo the future can't be before the past");
    else if (
      dateReferenceSecond.getHours() - dateReferenceFirst.getHours() === 0 &&
      dateReferenceFirst.getDate() === dateReferenceSecond.getDate() &&
      dateReferenceFirst.getMonth() === dateReferenceSecond.getMonth()
    )
      alert("Brooooo it has to last at least one hour");
    else if (
      dateReferenceSecond.getHours() - dateReferenceFirst.getHours() > 2 &&
      dateReferenceFirst.getDate() === dateReferenceSecond.getDate()
    )
      alert("Brooooo it has to last at most two hours");
    else if (
      data.fecha_final === "" &&
      data.fecha_final === "" &&
      data.sala === ""
    )
      alert("Brooooo fill all the fields");
    else {
      getAllSchedules();
      compareDates(dateReferenceFirst, dateReferenceSecond, data.sala);
    }
  };

  const compareDates = (initial_date, finish_date, room) => {
    let bool = true;
    schedules.forEach((element) => {
      const dateReferenceFirst = new Date(element.fecha_inicial);
      const dateReferenceSecond = new Date(element.fecha_final);
      const roomReference = element.sala;
      if (
        roomReference === room &&
        initial_date >= dateReferenceFirst &&
        finish_date <= dateReferenceSecond
      ) {
        alert("Brooooo at that moment the room is scheduled");
        bool = false;
      }
    });
    console.log(bool);
    if (bool) {
      const formData = new FormData();
      let fecha1 =
        initial_date.getFullYear() +
        "-" +
        (initial_date.getMonth() + 1) +
        "-" +
        initial_date.getDate() +
        "T" +
        initial_date.getHours() +
        ":" +
        initial_date.getMinutes() +
        ":" +
        initial_date.getSeconds();
      let fecha2 =
        finish_date.getFullYear() +
        "-" +
        (finish_date.getMonth() + 1) +
        "-" +
        finish_date.getDate() +
        "T" +
        finish_date.getHours() +
        ":" +
        finish_date.getMinutes() +
        ":" +
        finish_date.getSeconds();
      formData.append("sala", room);
      formData.append("fecha_inicial", fecha1);
      formData.append("fecha_final", fecha2);
      axios
        .post(`${endpoint}addMeeting`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .catch((error) => {
          console.log(error);
        });
      history("/home");
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Room</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the room's name"
          name="sala"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Starting date</Form.Label>
        <Form.Control
          type="datetime-local"
          placeholder="date"
          name="fecha_inicial"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Finish date</Form.Label>
        <Form.Control
          type="datetime-local"
          placeholder="date"
          name="fecha_final"
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Add
      </Button>
      <Button variant="danger" onClick={() => history("/home")}>
        Cancel
      </Button>
    </Form>
  );
};
export default Add;
