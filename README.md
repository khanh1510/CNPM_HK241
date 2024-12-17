# HCMUT_SSPS - Smart Printing Service for Students

## Description
**HCMUT_SSPS** is a smart printing service system designed for students at **Ho Chi Minh University of Technology (HCMUT)**. The system enables students to print their documents conveniently across campus printers. It also includes features for managing quotas, purchasing additional pages, and monitoring printing history. Administrators (SPSO) can manage printers, configure settings, and generate reports. 

The project is available as a **web-based application** and can be extended to support **mobile applications**.

---

## Features

### Student Features
- Upload documents for printing.
- Select printing preferences:
  - Paper size (A4/A3).
  - Pages to print.
  - One-sided or double-sided printing.
  - Number of copies.
- View and filter personal **printing history** by date range.
- Purchase additional printing pages via **BKPay payment gateway**.
- Authentication via **HCMUT_SSO**.
- Printing page quota management:
  - Default A4 page quota each semester.
  - One A3 page equals two A4 pages.

### SPSO Features
- Manage campus printers:
  - Add new printers.
  - Enable/disable printers.
  - Update printer details (ID, brand, model, description, and location).
- Configure system settings:
  - Default printing quotas for students.
  - Permitted file types for printing.
  - Semester quota reset dates.
- View detailed printing logs:
  - Filter logs by student, printer, and time period.
  - Monitor number of pages printed per page size.
- Generate and view **monthly/yearly reports** on system usage.

### System Features
- Log and track all printing actions:
  - Student ID, printer ID, file name.
  - Printing start and end times.
  - Number of pages for each page size.
- Support for both **web browsers** and **mobile devices**.

---

## Technologies Used

### Backend
- **Node.js** with Nest.ts for server-side development.
- **MySQL** for storing data.
- Integration with **BKPay API** for payment processing.
- Authentication using **HCMUT_SSO**.

### Frontend
- **React.js** for building the user interface.
- **TailwindCSS** or other CSS frameworks for styling.

### Database
- **MySQL** for managing student, printer, and log data.

---

## Installation and Setup

### Prerequisites
Ensure you have the following tools installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Docker** (for MySQL setup)
- **Git**

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/khanh1510/CNPM_HK241.git
   cd CNPM_HK241
   ```

2. **Install Dependencies**
   Navigate to both `backend` and `frontend` folders to install required dependencies.

   - Install Backend:
     ```bash
     cd ./backend
     npm install
     ```
   - Install Frontend:
     ```bash
     cd ./frontend
     npm install
     ```

3. **Configure Environment Variables**
   Create a `.env` file in both `backend` and `frontend` folders with the necessary configurations. Below is an example structure:

   - Backend `.env` file (`backend/.env`):
     ```env
     MYSQLDB_ROOT_PASSWORD=<your_root_password>
     MYSQLDB_USER=<your_username>
     MYSQLDB_PASSWORD=<your_password>
     MYSQLDB_DATABASE=<your_database_name>
     MYSQLDB_LOCAL_PORT=<your_local_port>
     MYSQLDB_DOCKER_PORT=3306

     DATABASE_URL="mysql://<your_username>:<your_password>@localhost:<your_local_port>/<your_database_name>?schema=public"

     JWT_SECRET=<your_jwt_secret>
     ACCESS_TOKEN_EXPIRED=30m
     PORT=5000
     ```
   
   - Frontend `.env` file (`frontend/.env`):
     ```env
     REACT_APP_API_URL=http://localhost:5000
     PORT=5173
     ```

4. **Start MySQL with Docker**
   Run the following command to set up MySQL in a Docker container:
   ```bash
   docker run --name mysql-ssps -p 33061:3306 -e MYSQL_ROOT_PASSWORD=<your_root_password> \
   -e MYSQL_USER=<your_username> -e MYSQL_PASSWORD=<your_password> -e MYSQL_DATABASE=<your_database_name> -d mysql:latest
   ```

5. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Directory Structure
```
HCMUT_SSPS/
│
├── backend/                 # Backend server
│   ├── data/                # Directory for uploaded files
│   ├── db/                  # MySQL data models
│   ├── helpers/             # Utility functions for file management
│   ├── prisma/              # Prisma configuration and migrations
│   ├── src/                 # Source code for backend APIs
│   ├── test/                # Backend test cases
│   ├── .env                 # Backend environment variables
│   └── Dockerfile           # Docker configuration for backend
│
├── frontend/                # Frontend React application
│   ├── public/              # Public assets
│   ├── src/                 # Source code for frontend
│   ├── .env                 # Frontend environment variables
│
└── README.md                # Project documentation
```

---

## API Documentation
The backend exposes a RESTful API for interacting with the system. Below are the key endpoints categorized by functionality:

### Authentication
| Endpoint                         | Method | Description                          |
|----------------------------------|--------|--------------------------------------|
| `/api/auth/login`                | POST   | Authenticate user via HCMUT_SSO      |

### Student Endpoints
| Endpoint                         | Method | Description                          |
|----------------------------------|--------|--------------------------------------|
| `/api/students/info`             | GET    | Retrieve personal information        |
| `/api/students/pre-payment`      | GET    | Fetch the cost of printing paper     |
| `/api/students/buy-paper/:id`    | POST   | Purchase additional printing pages   |

### SPSO (Admin) Endpoints
| Endpoint                         | Method | Description                          |
|----------------------------------|--------|--------------------------------------|
| `/api/sps/info`                  | GET    | Retrieve SPSO personal information   |
| `/api/sps/update-settings`       | PUT    | Update system settings               |
| `/api/sps/latest-file-types`     | GET    | Fetch the latest saved file types    |

### Printer Management
| Endpoint                         | Method | Description                          |
|----------------------------------|--------|--------------------------------------|
| `/api/printer/all-printer`       | GET    | Retrieve all printer details         |
| `/api/printer/create-printer`    | POST   | Add a new printer                    |
| `/api/printer/edit-printer`      | PUT    | Update printer information           |

### Printing Actions
| Endpoint                         | Method | Description                          |
|----------------------------------|--------|--------------------------------------|
| `/api/printing/pre-printing`     | GET    | Fetch file types before printing     |
| `/api/printing/print`            | POST   | Execute printing operation           |
| `/api/printing/all-printings`    | GET    | Retrieve printing transaction history|
| `/api/printing/status`           | PUT    | Update the printing status           |


## Future Enhancements
- Develop a **mobile application** using React Native.
- Add support for printing file previews.
- Implement real-time status updates for printer availability.
- Enhance reporting with data visualization.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/fix.
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push the branch.
   ```bash
   git commit -m "Add your description"
   git push origin feature-name
   ```
4. Submit a pull request.

---

## Contributors
This project is developed by a group of Computer Science students from Ho Chi Minh University of Technology (HCMUT). Our members of the team:
* Hoàng Văn Long        2211876 
* Trần Quốc Khánh       2211536 
* Nguyễn Thanh Tân      2213061 
* Trịnh Thị Anh Thư     2213412 
* Phạm Thị Tố Như       2212478 
* Phạm Quốc Toàn        2213539 
