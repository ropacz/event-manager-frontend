import React, { useCallback, useState } from "react";
import api from "../../utils/connection";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import { Container } from "./styles";

interface Data {
  id: string;
  name: string;
  lastname: string;
  roomId: string;
}

interface DataRooms {
  id: string;
  name: string;
  capacity: number;
}

interface DataSpaces {
  id: string;
  name: string;
  capacity: number;
}

type DataPeoples = {
  peoples: Array<{
    id: string;
    name: string;
    lastname: string;
    roomId: string;
    room: DataRooms;
    space: DataSpaces;
  }>;
};

interface Props {
  data: any;
  route: string;
}
const List: React.FC<Props> = ({ data, route }) => {
  if (!data) return <></>;

  if (route === "people") {
    return (
      <ul style={{ width: "100%" }}>
        {data.peoples.map((list: any) => {
          return (
            <li key={list.id}>
              {`${list.name} ${list.lastname}`}
              {list.roomId && ` - Sala: ${list.room.name}`}
              {list.spaceId && ` - Espaço: ${list.space.name}`}
            </li>
          );
        })}
      </ul>
    );
  }

  if (route === "room") {
    return (
      <ul style={{ width: "100%" }}>
        {data.map((list: any) => {
          return (
            <li
              key={list.id}
            >{`${list.name} - Capacidade: ${list.capacity} - Quantidade: ${list.total} `}</li>
          );
        })}
      </ul>
    );
  }

  if (route === "space") {
    return (
      <ul style={{ width: "100%" }}>
        {data.map((list: any) => {
          return (
            <li
              key={list.id}
            >{`${list.name} - Capacidade: ${list.capacity} - Quantidade: ${list.total} `}</li>
          );
        })}
      </ul>
    );
  }

  return <> </>;
};

type FormValues = {
  route: string;
  query: string;
};

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [dataPeoples, setDataPeoples] = useState<DataPeoples | null>(null);
  const [dataRooms, setDataRooms] = useState<DataRooms[]>([]);
  const [dataSpaces, setDataSpaces] = useState<DataSpaces[]>([]);
  const [route, setRoute] = useState<string>("");

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data: FormValues) => {
      setRoute("");
      setDataPeoples(null);
      setDataRooms([]);
      setDataSpaces([]);

      setRoute(data.route);
      api.get(`${data.route}/?search=${data.query}`).then((response) => {
        if (data.route === "people") {
          console.log(response.data.peoples);
          setRoute("people");
          setDataPeoples(response.data);
        } else if (data.route === "room") {
          setRoute("room");
          setDataRooms(response.data.rooms);
        } else if (data.route === "space") {
          setRoute("space");
          setDataSpaces(response.data.spaces);
        }
      });
    },
    []
  );

  return (
    <Container>
      <div>
        <Link to="/create-people/" className="btn">
          Cadastrar Pessoa
        </Link>
        <Link to="/create-room/" className="btn">
          Criar Sala
        </Link>
        <Link to="/create-space/" className="btn">
          Cadastrar Espaço
        </Link>

        <Link to="/register-people-room/" className="btn">
          Cadastar Pessoa em Sala
        </Link>
        <Link to="/break/" className="btn">
          Intervalo
        </Link>
        <Link to="/move-group/" className="btn">
          Mover Grupo
        </Link>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <input
              type="radio"
              id="btn-1"
              name="route"
              value="people"
              ref={register}
              defaultChecked
            />
            <label style={{ marginRight: "10px" }} htmlFor="btn-1">
              Pessoa
            </label>

            <input
              type="radio"
              id="btn-2"
              name="route"
              value="room"
              ref={register}
            />
            <label style={{ marginRight: "10px" }} htmlFor="btn-2">
              Sala
            </label>

            <input
              type="radio"
              id="btn-3"
              name="route"
              value="space"
              ref={register}
            />
            <label htmlFor="btn-3">Espaço</label>
          </div>
          <h4>Digite o nome abaixo</h4>
          <input type="text" name="query" ref={register} />
          <button>Listar / Buscar</button>
        </form>
      </div>

      <div style={{ maxWidth: "800px", width: "100%" }}>
        {dataPeoples && dataPeoples.peoples.length > 0 && (
          <List data={dataPeoples} route={route} />
        )}

        {dataRooms && dataRooms.length > 0 && (
          <List data={dataRooms} route={route} />
        )}

        {dataSpaces && dataSpaces.length > 0 && (
          <List data={dataSpaces} route={route} />
        )}
      </div>
    </Container>
  );
};

export default Home;
