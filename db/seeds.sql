INSERT INTO department(dept_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Human Resources"),
       ("Sales"),
       ("IT");

INSERT INTO role(title, salary, department_id)
VALUES ("Senior Engineer", 100000, 1),
       ("Junior Engineer", 70000, 1),
       ("Accounting Manager", 100000, 2),
       ("Accountant", 70000, 2),
       ("HR Manager", 80000, 3),
       ("HR Specialist", 50000, 3),
       ("Sales Manager", 100000, 4),
       ("Salesperson", 70000, 4),
       ("IT Manager", 80000, 5),
       ("IT Specialist", 50000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Elaine", "Walters", 1, NULL),
       ("Rafael", "Allison", 2, 1),
       ("Jeffery", "Fisher", 3, NULL),
       ("Mabel", "Anderson", 4, 3),
       ("Chris", "Bates", 5, NULL),
       ("Evelyn", "Nichols", 6, 5),
       ("Matthew", "Fernandez", 7, NULL),
       ("Bethany", "Schwartz", 8, 7),
       ("Garrett", "Kim", 9, NULL),
       ("Brittany", "Roberts", 10, 9);