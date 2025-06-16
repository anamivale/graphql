# 42 Profile GraphQL Dashboard

A personalized profile dashboard built using **GraphQL**, **JWT Authentication**, and **SVG graphics** to visualize progress, XP, and audit statistics from the 42/Zone01 school platform.

## 🚀 Objective

The purpose of this project is to gain hands-on experience with **GraphQL** by:
- Authenticating users with **JWT**
- Fetching personal data via **GraphQL**
- Creating an interactive profile dashboard
- Displaying stats using **SVG graphs**

## 🌐 Live Demo

[https://anamivale.github.io/graphql/](https://anamivale.github.io/graphql/)
---

##  Features

- **Login page** with username/email and password support
- **JWT Authentication** via the Zone01 GraphQL API
- Displays essential personal stats:
  - Basic info (username, campus, etc.)
  - XP earned per project
  - Audit ratio
  - Grade progression
- **Three statistical graphs** built using **pure SVG**:
  1. 📊 **Bar Chart** – XP by project
  2. 🥧 **Pie Chart** – Audit Up vs Down ratio

---

##  Technologies

- HTML/CSS/JS (Vanilla)
- SVG (for graph rendering)
- GraphQL
- JWT authentication
- Hosted on GitHub Pages

---

## 🔐 Authentication

We authenticate against:  
`https://learn.zone01kisumu.ke/api/auth/signin`

- Method: `POST`
- Headers: `Authorization: Basic <base64encoded(username:password)>`
- Returns: JWT token

This JWT is then used to make authorized GraphQL queries.

```bash
POST https://learn.zone01kisumu.ke/api/auth/signin
Authorization: Basic base64(username:password)
```
## Project Structure
```
📁 project-root
├── index.html
├── profile.css
├── profile.js
├── README.md
├── audit.js
├── graphs.js
├── templates.js

```



## Clone the Repository
```bash
git clone https://github.com/anamivale/graphql.git
cd graphql
```

## usage 
Run locally by navigating to index.html and open it via live server.





