CREATE DATABASE IF NOT EXISTS `newrestaurante_db`;
USE `newrestaurante_db`;

-- select * from tb_estado_mesa;
-- select * from tb_mesa;
-- select * from tb_reserva;
-- select * from tb_usuario;
-- select * from tb_mesa;
-- select * from tb_transporte;

CREATE TABLE `tb_usuario` (
                            idUsuario INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL,
                            correo VARCHAR(100) UNIQUE NOT NULL,
                            contrasena VARCHAR(255) NOT NULL,
                            telefono VARCHAR(20),
                            enabled TINYINT DEFAULT 1
);

CREATE TABLE  `tb_rol` (
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
                         numero INT NOT NULL,
                         idEstMesa INT NOT NULL,
                         capacidad INT NOT NULL,
                         ubicacion VARCHAR(100),
                         FOREIGN KEY (idEstMesa) REFERENCES tb_estado_mesa(idEstMesa)
);

CREATE TABLE `tb_reserva` (
                            idReserva INT AUTO_INCREMENT PRIMARY KEY,
                            fecha DATE NOT NULL,
                            hora TIME NOT NULL,
                            numeroPersonas INT NOT NULL,
                            idUsuario INT NOT NULL,
                            idMesa INT NOT NULL,
                            FOREIGN KEY (idUsuario) REFERENCES tb_usuario(idUsuario),
                            FOREIGN KEY (idMesa) REFERENCES tb_mesa(idMesa)
);

CREATE TABLE `tb_transporte` (
                               idTransporte INT AUTO_INCREMENT PRIMARY KEY,
                               direccion VARCHAR(255),
                               numeroPasajeros INT,
                               idReserva INT,
                               FOREIGN KEY (idReserva) REFERENCES tb_reserva(idReserva)
);


INSERT INTO `tb_rol` (nombre) VALUES
                                ('ADMIN'),
                                ('CLIENTE'),
                                ('EMPLEADO');

INSERT INTO `tb_estado_mesa` (descripcion)
VALUES ('Libre'), ('Ocupada');

-- Luego inserta algunas mesas
INSERT INTO `tb_mesa` (numero, idEstMesa, capacidad, ubicacion)
VALUES
    (1, 1, 4, 'Zona Terraza'),
    (2, 1, 2, 'Zona Interior'),
    (3, 1, 6, 'Zona VIP');

LOCK TABLES `tb_usuario_rol` WRITE;
UNLOCK TABLES;

CREATE USER 'appuser'@'%' IDENTIFIED BY 'app_pass';
GRANT ALL PRIVILEGES ON newrestaurante_db.* TO 'appuser'@'%';
FLUSH PRIVILEGES;