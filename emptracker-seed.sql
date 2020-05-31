--department
UPDATE `emptracker_db`.`department` SET `name` = 'Executive' WHERE (`id` = '1');
UPDATE `emptracker_db`.`department` SET `name` = 'IT' WHERE (`id` = '2');
UPDATE `emptracker_db`.`department` SET `name` = 'HR' WHERE (`id` = '3');
UPDATE `emptracker_db`.`department` SET `id` = '4', `name` = 'Legal' WHERE (`id` = '4');
INSERT INTO `emptracker_db`.`department` (`id`, `name`) VALUES ('5', 'Marketing');

--role
UPDATE `emptracker_db`.`role` SET `title` = 'CEO' WHERE (`id` = '1');
UPDATE `emptracker_db`.`role` SET `id` = '2', `title` = 'Manager', `salary` = '75000', `department_id` = '1' WHERE (`id` = '4');
INSERT INTO `emptracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('3', 'Developer', '100000', '2');
INSERT INTO `emptracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('4', 'HR', '60000', '3');
INSERT INTO `emptracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('5', 'Attoney', '100000', '4');
INSERT INTO `emptracker_db`.`role` (`id`, `title`, `salary`, `department_id`) VALUES ('6', 'HOM', '75000', '5');

--Employee
--seed exists from test--

