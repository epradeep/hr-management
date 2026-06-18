import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "../api/axios";

function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const getTotalCount = async () => {
      const response = await axios.get("/employees", {
        params: {
          _page: 1,
          _limit: 1,
        },
      });

      setTotalEmployees(Number(response.headers["x-total-count"]));
    };

    getTotalCount();
  }, []);

  return (
    <div>
      <h2 className="text-left font-bold text-xl mb-4">HR Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Link to="/employees">
          <div className="card bg-base-100 shadow p-4">
            <h2>Total Employees</h2>
            <p className="text-xl">{totalEmployees}</p>
          </div>
        </Link>
        {/* <div className="card bg-base-100 shadow p-4">
          <h2>Departments</h2>
          <p className="text-xl">{departmentCount}</p>
        </div> */}
        {/* <div className="card bg-base-100 shadow p-4">
          <h2>Current Page</h2>
          <p className="text-xl">
            {currentEmployees} / page {page}
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
