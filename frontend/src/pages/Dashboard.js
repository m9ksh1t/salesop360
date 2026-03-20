import React, { useEffect, useState } from "react";
import API from "../api";

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid
} from "@mui/material";

function Dashboard() {

  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchLeads = () => {
    API.get("leads/")
      .then(res => setLeads(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const createLead = () => {
    API.post("leads/create/", { name, email })
      .then(() => {
        setName("");
        setEmail("");
        fetchLeads();
      });
  };

  const deleteLead = (id) => {
    API.delete(`leads/delete/${id}/`)
      .then(() => fetchLeads());
  };

  return (
    <Container>

      <Typography variant="h4" gutterBottom>
        SalesOps360 Dashboard
      </Typography>

      {/* Create Lead */}
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>

          <Typography variant="h6">Create Lead</Typography>

          <Grid container spacing={2}>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={createLead}
              >
                Add
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {/* Leads List */}
      <Typography variant="h6">Leads</Typography>

      <Grid container spacing={2}>

        {leads.map((lead) => (
          <Grid item xs={4} key={lead.id}>

            <Card>
              <CardContent>

                <Typography variant="h6">
                  {lead.name}
                </Typography>

                <Typography color="textSecondary">
                  {lead.email}
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  style={{marginTop:"10px"}}
                  onClick={()=>deleteLead(lead.id)}
                >
                  Delete
                </Button>

              </CardContent>
            </Card>

          </Grid>
        ))}

      </Grid>

    </Container>
  );
}

export default Dashboard;