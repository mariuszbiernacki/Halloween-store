import styled from "styled-components";

const Btn = styled.button`
  margin-top: 10px;
  background-color: white;
  color: #212121;
  border: 1px solid #333333;
  border-radius: 30px;
  padding: 12px 20px;
  transition: 0.25s;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    color: white;
  }
`;

export default Btn;
