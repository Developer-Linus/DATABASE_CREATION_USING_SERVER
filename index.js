// Import the necessary packages or modules
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Test database connection
db.connect((err)=>{
    if(err) throw err;
    console.log('Database successfully connected!');
});

// Create a database
db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err, result)=>{
    if(err) throw err;
    console.log("Database successfully created or exists.");
});

// SELECT the created database
db.query(`USE ${process.env.DB_NAME}`, (err)=>{
    if(err) throw err;
    console.log('Database successfully selected.');
});

// Create tables
// Create patients table
const createPatientsTable = `CREATE TABLE IF NOT EXISTS patients(
patient_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(150) NOT NULL,
last_name VARCHAR(150) NOT NULL,
email VARCHAR(200) UNIQUE NOT NULL,
password_hash VARCHAR(250) NOT NULL,
phone VARCHAR(100) NOT NULL,
date_of_birth DATE NOT NULL,
gender ENUM('Male', 'Female', 'Other'),
address TEXT
)`

db.query(createPatientsTable, (err)=>{
    if(err) throw err;
    console.log('Patients table created successfully or exists.');
});

// create the doctors table
const createDoctorsTable = `CREATE TABLE IF NOT EXISTS doctors(
doctor_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(150) NOT NULL,
last_name VARCHAR(150) NOT NULL,
specialization VARCHAR(150) NOT NULL,
email VARCHAR(250) UNIQUE NOT NULL,
phone VARCHAR(150) NOT NULL,
schedule TEXT NOT NULL
)`
db.query(createDoctorsTable, (err)=>{
    if(err) throw err;
    console.log('Doctors table created successfully or exists.');
});

// create appointmnets table
const createAppointmentsTable = `CREATE TABLE IF NOT EXISTS appointments(
appointment_id INT AUTO_INCREMENT PRIMARY KEY,
patient_id INT,
doctor_id INT,
appointment_date DATE NOT NULL,
appointment_time TIME NOT NULL,
status ENUM('scheduled', 'completed', 'canceled'),
FOREIGN KEY(patient_id) REFERENCES patients(patient_id),
FOREIGN KEY(doctor_id) REFERENCES doctors(doctor_id)
)`
db.query(createAppointmentsTable, (err)=>{
    if(err) throw err;
    console.log('Appointments table successfully created or exists.');
});

// Admin table
const createAdminTable = `CREATE TABLE IF NOT EXISTS admin(
admin_id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(150) NOT NULL,
password_hash VARCHAR(150) NOT NULL,
role ENUM('admin', 'superadmin')
)`;
db.query(createAdminTable, (err)=>{
    if(err) throw err;
    console.log('Admin table successfully created or exists.');
});

// Populating Tables with sample data
// populating patients
const samplePatients = `INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES 
('John', 'Doe', 'john.doe@example.com', 'hashed_password_1', '123-456-7890', '1980-05-14', 'Male', '123 Main St, Townsville'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_2', '555-555-5555', '1992-09-22', 'Female', '456 Maple Ave, Citytown'),
('Sam', 'Taylor', 'sam.taylor@example.com', 'hashed_password_3', '987-654-3210', '1988-12-01', 'Other', '789 Oak Blvd, Villagetown');
`;
db.query(samplePatients, (err)=>{
    if(err) throw err;
    console.log('Sample patients data created.')
});

// populating doctors
const sampleDoctors = `INSERT INTO doctors(first_name, last_name, specialization, email, phone, schedule) VALUES 
('Alice', 'Johnson', 'Cardiologist', 'alice.johnson@example.com', '321-654-9870', 'Mon-Fri, 9 AM - 5 PM'),
('Bob', 'Williams', 'Dermatologist', 'bob.williams@example.com', '111-222-3333', 'Tue-Thu, 10 AM - 4 PM'),
('Clara', 'Brown', 'Neurologist', 'clara.brown@example.com', '444-555-6666', 'Mon-Wed, 8 AM - 2 PM')`;
db.query(sampleDoctors, (err)=>{
    if(err) throw err;
    console.log('doctors sample data loaded successfully.');
});

// populate appointments
const sampleAppointments = `INSERT INTO appointments(patient_id, doctor_id, appointment_date, appointment_time, status) VALUES 
(1, 1, '2023-11-15', '10:00:00', 'scheduled'),
(2, 2, '2023-11-16', '14:30:00', 'completed'),
(3, 3, '2023-11-17', '09:00:00', 'canceled')`;
db.query(sampleAppointments, (err)=>{
    if(err) throw err;
    console.log('Appointments sample data created.');
});

// populate admin table
const sampleAdmin = `INSERT INTO admin (username, password_hash, role) VALUES 
('admin1', 'admin_password_hash_1', 'admin'),
('admin2', 'admin_password_hash_2', 'superadmin'),
('admin3', 'admin_password_hash_3', 'admin')
`;
db.query(sampleAdmin, (err)=>{
    if(err) throw err;
    console.log('Sample admin data created.');
});

// End the connection
db.end((err)=>{
    if(err) throw err;
    console.log('Session successfully ended.');
});