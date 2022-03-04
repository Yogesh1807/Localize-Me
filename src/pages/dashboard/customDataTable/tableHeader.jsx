import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            style={{ cursor: sortable ? "pointer" : "" }}
          >
            {name}

            {sortingField && sortingField === field && (
              <span
                style={{ padding: "0 10px" }}
                className={
                  sortingOrder === "asc" ? "fa fa-arrow-down" : "fa fa-arrow-up"
                }
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
