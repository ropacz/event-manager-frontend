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

  a,
  button {
    margin: 20px;
  }

  /* a,
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    text-decoration: none;
    width: 250px;
    height: 50px;
    padding: 10px 20px;
    font-size: 22px;
    color: white;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    background: #f39c12;
    border: 0;
    border-bottom: 2px solid #e8930c;
    cursor: pointer;
    -webkit-box-shadow: inset 0 -2px #e8930c;
    box-shadow: inset 0 -2px #e8930c;
    margin: 10px;

    &:active {
      top: 1px;
      outline: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  } */

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 550px;
    margin: 10px 30px;
  }

  input[type="text"] {
    display: flex;
    width: 100%;
    height: 20px;
    padding: 10px;
  }

  li {
    list-style: none;
    font-size: 18px;
    width: 100%;
    height: 20px;
    padding: 10px;
    margin-bottom: 4px;
    background-color: #f1f1f1;
  }
`;
