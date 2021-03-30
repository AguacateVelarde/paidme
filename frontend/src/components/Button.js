import styled from "styled-components";

export default styled.button`
  border-radius: 20px;
  width: 200px;
  height: 30px;
  font-size: 16px;
  background-color: rgba(63, 191, 127, 0.4);
  border-color: rgba(63, 191, 127, 0.4);
  cursor: pointer;
  color: white;

  &:disabled {
    cursor: none;
    background-color: gray;
  }
`;
