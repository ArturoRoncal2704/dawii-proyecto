DROP DATABASE IF EXISTS `newrestaurante_db`;
CREATE DATABASE `newrestaurante_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `newrestaurante_db`;


CREATE TABLE `tb_usuario` (
                            idUsuario INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL,
                            correo VARCHAR(100) UNIQUE NOT NULL,
                            contrasena VARCHAR(255) NOT NULL,
                            telefono VARCHAR(20),
                            enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE `tb_rol` (
                        idRol INT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE `tb_usuario_rol` (
                                idUsuario INT NOT NULL,
                                idRol INT NOT NULL,
                                PRIMARY KEY (idUsuario, idRol),
                                FOREIGN KEY (idUsuario) REFERENCES tb_usuario(idUsuario) ON DELETE CASCADE,
                                FOREIGN KEY (idRol) REFERENCES tb_rol(idRol) ON DELETE CASCADE
);


CREATE TABLE `tb_estado_mesa` (
                                idEstMesa INT AUTO_INCREMENT PRIMARY KEY,
                                descripcion VARCHAR(20) NOT NULL
);


CREATE TABLE `tb_mesa` (
                         idMesa INT AUTO_INCREMENT PRIMARY KEY,
                         numero INT NOT NULL UNIQUE,
                         idEstMesa INT NOT NULL,
                         capacidad INT NOT NULL CHECK (capacidad > 0),
                         ubicacion VARCHAR(100),
                         FOREIGN KEY (idEstMesa) REFERENCES tb_estado_mesa(idEstMesa)
);


CREATE TABLE `tb_reserva` (
                            idReserva INT AUTO_INCREMENT PRIMARY KEY,
                            fecha DATE NOT NULL,
                            hora TIME NOT NULL,
                            numeroPersonas INT NOT NULL CHECK (numeroPersonas > 0),
                            idUsuario INT NOT NULL,
                            idMesa INT NOT NULL,
                            FOREIGN KEY (idUsuario) REFERENCES tb_usuario(idUsuario) ON DELETE CASCADE,
                            FOREIGN KEY (idMesa) REFERENCES tb_mesa(idMesa) ON DELETE RESTRICT
);


CREATE TABLE `tb_transporte` (
                               idTransporte INT AUTO_INCREMENT PRIMARY KEY,
                               direccion VARCHAR(255) NOT NULL,
                               numeroPasajeros INT NOT NULL CHECK (numeroPasajeros > 0),
                               idReserva INT NOT NULL UNIQUE, -- cada reserva tiene un solo transporte
                               FOREIGN KEY (idReserva) REFERENCES tb_reserva(idReserva) ON DELETE CASCADE
);


-- Roles base
INSERT INTO `tb_rol` (nombre) VALUES
                                ('ADMIN'),
                                ('CLIENTE'),
                                ('EMPLEADO');

-- Estado de las mesas
INSERT INTO `tb_estado_mesa` (descripcion)
VALUES ('Libre'), ('Ocupada');

-- Mesas disponibles iniciales
INSERT INTO `tb_mesa` (numero, idEstMesa, capacidad, ubicacion)
VALUES
    (1, 1, 4, 'Zona Terraza'),
    (2, 1, 2, 'Zona Interior'),
    (3, 1, 6, 'Zona VIP'),
    (4, 1, 4, 'Zona Bar'),
    (5, 1, 8, 'Zona Familiar'),
    (6, 1, 2, 'Zona Parejas');

LOCK TABLES `tb_usuario_rol` WRITE;
UNLOCK TABLES;

CREATE USER 'appuser'@'%' IDENTIFIED BY 'app_pass';
GRANT ALL PRIVILEGES ON newrestaurante_db.* TO 'appuser'@'%';
FLUSH PRIVILEGES;