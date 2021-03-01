import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../utils/connection";
import history from "../../history";

import { Container } from "./styles";

type FormValues = {
  name: string;
  lastname: string;
};

const CreatePeople: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data: FormValues) => {
      api
        .post(`/people`, { name: data.name, lastname: data.lastname })
        .then((_) => {
          history.push("/");
        });
    },
    []
  );

  return (
    <Container>
      <h3>Cadastrar Pessoa</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Digite o nome: </label> <br />
        <input
          type="text"
          name="name"
          id="name"
          ref={register({
            required: "Campo de nome obrigatório!",
          })}
        />
        {errors && (
          <p style={{ fontSize: "12px", color: "red" }}>
            {errors.name?.message}
          </p>
        )}
        <br />
        <label htmlFor="name">Digite o sobrenome: </label> <br />
        <input
          type="text"
          name="lastname"
          id="lastname"
          ref={register({
            required: "Campo de sobrenome obrigatório!",
          })}
        />
        {errors && (
          <p style={{ fontSize: "12px", color: "red" }}>
            {errors.lastname?.message}
          </p>
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

export default CreatePeople;
