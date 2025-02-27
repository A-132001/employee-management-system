import React, { useEffect, useState } from "react";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../api/api";
import { getCompanies, getDepartments } from "../api/api";
import {
    Container, TextField, Button, List, ListItem, ListItemText,
    MenuItem, Select, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [hiredOn, setHiredOn] = useState("");
    const [status, setStatus] = useState("application_received");
    const [company, setCompany] = useState("");
    const [department, setDepartment] = useState("");
    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setEmployees(await getEmployees());
            setCompanies(await getCompanies());
        }
        fetchData();
    }, []);

    const handleCompanyChange = async (selectedCompany) => {
        setCompany(selectedCompany);
        setDepartments(await getDepartments());
    };

    const handleSaveEmployee = async () => {
        if (!name || !email || !phone || !address || !designation || !company || !department || !hiredOn || !status) {
            console.error("All fields are required!");
            return;
        }

        const newEmployee = {
            name,
            email,
            phone,
            address,
            designation,
            hired_on: hiredOn,
            status,
            company: parseInt(company),
            department: parseInt(department)
        };

        console.log("Sending employee data:", newEmployee);

        if (editingEmployee) {
            const updatedEmployee = await updateEmployee(editingEmployee.id, newEmployee);
            if (updatedEmployee) {
                setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updatedEmployee : emp));
                setEditingEmployee(null);
            }
        } else {
            const addedEmployee = await addEmployee(newEmployee);
            if (addedEmployee) {
                setEmployees([...employees, addedEmployee]);
            }
        }

        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setDesignation("");
        setHiredOn("");
        setStatus("application_received");
        setCompany("");
        setDepartment("");
    };

    const handleEditEmployee = (employee) => {
        setEditingEmployee(employee);
        setName(employee.name);
        setEmail(employee.email);
        setPhone(employee.phone);
        setAddress(employee.address);
        setDesignation(employee.designation);
        setHiredOn(employee.hired_on || "");
        setStatus(employee.status);
        setCompany(employee.company);
        setDepartment(employee.department);
    };

    const handleDeleteEmployee = async (id) => {
        await deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
    };

    return (
        <Container maxWidth="sm">
            <h1>{editingEmployee ? "Edit Employee" : "Add Employee"}</h1>
            <TextField label="Full Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Phone" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="Address" fullWidth multiline rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
            <TextField label="Designation" fullWidth value={designation} onChange={(e) => setDesignation(e.target.value)} />
            <TextField label="Hired On" type="date" fullWidth value={hiredOn} onChange={(e) => setHiredOn(e.target.value)} InputLabelProps={{ shrink: true }} />
            <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="application_received">Application Received</MenuItem>
                <MenuItem value="interview_scheduled">Interview Scheduled</MenuItem>
                <MenuItem value="hired">Hired</MenuItem>
                <MenuItem value="not_accepted">Not Accepted</MenuItem>
            </Select>
            <label>Choose Company</label>
            <Select fullWidth value={company} onChange={(e) => handleCompanyChange(e.target.value)}>
                {companies.map((comp) => (
                    <MenuItem key={comp.id} value={comp.id}>{comp.name}</MenuItem>
                ))}
            </Select>
            <label>Choose Department</label>
            <Select fullWidth value={department} onChange={(e) => setDepartment(e.target.value)}>

                {departments.filter((dept) => dept.company === company).map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
                ))}
            </Select>

            <Button variant="contained" color="primary" fullWidth onClick={handleSaveEmployee}>
                {editingEmployee ? "Update Employee" : "Add Employee"}
            </Button>
            <List>
                {employees.map((emp) => (
                    <ListItem key={emp.id}>
                        <ListItemText primary={`${emp.name} - ${emp.designation}`} secondary={`${emp.email}`} />
                        <IconButton edge="end" color="primary" onClick={() => handleEditEmployee(emp)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" color="error" onClick={() => handleDeleteEmployee(emp.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Employees;
