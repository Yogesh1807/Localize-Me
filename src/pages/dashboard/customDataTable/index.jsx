import React, { useEffect, useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

import Search from "./search";
import TableHeader from "./tableHeader";
import Pagination from "./pagination";

const CustomDataTable = (props) => {
  const { projects, setProjects, showModal, selectedTheme } = props;

  // const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [pageItem, SetPageItem] = useState(10);

  const headers = [
    { name: "No", field: "id", sortable: true },
    { name: "Project Name", field: "name", sortable: true },
    { name: "Language", field: "email", sortable: false },
    { name: "Actions", field: "body", sortable: false },
  ];

  const commentsData = useMemo(() => {
    let computedComments = [];
    let newProjects = {};
    if (search !== "") {
      // setSorting({ field: "", order: "" });
      computedComments =
        Object.keys(projects.default).length > 0 &&
        Object.values(projects.default).filter(
          (comment) => comment.name.toLowerCase().includes(search.toLowerCase())
          // comment.email.toLowerCase().includes(search.toLowerCase())
        );
      // if (computedComments.length > 0) {
      //   computedComments.forEach((item) => {
      //     newProjects[item] = projects.default[item];
      //   });
      // }
    }
    //Sorting projects
    else if (sorting.field !== "") {
      const reversed = sorting.order === "asc" ? 1 : -1;
      if (sorting.field === "id") {
        computedComments =
          Object.values(projects.default).length > 0 &&
          Object.values(projects.default).sort(
            (a, b) => reversed * (a.id - b.id)
          );
      } else {
        computedComments =
          Object.values(projects.default).length > 0 &&
          Object.values(projects.default).sort(
            (a, b) =>
              reversed * a[sorting.field].localeCompare(b[sorting.field])
          );
      }

      if (computedComments.length > 0) {
        computedComments.forEach((item) => {
          newProjects[item.name] = projects.default[item.name];
        });
      }
    }

    setTotalItems(computedComments.length);

    console.log("line113", projects);

    //Current Page slice
    return computedComments.length !== 0
      ? computedComments.slice(
          (currentPage - 1) * pageItem,
          (currentPage - 1) * pageItem + pageItem
        )
      : Object.keys(projects.default).length > 0
      ? Object.values(projects.default).slice(
          (currentPage - 1) * pageItem,
          (currentPage - 1) * pageItem + pageItem
        )
      : [];
  }, [projects, currentPage, search, sorting, pageItem]);

  const editProjectData = (selectedProject) => {
    console.log("line246", selectedProject, projects.default);
    let oldProjects = projects;
    oldProjects.selected = projects.default[selectedProject];
    setProjects({ ...oldProjects });
    showModal({ type: "edit" });
  };

  return (
    <CustomDataTableStyle selectedTheme={selectedTheme}>
      <div className="row w-100">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div
              className="col-sm-12 col-md-1 col-lg-1"
              style={{ padding: "0 8px" }}
            >
              <span className="totalDisplay">
                {Object.keys(projects.default).length}
              </span>
              <p className="totalText">Total Projects</p>
            </div>
            <div className="col-sm-12 col-md-1 col-lg-1">
              <Form.Select
                className="form-control"
                onChange={(val) => {
                  SetPageItem(Number(val.target.value));
                }}
                value={pageItem}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table className="table table-striped">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {commentsData.map((project, index) => (
                <tr>
                  <th
                    scope="row"
                    key={project.id}
                    // key={currentPage > 1 ? index + 1 + pageItem : index + 1}
                  >
                    {project.id}
                  </th>
                  <td>
                    {Object.keys(projects.default).length > 0 &&
                      projects.default[project.id].name}
                  </td>
                  <td>
                    <Form.Select
                      className="form-control"
                      onChange={(e) => {
                        console.log("line292", e.target.value);
                      }}
                      value={
                        Object.keys(projects.default).length > 0
                          ? Object.keys(projects.default[project.id].default)[0]
                          : ""
                      }
                    >
                      <option value="">Select Language</option>
                      {
                        // console.log(Object.keys(projects[comment]));
                        Object.keys(projects.default[project.id].default).map(
                          (langCode) => (
                            <option value={langCode}>{langCode}</option>
                          )
                        )
                      }
                    </Form.Select>
                  </td>
                  <td>
                    <button
                      className="btn form-control"
                      onClick={() => {
                        alert(project.id);
                        editProjectData(project.id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            total={Object.keys(projects.default)}
            postPerPage={pageItem}
            currentPage={currentPage}
            SetCurrentPage={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      {/* {loader} */}
    </CustomDataTableStyle>
  );
};
const CustomDataTableStyle = styled.div`
  .totalDisplay {
    border: ${(props) => {
      console.log("line356=>", props);
      return `1px solid ${props.selectedTheme.bgColor}`;
    }};
    border-radius: 50%;
    padding: 5px 10px;
  }
  .totalText {
    margin-top: 1rem;
    font-size: 12px;
    font-weight: bold;
  }
`;
export default CustomDataTable;
