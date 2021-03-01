import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../utils/connection";
import history from "../../history";

import { Container } from "./styles";

type PeopleValues = {
  id: string;
  name: string;
  lastname: string;
  roomId: string;
  spaceId: string;
};

type RoomValues = {
  id: string;
  name: string;
  capacity: number;
  total: number;
};

type FormValues = {
  peopleIdsOne: string;
  peopleIdsTwo: string;
  roomIdOne: string;
  roomIdTwo: string;
};

const MoveGroup: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<FormValues>();
  const [groupOnePeoples, setGroupOnePeoples] = useState<PeopleValues[]>([]);
  const [groupTwoPeoples, setGroupTwoPeoples] = useState<PeopleValues[]>([]);
  const [rooms, setRooms] = useState<RoomValues[] | null>(null);
  const [roomIdOne, setRoomIdOne] = useState<string>("");
  const [roomIdTwo, setRoomIdTwo] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<string>("");
  const [countGroupOne, setCountGroupOne] = useState(0);
  const [countGroupTwo, setCountGroupTwo] = useState(0);
  const [totalSelectedOne, setTotalSelectedOne] = useState(0);
  const [totalSelectedTwo, setTotalSelectedTwo] = useState(0);

  useEffect(() => {
    api.get(`/room`).then((response) => {
      setRooms(response.data.rooms);
    });
  }, []);

  useEffect(() => {
    const url = roomIdOne !== "" ? `/people/room/${roomIdOne}` : "/people/";

    api.get(`${url}`).then((response) => {
      setGroupOnePeoples(response.data.peoples);
      setCountGroupOne(Math.round((response.data.peoples.length - 1) / 2));
    });
  }, [roomIdOne]);

  useEffect(() => {
    const url = roomIdTwo !== "" ? `/people/room/${roomIdTwo}` : "/people/";

    api.get(`${url}`).then((response) => {
      setGroupTwoPeoples(response.data.peoples);
      setCountGroupTwo(Math.round((response.data.peoples.length - 1) / 2));
    });
  }, [roomIdTwo]);

  const salve = async (data: FormValues) => {
    axios
      .all([
        api.post(`/room/edit/people`, {
          peopleIds: data.peopleIdsOne,
          roomId: data.roomIdTwo,
        }),

        api.post(`/room/edit/people`, {
          peopleIds: data.peopleIdsTwo,
          roomId: data.roomIdOne,
        }),
      ])
      .then(() => {
        history.push("/");
      });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (data.peopleIdsOne.length !== countGroupOne) {
      setErrorStatus("Selecione metade das pessoas no primeiro grupo");
      return;
    }

    if (data.peopleIdsTwo.length !== countGroupTwo) {
      setErrorStatus("Selecione metade das pessoas no segundo grupo");
      return;
    }
    salve(data);
  };

  if (!groupOnePeoples || !rooms)
    return (
      <Container>
        <p>
          Você precisa criar <Link to="/create-people">pessoas</Link> e{" "}
          <Link to="/create-room">salas</Link> primeiro
        </p>
      </Container>
    );

  return (
    <Container>
      <h3>Mover grupo de pessoas para outra Sala</h3>
      <p>Precione CTRL para selecionar pessoas especificas</p>
      <p style={{ color: "red" }}>{errorStatus && errorStatus}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {rooms && (
          <select
            name="roomIdOne"
            ref={register}
            onChange={(e) => {
              setRoomIdOne(e.target.value);
            }}
          >
            <option value=""> Selecione uma sala</option>
            {rooms.map((value: RoomValues) => {
              if (roomIdTwo !== value.id) {
                return (
                  <option key={value.id} value={value.id}>
                    {`${value.name} - ${value.capacity} / ${value.total} `}
                  </option>
                );
              }
            })}
          </select>
        )}
        <label htmlFor="name">
          Selecionar pessoas{" "}
          {roomIdOne ? `${countGroupOne} = ${totalSelectedOne}` : ""}
        </label>
        <br />
        {groupOnePeoples.length > 0 && (
          <select
            name="peopleIdsOne"
            ref={register({
              required: "Selecione uma pessoa!",
            })}
            onChange={(e) => {
              setTotalSelectedOne(e.target.selectedOptions.length);
            }}
            multiple
          >
            {groupOnePeoples.map((value: PeopleValues) => {
              if (roomIdOne === value.roomId) {
                return (
                  <option key={value.id} value={value.id}>
                    {`${value.id.split("-")[0]} :: ${value.name} ${
                      value.lastname
                    }`}
                  </option>
                );
              }
            })}
          </select>
        )}
        {rooms && (
          <select
            name="roomIdTwo"
            ref={register}
            onChange={(e) => {
              setRoomIdTwo(e.target.value);
            }}
          >
            <option value=""> Selecione uma sala</option>
            {rooms.map((value: RoomValues) => {
              if (roomIdOne !== value.id) {
                return (
                  <option key={value.id} value={value.id}>
                    {`${value.name} - ${value.capacity} / ${value.total} `}
                  </option>
                );
              }
            })}
          </select>
        )}
        <label htmlFor="name">
          Selecionar pessoas{" "}
          {roomIdTwo ? `${countGroupTwo} = ${totalSelectedTwo}` : ""}
        </label>
        <br />
        {groupTwoPeoples.length > 0 && (
          <select
            name="peopleIdsTwo"
            ref={register({
              required: "Selecione uma pessoa!",
            })}
            onChange={(e) => {
              setTotalSelectedTwo(e.target.selectedOptions.length);
            }}
            multiple
          >
            {groupTwoPeoples.map((value: PeopleValues) => {
              if (roomIdTwo === value.roomId) {
                return (
                  <option key={value.id} value={value.id}>
                    {`${value.id.split("-")[0]} :: ${value.name} ${
                      value.lastname
                    }`}
                  </option>
                );
              }
            })}
          </select>
        )}
        <br />
        <br />
        <button>Mudar</button>
      </form>

      <Link to="/" className="btn">
        Home
      </Link>
    </Container>
  );
};

export default MoveGroup;
