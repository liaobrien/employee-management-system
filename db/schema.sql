DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
      id INT AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL,
      PRIMARY KEY (id)
);


DROP TABLE IF EXISTS role;
CREATE TABLE role (
      id INT AUTO_INCREMENT,
      title VARCHAR(30) NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INT,
      PRIMARY KEY (id),
      FOREIGN KEY (department_id)
      REFERENCES department(id)
      ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
      id INT AUTO_INCREMENT,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      role_id INT,
      manager_id INT DEFAULT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (manager_id)
      REFERENCES employee(id),
      FOREIGN KEY (role_id)
      REFERENCES role(id)
      ON DELETE SET NULL
);