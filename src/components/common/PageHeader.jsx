import React from "react";

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;