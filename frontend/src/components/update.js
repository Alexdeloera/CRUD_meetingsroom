import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
const endpoint = "http://localhost/meet-app/api/public/api/";
const Update = (props) => {
  const [data, setData] = useState({
    sala: "",
    fecha_inicial: "",
    fecha_final: "",
  });

  let history = useNavigate();
  let location = useLocation();

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
      if (
        initial_date >= dateReferenceFirst &&
        finish_date <= dateReferenceSecond &&
        room === element.sala
      ) {
        alert("Brooooo at that moment the room is scheduled");
        bool = false;
        history("/home");
      }
    });
    console.log(bool);
    if (bool) {
      const formData = new FormData();
      formData.append("id", location.state.id);
      formData.append("sala", room);
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
      formData.append("fecha_inicial", fecha1);
      formData.append("fecha_final", fecha2);
      axios
        .post(`${endpoint}updateMeeting`, formData, {
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
        <Form.Label>First room</Form.Label>
        <Form.Control
          type="text"
          placeholder={location.state.sala}
          name="sala"
          disabled={true}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>First starting date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="fecha_inicial"
          onChange={onChange}
          disabled={true}
          value={location.state.fecha_inicial}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>First finish date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="fecha_final"
          onChange={onChange}
          disabled={true}
          value={location.state.fecha_final}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>New room</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type the room"
          name="sala"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>New starting date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="fecha_inicial"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>New finish date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="fecha_final"
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Update
      </Button>
      <Button variant="danger" onClick={() => history("/home")}>
        Cancel
      </Button>
    </Form>
  );
};
export default Update;
