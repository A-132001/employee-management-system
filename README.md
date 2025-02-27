# Employee Management System

This is a Full-Stack Employee Management System built using **Django (backend)** and **React (frontend)**.

## 📌 Features

- **User Authentication (JWT)**
- **Role-Based Access Control (Admin, Manager, Employee)**
- **CRUD Operations for Employees, Departments, and Companies**
- **React Frontend with Tailwind CSS**
- **Token Refresh for Secure API Access**

## 🛠️ Tech Stack

- **Backend:** Django, Django REST Framework, Simple JWT
- **Frontend:** React, React Router, Axios, Tailwind CSS

## 🚀 Installation Guide

### 🔹 1. Clone the Repository

```bash
git clone <YOUR_REPO_URL>
cd employee-management-system
```

## 2- BackEnd SetUp

```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```

## 3- FrontEnd SetUp

```bash
cd frontend
npm install
npm start

```
