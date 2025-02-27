import React, { useEffect, useState } from "react";
import { getCompanies, addCompany, deleteCompany } from "../api/api";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Home() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getCompanies();
      setCompanies(data);
    }
    fetchData();
  }, []);

  const handleAddCompany = async () => {
    if (newCompany.trim() === "") return;
    const addedCompany = await addCompany({ name: newCompany });
    if (addedCompany) {
      setCompanies([...companies, addedCompany]);
      setNewCompany("");
    }
  };

  const handleDeleteCompany = async (id) => {
    await deleteCompany(id);
    setCompanies(companies.filter((company) => company.id !== id));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <h1>Companies</h1>
      <TextField
        label="Enter company name"
        variant="outlined"
        fullWidth
        value={newCompany}
        onChange={(e) => setNewCompany(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleAddCompany}>
        Add Company
      </Button>
      <List>
        {companies.length > 0 ? (
          companies.map((company) => (
            <ListItem
              key={company.id}
              secondaryAction={
                <IconButton edge="end" color="error" onClick={() => handleDeleteCompany(company.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={company.name} />
            </ListItem>
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </List>
    </Container>
  );
}

export default Home;
