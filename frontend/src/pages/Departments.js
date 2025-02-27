import React, { useEffect, useState } from "react";
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from "../api/api";
import { getCompanies } from "../api/api";
import {
    Container, TextField, Button, List, ListItem, ListItemText,
    MenuItem, Select, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [companies, setCompanies] = useState([]);
    const [editingDepartment, setEditingDepartment] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setDepartments(await getDepartments());
            setCompanies(await getCompanies());
        }
        fetchData();
    }, []);

    const handleSaveDepartment = async () => {
        if (!name || !company) return;

        if (editingDepartment) {
            const updatedDepartment = await updateDepartment(editingDepartment.id, { name, company });
            if (updatedDepartment) {
                setDepartments(departments.map(dept => dept.id === editingDepartment.id ? updatedDepartment : dept));
                setEditingDepartment(null);
            }
        } else {
            const newDepartment = await addDepartment({ name, company });
            if (newDepartment) {
                setDepartments([...departments, newDepartment]);
            }
        }

        setName("");
        setCompany("");
    };

    const handleEditDepartment = (department) => {
        setEditingDepartment(department);
        setName(department.name);
        setCompany(department.company);
    };

    const handleDeleteDepartment = async (id) => {
        await deleteDepartment(id);
        setDepartments(departments.filter((dept) => dept.id !== id));
    };

    return (
        <Container maxWidth="sm">
            <h1>{editingDepartment ? "Edit Department" : "Add Department"}</h1>
            <TextField
                label="Department Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "10px" }}
            />
            <Select
                fullWidth
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                displayEmpty
                style={{ marginBottom: "10px" }}
            >
                <MenuItem value="" disabled>Select Company</MenuItem>
                {companies.map((comp) => (
                    <MenuItem key={comp.id} value={comp.id}>{comp.name}</MenuItem>
                ))}
            </Select>
            <Button variant="contained" color="primary" fullWidth onClick={handleSaveDepartment}>
                {editingDepartment ? "Update Department" : "Add Department"}
            </Button>
            <List>
                {departments.map((dept) => (
                    <ListItem key={dept.id}>
                        <ListItemText primary={`${dept.name}`} />
                        <IconButton edge="end" color="primary" onClick={() => handleEditDepartment(dept)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" color="error" onClick={() => handleDeleteDepartment(dept.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Departments;
