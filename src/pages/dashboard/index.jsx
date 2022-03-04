import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import update from "immutability-helper";

import yslogo from "../../assets/img/YLOGO.png";
import CreateProject from "./createProject";
import { PageLayout } from "../../layout";
import CustomDataTable from "./customDataTable";

const ProjectData = {
  default: {
    1: {
      default: {
        en: [
          {
            key: "a",
            value: "A",
          },
        ],
        "en(us)": [
          {
            key: "z",
            value: "Z",
          },
        ],
      },
      selected: undefined,
      id: 1,
      name: "project1",
      selectedLangCode: "en",
    },
    2: {
      default: {
        en: [
          {
            key: "b",
            value: "B",
          },
        ],
        "en(us)": [
          {
            key: "c",
            value: "C",
          },
        ],
      },
      selected: undefined,
      id: 2,
      name: "project2",
      selectedLangCode: "en",
    },
    3: {
      default: {
        en: [
          {
            key: "d",
            value: "D",
          },
        ],
        "en(us)": [
          {
            key: "e",
            value: "E",
          },
        ],
      },
      selected: undefined,
      id: 3,
      name: "project3",
      selectedLangCode: "en",
    },
  },
  selected: undefined,
};

function Dashboard(props) {
  const params = useLocation();
  const { content } = params;
  const { setThemeState, theme } = props;
  const [toggleModal, setToggelModal] = useState(false);
  const [projects, setProjects] = useState(undefined);

  useEffect(() => {
    const getData = () => {
      // showLoader();

      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((json) => {
          // hideLoader();
          let localdata = localStorage.getItem("projects");
          if (localdata) {
            setProjects(JSON.parse(localdata));
          } else {
            setProjects(ProjectData);
          }

          // setProjects(json);
          console.log(JSON.parse(localdata));
        });
    };

    getData();
  }, []);

  const showModal = ({ type }) => {
    if (type === "add") {
      let existedProjects = projects;
      existedProjects.selected = {};
      setProjects({ ...existedProjects });
    }
    setToggelModal(!toggleModal);
  };
  const discardProject = () => {
    showModal({ type: "cancel" });
  };
  const addUpdateProject = (data) => {
    console.log("submit data", data);
    let existedProjects = projects;

    if (
      data &&
      data.projectName !== "" &&
      Object.keys(data.selected).length > 0 &&
      Object.values(data.selected)[0].length > 0 &&
      Object.values(data.selected)[0].every(
        (o) => o.key !== "" && o.value !== ""
      )
    ) {
      // if (existedProjects.default[data.id]) {
      //   // existedProjects.default[data.id].push(data);
      // } else {
      existedProjects.default[data.id] = data;
      existedProjects.selected = undefined;
      // }

      setProjects({ ...existedProjects });
      localStorage.setItem("projects", JSON.stringify({ ...existedProjects }));
      showModal({ type: "cancel" });
    } else {
      alert("Pleasee Enter Valid Data");
    }
  };
  const onThemeChange = (e) => {
    console.log("onThemeChange", e.target.value, e.target.checked);
    let temp = {};

    if (e.target.checked) {
      theme.default[e.target.value].checked = e.target.checked;
      temp = update(theme, {
        $merge: { selected: theme.default[e.target.value] },
      });
    } else {
      theme.default[e.target.value].checked = e.target.checked;
      temp = update(theme, {
        $merge: { selected: {} },
      });
    }
    setThemeState(temp);
  };
  const selectedTheme = theme.selected;
  // Object.values(theme).find((item) => item.checked === true);
  console.log(
    "Home line=>9",
    props,
    params,
    content,
    selectedTheme,
    toggleModal,
    projects
  );

  return PageLayout({
    header: true,
    content: (
      <DashboardStyle selectedTheme={selectedTheme}>
        {toggleModal && (
          <CreateProject
            isOpenProject={toggleModal}
            isDiscardProject={() => discardProject()}
            selectedProject={projects ? projects.selected : undefined}
            projects={projects}
            addUpdateProject={addUpdateProject}

            // selectedLangCode={(projects && projects.selectedLangCode) || "en"}
          />
        )}
        <h1 className="summaryTitle">Welcome to Dashboard</h1>
        <div className="actionrow">
          <button
            type="button"
            onClick={() => showModal({ type: "add" })}
            className="btn btn-primary"
          >
            Add Project
          </button>
        </div>
        <div className="bodyContent">
          {projects && (
            <CustomDataTable
              projects={projects && projects}
              setProjects={setProjects}
              showModal={showModal}
              selectedTheme={selectedTheme}
            />
          )}
        </div>
        {/* <div className="blankData">Please Create Project</div> */}
      </DashboardStyle>
    ),
    ...props,
  });
}

export default Dashboard;

export const DashboardStyle = styled.div`
  .summary {
    background-color: ${(props) => props.selectedTheme.text.bgColor};
    height: auto;
    display: inline-flex;
    flex-direction: row;
    justify-content: start;
    padding: 20px;
    /* padding: 16px 20px; */
    text-align: justify;
    /* border-radius: 5px; */
    /* box-shadow: 1px 2px 3px 0px red; */
  }
  .componentSummary {
    display: flex;
    height: auto;
    margin: 10px;
    padding: 0px;
    text-align: justify;
    border-radius: 5px;
    box-shadow: 1px 2px 3px 0px red;
  }
  .summaryData > p {
    margin: 0;
  }
  .summaryTitle {
    margin: 10px 0;
    text-transform: capitalize;
    color: ${(props) => {
      console.log("line68=>", props);
      return props.selectedTheme.h2.color;
    }};
    text-align: left;
    padding: 14px;
    background: #17a2b857;
    margin: 20px;
    border-radius: 4px;
    width: auto;
  }
  .actionrow {
    margin: 10px 0;
    text-transform: capitalize;
    color: ${(props) => {
      console.log("line68=>", props);
      return props.selectedTheme.h2.color;
    }};
    text-align: left;
    padding: 20px;
    background: yellow;
    margin: 20px;
    border-radius: 4px;
    width: auto;
  }
  .summaryData {
    /* font-family: "ProximalNova"; */
    color: ${(props) => props.selectedTheme.text.color};
    font-weight: normal;
    font-size: 4vh;
  }
  .blankData {
    background-color: #d3d3d34a;
    text-align: center;
    font-size: 30px;
    height: 30vh;
  }
  .bodyContent {
    /* width: 100%; */
    padding: 20px;
  }
  .summaryData > p > a {
    color: ${(props) => props.selectedTheme.link.color};
    cursor: pointer;
  }
  img {
    border-radius: 50%;
    height: 300px;
    margin: 0 20px 0 0;
    float: left;
    background-color: ${(props) => props.selectedTheme.bgColor};
  }
  .themeSelector {
    display: flex;
    padding: 10px;
    height: 100%;
  }
  .color1 {
    color: #1f0202;
    height: calc(100vh / 3);
    border-radius: 50%;
    width: 100%;
    margin: 10px;
    text-align: center;
    padding: 20px;
    cursor: pointer;
  }
  .color2 {
    color: #1f0202;
    height: 100%;
    border-radius: 50%;
    width: 100%;
    text-align: center;
    padding: 20px;
    cursor: pointer;
  }
  .color1:hover {
    color: white;
  }
  #Theme1 {
    box-sizing: border-box;
    padding: 151px;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  input[type="radio" i] {
    border: 0;
  }
`;
