import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const endpoint = "http://localhost/meet-app/api/public/api/";
const Home = (props) => {
  let history = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [schedules2, setSchedules2] = useState([]);
  useEffect(() => {
    getAllSchedules();
  }, []);
  const getAllSchedules = async () => {
    let today = new Date();
    const response = await axios.post(`${endpoint}showMeetings`);
    const filteredSchedules = response.data.filter(
      (data) => new Date(data.fecha_final) > today
    );
    setSchedules(filteredSchedules);
    setSchedules2(response.data);
  };

  const verifyDeleteAction = () => {
    let today = new Date();
    const scheduleToDelete = schedules2.filter(
      (data) => new Date(data.fecha_final) <= today
    );
    console.log(scheduleToDelete);
    deleteSchedule(scheduleToDelete[0].id);
  };

  const deleteSchedule = async (id) => {
    const formData = new FormData();
    formData.append("id", id);

    axios
      .post(`${endpoint}deleteMeeting`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        getAllSchedules();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateSchedules = (id, sala, fecha_inicial, fecha_final) => {
    history("/updateMeeting", {
      state: {
        id: id,
        sala: sala,
        fecha_inicial: fecha_inicial,
        fecha_final: fecha_final,
      },
    });
  };
  return (
    <div className="container-fluid">
      <div className=" d-grid gap-2">
        <Link
          to="/addMeeting "
          className="btn btn-success btn-lg mt-2 mb-2 text-white"
          onClick={verifyDeleteAction}
        >
          {" "}
          Create
        </Link>
      </div>
      <table className="table table-striped">
        <thead className="bg-primary text-white">
          <tr>
            <th>Room</th>
            <th>Start</th>
            <th>Finish</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.sala}</td>
              <td>{schedule.fecha_inicial}</td>
              <td>{schedule.fecha_final}</td>
              <td>
                <button
                  onClick={() =>
                    updateSchedules(
                      schedule.id,
                      schedule.sala,
                      schedule.fecha_inicial,
                      schedule.fecha_final
                    )
                  }
                  className="btn btn-warning  m-1"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteSchedule(schedule.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
