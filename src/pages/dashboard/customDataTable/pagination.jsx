import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

const PaginationComponent = ({
  total = 0,
  postPerPage = 10,
  currentPage = 1,
  SetCurrentPage,
}) => {
  const numOfPages = Math.ceil(total.length / postPerPage);
  console.log(total, numOfPages);

  const numOfButtons = [];
  for (let i = 1; i <= numOfPages; i++) {
    numOfButtons.push(i);
  }

  const prevPageClick = () => {
    if (currentPage === 1) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (currentPage === numOfButtons.length) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage + 1);
    }
  };

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfButtons = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numOfButtons.length < 6) {
      tempNumberOfButtons = numOfButtons;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length];
    } else if (currentPage === 4) {
      const sliced = numOfButtons.slice(0, 5);
      tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
    } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
      // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
      // sliced1 (5, 5+1) -> [6]
      tempNumberOfButtons = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numOfButtons.length,
      ];
      // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentPage > numOfButtons.length - 3) {
      // > 7
      const sliced = numOfButtons.slice(numOfButtons.length - 4);
      // slice(10-4)
      tempNumberOfButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      SetCurrentPage(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      SetCurrentPage(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfButtons);
  }, [currentPage, postPerPage, numOfPages]);

  console.log("lin97", arrOfCurrButtons);
  return (
    <PaginationStyle>
      <div className="table-filter-info">
        <div className="dt-pagination">
          <ul className="dt-pagination-ul">
            <li className={`dt-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a className="dt-link" onClick={prevPageClick}>
                Prev
              </a>
            </li>
            {arrOfCurrButtons.map((data, index) => {
              return (
                <li
                  key={index}
                  className={`dt-item ${currentPage === data ? "active" : ""}`}
                >
                  <a className="dt-link" onClick={() => SetCurrentPage(data)}>
                    {data}
                  </a>
                </li>
              );
            })}
            <li
              className={`dt-item ${
                currentPage === numOfButtons.length ? "disabled" : ""
              }`}
            >
              <a className="dt-link" onClick={nextPageClick}>
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  .table-filter-info {
    padding: 15px;
  }
  .thead-primary tr th {
    background-color: #5a8dee;
    border-color: #5a8dee;
    color: #fff;
  }
  .dt-pagination-ul {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    padding-left: 0;
    border-top: 1px solid #dee2e6;
    padding-top: 15px;
  }

  .dt-pagination .dt-item {
    display: inline-block;
  }

  .dt-pagination .dt-item .dt-link {
    padding: 6px 8px;
    min-width: 32px;
    min-height: 32px;
    border-radius: 8px;
    margin-left: 0;
    margin-right: 8px;
    border: 1px solid #fff;
    font-size: 12px;
    font-weight: 500;
    color: #8a93a6;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

  .dt-pagination .dt-item .dt-link:hover {
    background-color: #ebf2fd;
    color: #5a8dee;
  }

  .dt-pagination .dt-item.disabled .dt-link {
    background-color: #f6f7fb;
    color: #d7dae0;
    cursor: not-allowed;
  }

  .dt-pagination .dt-item:first-child .dt-link,
  .dt-pagination .dt-item:last-child .dt-link {
    background-color: #f6f7fb;
  }

  .dt-pagination .dt-item.active .dt-link {
    background-color: #5a8dee;
    border-color: #5a8dee;
    color: #fff;
  }
`;
export default PaginationComponent;
