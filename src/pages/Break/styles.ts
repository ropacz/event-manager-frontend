import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  padding: 0;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  form {
    width: 350px;
    font-size: 18px;
  }

  input {
    display: flex;
    padding: 10px;
    width: 350px;
    margin: 10px 0;
    font-size: 18px;
  }

  input[type="radio"] {
    width: 20px;
    height: 20px;
    display: block;
    padding: 0px;
    margin: 20px 10px;
  }

  select {
    display: flex;
    padding: 10px;
    width: 100%;
    margin: 10px 0;
    font-size: 18px;
  }

  option:disabled {
    color: #f1f1f1;
    background-color: #ddd;
  }
`;
