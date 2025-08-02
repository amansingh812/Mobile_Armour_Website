import Link from "next/link";
import React from "react";

function Pagination({}) {
  return (
    <div className="row">
      <ul className="pagination d-flex justify-content-center">
        <li className="page-item active">
          <Link className="page-link" href="#">
            1
          </Link>
        </li>
        <li className="page-item" aria-current="page">
          <Link className="page-link" href="#">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            3
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            <i className="las la-angle-right"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
