import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../utils/connection";
import history from "../../history";

import { Container } from "./styles";

type FormValues = {
  name: string;
  capacity: number;
};

const CreateSpace: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data: FormValues) => {
      api
        .post(`/space`, { name: data.name, capacity: data.capacity })
        .then((_) => {
          history.push("/");
        });
    },
    []
  );

  return (
    <Container>
      <h3>Criar Espaço</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Digite o nome: </label> <br />
        <input
          type="text"
          name="name"
          id="name"
          ref={register({
            required: "Campo nome é obrigatório!",
          })}
        />
        {errors && (
          <p style={{ fontSize: "12px", color: "red" }}>
            {errors.name?.message}
          </p>
        )}
        <br />
        <label htmlFor="name">Digite a capacidade: </label> <br />
        <input
          type="number"
          name="capacity"
          id="capacity"
          max="100"
          min="1"
          ref={register({
            required: "Campo capacidade obrigatório!",
          })}
        />
        {errors && (
          <p style={{ fontSize: "12px", color: "red" }}>
            {errors.capacity?.message}
          </p>
        )}
        <br /> <br />
        <button>Criar Espaço</button>
      </form>

      <Link to="/" className="btn">
        Home
      </Link>
    </Container>
  );
};

export default CreateSpace;
