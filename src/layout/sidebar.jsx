import React from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logout } from "../store/actions/auth";
import { svgIcons } from "../utils/svgicon";

function Sidebar(props) {
  const history = useHistory();
  let pageName = useLocation().pathname;
  pageName = pageName === "/" ? "/dashboard" : pageName;
  console.log("sidebar props", props, svgIcons, pageName);
  const { userData, setCollapse, collapse } = props;
  const { selectedTheme } = props.content.props;

  const OnLogout = () => {
    if (logout()) {
      history.push("/login");
    } else {
      history.push("/");
    }
  };
  const getMenus = () => {
    return (
      Object.keys(userData).length > 0 &&
      userData.modules.length > 0 &&
      userData.modules.map((item) => {
        console.log("line79=>", userData.content[item.name]);
        const params = {
          pathname: `/${item.name}`,
          //   pathname: `/page`,
          content: userData.content[`${item.name}`],
        };
        return (
          <Link
            className={pageName === `/${item.name}` ? "active" : ""}
            title={item.name}
            to={params}
            key={item.name}
          >
            {collapse ? (
              <span style={{ padding: "0 15px" }}>{svgIcons[item.name]()}</span>
            ) : (
              <>
                <span style={{ padding: "0 15px" }}>
                  {svgIcons[item.name]()}
                </span>
                <span style={{ padding: "0 15px" }}>{item.name}</span>
              </>
            )}
          </Link>
        );
      })
    );
  };

  return (
    <SidebarStyle collapse={collapse} selectedTheme={selectedTheme}>
      <div className="icon-bar">{getMenus()}</div>
      <ul className="actionBtnList">
        <li>
          <button
            title="Logout"
            onClick={() => OnLogout()}
            className="logoutBtn"
          >
            {collapse ? (
              <span>{svgIcons["logout"]()}</span>
            ) : (
              <>
                <span>{svgIcons["logout"]()}</span>
                <label>Logout</label>
              </>
            )}
          </button>
        </li>
        <li>
          <button
            title="Collapse"
            className="collapseBtn"
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? (
              <span>{svgIcons["collapse"]()}</span>
            ) : (
              <>
                <span>{svgIcons["collapse"]()}</span>
                <label>Collapse</label>
              </>
            )}
          </button>
        </li>
      </ul>
    </SidebarStyle>
  );
}
export default Sidebar;

export const SidebarStyle = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: ${(props) => (props.collapse ? "5%" : "20%")};
  float: left;
  background-color: ${(props) => {
    console.log("line96 props=>", props);
    return props.selectedTheme.bgColor;
  }};
  position: fixed;
  height: 100%;
  overflow-y: ${(props) => (props.collapse ? "none" : "auto")};
  -webkit-transition: 0.4s;
  /* transition: 0.4s; */
  transition: all 0.4s ease;
  button {
    cursor: pointer;
  }
  a {
    display: block;
    color: ${(props) => props.selectedTheme.icon.color};

    padding: 16px;
    text-decoration: none;
    text-transform: capitalize;
  }

  a.active {
    /* background-color: #04aa6d; */
    color: white;
  }

  a:hover:not(.active) {
    background-color: #555;
    color: white;
  }
  .icon-bar {
    /* background-color: #555; */
  }

  .icon-bar a {
    padding: 10px;
    transition: all 0.3s ease;
    font-size: 25px;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    display: flex;
    place-content: ${(props) => (props.collapse ? "center" : "flex-start")};
    /* transition: 0.4s; */
    transition: all 0.4s ease;
  }

  .icon-bar a:hover {
    color: ${(props) => props.selectedTheme.colors.white};
    background-color: transparent;
  }

  .active {
    color: ${(props) => props.selectedTheme.colors.white};
    background-color: transparent;
  }

  div.content {
    margin-left: 200px;
    padding: 1px 16px;
    height: 1000px;
  }
  .actionBtnList {
    position: absolute;
    bottom: 0px;
    left: 0;
    list-style: none;
    padding: 0;
    font-size: 25px;
    /* text-align: center; */
    border-top: 5px solid #0c1c31;
    cursor: pointer;
    margin: 0;
    width: 100%;
    display: ${(props) => (props.collapse ? "block" : "flex")};
  }
  .actionBtnList li {
    padding: 10px 3px;
    border: 0;
  }
  .actionBtnList li label {
    padding: 0 10px;
    margin: 0;
  }
  .logoutBtn {
    border: 0;
    background-color: transparent;
    color: ${(props) => props.selectedTheme.icon.color};
    width: 100%;
  }
  .logoutBtn:hover {
    color: ${(props) => props.selectedTheme.colors.white};
    background-color: transparent;
  }
  .collapseBtn {
    border: 0;
    background-color: transparent;
    color: ${(props) => props.selectedTheme.icon.color};
    width: 100%;
  }
  .collapseBtn:hover {
    color: ${(props) => props.selectedTheme.colors.white};
    background-color: transparent;
  }
  button:focus {
    outline: 0px auto -webkit-focus-ring-color;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    height: auto;
    position: relative;

    a {
      float: left;
    }
    div.content {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 400px) {
    a {
      text-align: center;
      float: none;
    }
  }
`;
