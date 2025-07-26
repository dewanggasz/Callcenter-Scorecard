Call Center Scorecard Application
A web-based scorecard application for the call center industry to monitor and evaluate daily agent performance. This application is built with a React frontend and a Laravel backend.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Git Workflow](#git-workflow)

## Project Overview

This application provides a transparent and structured scorecard dashboard for Supervisors (SPV), Team Leaders (TL), and Agents. It allows for manual data input, Excel imports, and PDF/Excel exports.

## Features

- Role-based authentication (SPV, TL, Agent)
- Manual scorecard input per agent
- KPI Dashboard (Handled Calls, AHT, ACW, FCR, etc.)
- Role-based views and permissions
- Excel Import and PDF/Excel Export
- Performance visualization dashboard

## Technology Stack

- **Frontend:** React, SCSS (BEM), Axios
- **Backend:** Laravel, Sanctum
- **Database:** MySQL
- **Development Environment:** Laravel Herd
- **Libraries:** `maatwebsite/excel`, `dompdf/dompdf`

## Setup and Installation

**Backend Setup:**

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `composer install`
3.  Create your `.env` file: `cp .env.example .env`
4.  Generate app key: `php artisan key:generate`
5.  Configure your database in `.env`.
6.  Run migrations and seeders: `php artisan migrate --seed`
7.  Start the server (handled by Laravel Herd).

**Frontend Setup:**

1.  Navigate to the `frontend` directory: `cd ../frontend`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

## Git Workflow

This project uses a professional Git branching model:

- `main`: Production-ready code.
- `dev`: Main development branch. All feature branches are merged into `dev`.
- `feature/*`: For developing new features (e.g., `feature/user-login`).

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
