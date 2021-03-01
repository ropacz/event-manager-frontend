import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

type SpaceValues = {
  id: string;
  name: string;
  capacity: number;
  total: number;
};

type FormValues = {
  spaceId: string;
  peopleIds: string[];
};

const Break: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<FormValues>();
  const [rooms, setRooms] = useState<RoomValues[] | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [spaces, setSpaces] = useState<SpaceValues[] | null>(null);
  const [peoples, setPeoples] = useState<PeopleValues[]>([]);

  useEffect(() => {
    api.get(`/room`).then((response) => {
      console.log(response.data);
      setRooms(response.data.rooms);
    });
  }, []);

  useEffect(() => {
    api.get(`/space`).then((response) => {
      setSpaces(response.data.spaces);
    });
  }, []);

  useEffect(() => {
    api.get(`/people`).then((response) => {
      setPeoples(response.data.peoples);
    });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data: FormValues) => {
      api
        .post(`/space/edit/people`, {
          spaceId: data.spaceId,
          peopleIds: data.peopleIds,
        })
        .then((_) => {
          history.push("/");
        });
    },
    []
  );

  return (
    <Container>
      <h3>Adicionar pessoas ao Intervalo</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {rooms && (
          <select
            name="roomId"
            ref={register}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          >
            <option value=""> Selecione uma sala</option>
            {rooms.map((value: RoomValues) => {
              return (
                <option key={value.id} value={value.id}>
                  {`${value.name} - ${value.capacity} / ${value.total} `}
                </option>
              );
            })}
          </select>
        )}
        <label htmlFor="name">Selecionar pessoas</label>
        <br />
        {peoples.length > 0 && (
          <select
            name="peopleIds"
            ref={register({
              required: "Selecione uma pessoa!",
            })}
            multiple
          >
            {peoples.map((value: PeopleValues) => {
              if (roomId === value.roomId) {
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
        <label htmlFor="name">Digite a capacidade: </label> <br />
        {spaces && (
          <select name="spaceId" ref={register}>
            <option value=""> Selecione um espaço</option>
            {spaces.map((value: RoomValues) => {
              return (
                <option key={value.id} value={value.id}>
                  {`${value.name} - ${value.capacity} / ${value.total} `}
                </option>
              );
            })}
          </select>
        )}
        <br /> <br />
        <button>Adicionar a intervalo</button>
      </form>

      <Link to="/" className="btn">
        Home
      </Link>
    </Container>
  );
};

export default Break;
