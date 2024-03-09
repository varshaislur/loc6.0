import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, curPage }) => {
  return (
    <div className="pageheader-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="page-header text-center">
              <h2>{title}</h2>
              <nav aria-label="breadcrum">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Shop
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
