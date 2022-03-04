import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";
import styled from "styled-components";

import DynamicRow from "../dynamicRow";
import AlertModal from "../../components/modal";

const CreateProject = (props) => {
  const {
    isOpenProject,
    isDiscardProject,
    selectedProject,
    projects,
    addUpdateProject,
  } = props;
  const [newProject, setNewProject] = useState({});
  const [isAlert, setIsAlert] = useState(false);

  const [formError, setFormError] = useState({
    name: { error: true, message: "please enter project name" },
    language: { error: true, message: "please select language" },
    rows: { error: true, message: "please add proper row" },
  });

  useEffect(() => {
    if (selectedProject) {
      setNewProject(selectedProject);
    }
  }, []);

  const projectNameChange = (e) => {
    // setProjects({ ...projects, projectName: e.target.value });
    let emptyObj = {};
    let nameError = formError;
    if (e.target.value !== "") {
      if (Object.keys(newProject).length === 0) {
        emptyObj = {
          default: {},
          selected: {},
          id: Object.keys(projects.default).length + 1,
          name: e.target.value,
        };
      } else {
        emptyObj = newProject;
        emptyObj.name = e.target.value;
      }
      nameError.name.error = false;
    } else {
      nameError.name.error = true;
    }
    setFormError({ ...nameError });
    setNewProject({ ...emptyObj });
    console.log("projectNameChange", newProject, e.target.value);
  };
  const onLanguageSelect = (val) => {
    console.log("Language", selectedProject, val);
    let newData = newProject;
    let languageError = formError;

    if (Object.keys(newProject).length > 0 && val !== "") {
      // newData["selected"] = {};
      if (newData["default"][val]) {
        newData["selected"] = {};
        newData["selected"][val] = newData["default"][val];
      } else {
        newData["default"][val] = [];
        newData["selected"][val] = [];
      }

      newData["selectedLangCode"] = val;
      languageError.language.error = false;
    } else {
      languageError.language.error = true;
    }
    setNewProject({ ...newData });
  };
  const handleSubmit = () => {
    console.log("submitted", newProject);
    addUpdateProject(newProject);
  };
  console.log("lin83", newProject, formError);
  return (
    <DrawerStyle isOpenProject={isOpenProject}>
      <div className="drawerHeader">
        <h1>Create New Project</h1>
      </div>
      <div className="drawerBody">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#tabs-1"
              role="tab"
            >
              Manual Add
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
              Upload Keys
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <div className="itemRow">
              <Form.Group className="formItem">
                <Form.Control
                  type="text"
                  onChange={(e) => projectNameChange(e)}
                  value={
                    Object.keys(newProject).length > 0 ? newProject.name : ""
                  }
                  placeholder="Enter Project name"
                />
              </Form.Group>
              <Form.Group className="formItem">
                <Form.Select
                  className="selectItem"
                  aria-label="Default select example"
                  onChange={(val) => {
                    onLanguageSelect(val.target.value);
                  }}
                  value={
                    Object.keys(newProject).length > 0
                      ? newProject.selected
                        ? newProject.selectedLangCode
                        : "en"
                      : ""
                  }
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="en(us)">English(US)</option>
                </Form.Select>
              </Form.Group>
            </div>
            <DynamicRow
              // rows={[]}
              newProject={newProject}
              formError={formError}
              setNewProject={setNewProject}

              // setRows={(data) => {}}
            />
          </div>
          <div className="tab-pane" id="tabs-2" role="tabpanel">
            <p>Second Panel</p>
          </div>
        </div>
      </div>
      <div className="drawerFooter">
        <Button
          variant="default"
          type="button"
          onClick={() => isDiscardProject()}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
      <AlertModal show={isAlert} handleShow={(val) => setIsAlert(val)} />
    </DrawerStyle>
  );
};

const DrawerStyle = styled.div`
  height: calc(100vh - 20px);
  width: 650px;
  display: block;
  /* align-items: center;
  justify-content: center; */
  background-color: #25aec3;
  color: white;
  position: fixed;
  z-index: 2;
  right: 0;
  transform: ${(props) =>
    props.isOpenProject ? "translateX(0)" : "translateX(100%) "};
  transition: transform 0.3s linear;
  margin-left: 200px;
  .formItem {
    margin: 0 10px 20px 0;
    width: 100%;
  }
  .rowItem {
    margin: 0 10px 0 0;
  }
  .drawerHeader {
    position: fixed;
    top: 0;
    padding: 10px;
    width: 100%;
    background-color: lightskyblue;
  }
  .drawerBody {
    padding: 15px;
    margin: 76px 0 0 0;
  }
  .drawerFooter {
    position: fixed;
    bottom: 0;
    padding: 10px;
    width: 100%;
    background-color: lightskyblue;
  }
  .selectItem {
    width: 100%;
    height: 38px;
    border-radius: 4px;
    border-color: white;
    outline: none;
    padding: 0 10px;
  }
  .itemRow {
    display: flex;
  }
`;
export default CreateProject;
