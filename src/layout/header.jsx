import React from "react";
import styled from "styled-components";

const MainHeader = (props) => {
  const { selectedTheme } = props.content.props;

  return (
    <MainHeaderStyle selectedTheme={selectedTheme}>
      <h1>Welcome Title</h1>
    </MainHeaderStyle>
  );
};

const MainHeaderStyle = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  /* float: left; */
  background-color: ${(props) => {
    console.log("line19 props=>", props);

    return props.selectedTheme.bgColor;
  }};
  position: fixed;
  left: 5%;
  height: 10%;
  -webkit-transition: 0.4s;
  /* transition: 0.4s; */
  transition: all 0.4s ease;
`;
export default MainHeader;
