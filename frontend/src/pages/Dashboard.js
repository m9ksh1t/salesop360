import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    API.get("leads/")
      .then(res => {
        setLeads(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{padding:"40px"}}>
      <h1>SalesOps360 Dashboard</h1>

      <h3>Leads</h3>

      {leads.length === 0 && <p>No leads found</p>}

      {leads.map((lead) => (
        <div key={lead.id} style={{marginBottom:"10px"}}>
          <strong>{lead.name}</strong> — {lead.email}
        </div>
      ))}

    </div>
  );
}

export default Dashboard;