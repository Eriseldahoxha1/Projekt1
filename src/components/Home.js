import * as React from "react";
import { useState, useEffect } from "react";

import data from "./MockData.json";
import uuid from "react-uuid";
import Table from "react-bootstrap/Table";
import Forms from "./Form";
import "./Home.css";

export default function CustomizedTables() {
  // const url = "http://localhost:4000/jobsites";
  const [jobsite, getJobsite] = useState(data);

  // useEffect(() => {
  //   getjobsiteData();
  // });
  // const getjobsiteData = () => {
  //   fetch(url)
  //     .then((resp) => resp.json())
  //     .then((resp) => getJobsite(resp));
  // };
  const onHold = jobsite.filter((item) => item.status === "On-Hold");
  const onHoldCount = onHold.length;
  const onRoad = jobsite.filter((item) => item.status === "On-Road");
  const onRoadCount = onRoad.length;
  const completed = jobsite.filter((item) => item.status === "Completed");
  const completedCount = completed.length;
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="main">
      <div className="navBar">
        <div className="container On-Road">
          <div>{onRoadCount} On Road</div>
        </div>
        <div className="container Completed">
          <div>{completedCount} Completed</div>
        </div>

        <div className="container On-Hold">
          <div>{onHoldCount} On Hold </div>
        </div>
      </div>
      <div className="title-container">
        <div className="title">
          <h3 className="titlename">Title</h3>
        </div>
        <div className="item-search">
          <form className="form-container">
            <input
              type={"text"}
              className=""
              placeholder="Search Note Name"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          <Forms getJobsite={getJobsite}></Forms>
        </div>

        <Table striped>
          <thead>
            <tr>
              <th className="tablehead">Job Name</th>
              <th className="tablehead">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsite &&
              jobsite
                .filter((item) =>
                  item.jobsiteName
                    .toLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
                )
                .map((jobsite) => (
                  <tr key={jobsite.id}>
                    <td>
                      <a href={`/jobsites/${jobsite.id}`}>
                        {jobsite.jobsiteName}
                      </a>
                    </td>

                    <td className="td-status">
                      <div className={`${jobsite.status} status`}>
                        {jobsite.status}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
