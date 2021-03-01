import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../utils/connection";
import history from "../../history";

import { Container } from "./styles";
import { error } from "console";

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

type RoomRegisterValues = {
  peopleId: string[];
  roomId: string;
};

const RegisterPeopleInRoom: React.FC = () => {
  const { register, handleSubmit } = useForm<RoomRegisterValues>();

  const [rooms, setRooms] = useState<RoomValues[] | null>(null);
  const [peoples, setPeoples] = useState<PeopleValues[] | null>(null);
  const [place, setPlace] = useState<string | undefined>("");

  const [lessQuantity, setLessQuantity] = useState(0);

  useEffect(() => {
    api.get(`/room`).then((response) => {
      if (response.data.rooms.length > 0) {
        setLessQuantity(response.data.rooms[0]?.total);
        setRooms(response.data.rooms);
      }
    });
  }, []);

  useEffect(() => {
    api.get(`/people`).then((response) => {
      console.log(response.data);
      setPeoples(response.data.peoples);
    });
  }, []);

  const getPlace = (peopleId: string) => {
    let roomId = "";
    let place = "";
    peoples?.forEach((people) => {
      if (peopleId === people.id) {
        roomId = people.roomId;
      }
    });

    rooms?.forEach((room) => {
      if (roomId === room.id) {
        place = room.name;
      }
    });

    setPlace(place);
  };

  const onSubmit: SubmitHandler<RoomRegisterValues> = useCallback(
    (data: RoomRegisterValues) => {
      console.log({
        peopleIds: [data.peopleId],
        roomId: data.roomId,
      });

      api
        .post(`/room/edit/people`, {
          peopleIds: [data.peopleId],
          roomId: data.roomId,
        })
        .then((res) => {
          console.log(res);
          history.push("/");
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
    []
  );

  if (!peoples)
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
      <h3>Cadastrar Pessoa em Sala</h3>
      <p>Permitido apenas a diferença de 1 pessoa por sala</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Selecionar pessoa</label> <br />
        {peoples && (
          <select
            onChange={(e) => getPlace(e.target.value)}
            name="peopleId"
            ref={register({
              required: "Selecione uma pessoa!",
            })}
          >
            <option value=""> Selecione uma pessoa</option>
            {peoples.map((value: PeopleValues) => (
              <option key={value.id} value={value.id}>
                {`${value.id.split("-")[0]} :: ${value.name} ${value.lastname}`}
              </option>
            ))}
          </select>
        )}
        {peoples && rooms && place && (
          <p>
            {place
              ? `Essa está alocada na sala ${place}`
              : `Essa pessoa não está alocada em uma sala`}
          </p>
        )}
        <br />
        {rooms && (
          <select name="roomId" ref={register}>
            {rooms.map((value: RoomValues) => {
              if (
                value.total === lessQuantity &&
                value.total <= value.capacity
              ) {
                return (
                  <option key={value.id} value={value.id}>
                    {`${value.name} - ${value.capacity} / ${value.total} `}
                  </option>
                );
              } else {
                return (
                  <option key={value.id} value={value.id} disabled>
                    {`${value.name} - ${value.capacity} / ${value.total} `}
                  </option>
                );
              }
            })}
          </select>
        )}
        <br /> <br />
        <button>Cadastrar</button>
      </form>

      <Link to="/" className="btn">
        Home
      </Link>
    </Container>
  );
};

export default RegisterPeopleInRoom;
