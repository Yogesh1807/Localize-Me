import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import styled from "styled-components";

let currentObj = {
  default: {
    en: [
      {
        key: "a",
        value: "A",
      },
    ],
    "en(UK)": [
      {
        key: "z",
        value: "Z",
      },
    ],
  },
  selected: undefined,
  id: 1,
  name: "project1",
};

const DynamicRow = (props) => {
  const { newProject, formError, setNewProject } = props;

  const { selectedLangCode } = newProject;
  // const [rows, setRows] = useState(undefined);
  const rows = newProject.selected;
  useEffect(() => {
    let errorObj = formError;
    if (!newProject) {
      errorObj.name.error = true;
      errorObj.language.error = true;
    } else {
      errorObj.name.error = false;
      errorObj.language.error = false;
    }
  }, [newProject, formError]);

  const handleAddRow = () => {
    if (Object.keys(newProject).length > 0 && selectedLangCode) {
      const item = newProject;
      if (
        // !item.default.hasOwnProperty(selectedLangCode) &&
        !item.selected.hasOwnProperty(selectedLangCode)
      ) {
        item.selected = {};
        item.selected[selectedLangCode] = [{ key: "", value: "" }];
        // item.default[selectedLangCode] = [{ key: "", value: "" }];
      } else {
        // item.default[selectedLangCode].push({ key: "", value: "" });
        item.selected[selectedLangCode].push({ key: "", value: "" });
      }

      // if (item.default.hasOwnProperty(selectedLangCode)) {
      //   item.default[selectedLangCode].push({ key: "", value: "" });
      // } else {
      //   item.default[selectedLangCode] = [{ key: "", value: "" }];
      // }
      setNewProject({ ...item });
    } else {
      alert("Pleasee Enter Valid Data");
    }
  };
  const handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const existedRows = newProject;

    existedRows.selected[selectedLangCode][idx] = {
      ...existedRows.selected[selectedLangCode][idx],
      [name]: value,
    };
    if (Object.keys(existedRows.default).length > 0) {
      existedRows.default[selectedLangCode][idx] = {
        ...existedRows.default[selectedLangCode][idx],
        [name]: value,
      };
    }

    // if (
    //   existedRows.default.hasOwnProperty(selectedLangCode) &&
    //   existedRows.selected.hasOwnProperty(selectedLangCode)
    // ) {
    //   existedRows.selected[selectedLangCode][idx] = {
    //     ...existedRows.selected[selectedLangCode][idx],
    //     [name]: value,
    //   };
    // } else {
    //   existedRows.selected[selectedLangCode][idx] = {
    //     ...existedRows.selected[selectedLangCode][idx],
    //     [name]: value,
    //   };
    //   existedRows.default[selectedLangCode][idx] = {
    //     ...existedRows.default[selectedLangCode][idx],
    //     [name]: value,
    //   };
    // }

    setNewProject({ ...existedRows });
  };
  const handleRemoveRow = () => {
    let existedObj = newProject;
    // let defaultExistedRows = existedObj.default[selectedLangCode].slice(0, -1);
    let selectedExistedRows = existedObj.selected[selectedLangCode].slice(
      0,
      -1
    );
    // existedObj.default[selectedLangCode] = defaultExistedRows;
    existedObj.selected[selectedLangCode] = selectedExistedRows;
    setNewProject({ ...existedObj });
  };
  const handleRemoveSpecificRow = (idx) => () => {
    const existedObj = newProject;
    // existedObj.default[selectedLangCode].splice(idx, 1);
    existedObj.selected[selectedLangCode].splice(idx, 1);
    setNewProject({ ...existedObj });
  };
  console.log("DynamicRow", newProject);
  return (
    <DynamicRowStyle>
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column" style={{ padding: 0 }}>
            <table className="table table-bordered table-hover" id="tab_logic">
              <thead>
                <tr>
                  <th className="text-center"> # </th>
                  <th className="text-center"> Key </th>
                  <th className="text-center"> Value </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows &&
                  Object.keys(rows).length > 0 &&
                  rows[selectedLangCode] &&
                  rows[selectedLangCode].map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name="key"
                          value={
                            Object.keys(rows).length > 0 &&
                            rows[selectedLangCode][idx].key
                          }
                          onChange={handleChange(idx, "key")}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="value"
                          value={
                            Object.keys(rows).length > 0 &&
                            rows[selectedLangCode][idx].value
                          }
                          onChange={handleChange(idx, "value")}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button onClick={() => handleAddRow()} className="btn btn-primary">
              Add Row
            </button>
            <button
              onClick={() => handleRemoveRow()}
              className="btn btn-danger float-right"
            >
              Delete Last Row
            </button>
          </div>
        </div>
      </div>
    </DynamicRowStyle>
  );
};
const DynamicRowStyle = styled.div`
  overflow-y: auto;
  height: calc(100vh - 270px);
`;

export default DynamicRow;
