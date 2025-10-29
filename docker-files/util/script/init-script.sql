DROP DATABASE IF EXISTS prueba_db;
CREATE DATABASE prueba_db;
USE prueba_db;
-- ========================================-- TABLA: USUARIOS-- ========================================
CREATE TABLE tb_usuario (
                            idUsuario INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL,
                            correo VARCHAR(100) UNIQUE NOT NULL,
                            contrasena VARCHAR(255) NOT NULL,
                            telefono VARCHAR(20),
                            enabled TINYINT DEFAULT 1);
-- ========================================-- TABLA: ROLES-- ========================================
CREATE TABLE tb_rol (
                        idRol INT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(50) NOT NULL UNIQUE);
-- ========================================-- TABLA INTERMEDIA: USUARIO-ROL-- ========================================
CREATE TABLE tb_usuario_rol (
                                idUsuario INT NOT NULL,
                                idRol INT NOT NULL,
                                PRIMARY KEY (idUsuario, idRol),
                                FOREIGN KEY (idUsuario) REFERENCES tb_usuario(idUsuario) ON DELETE CASCADE,
                                FOREIGN KEY (idRol) REFERENCES tb_rol(idRol) ON DELETE CASCADE);
-- ========================================-- TABLA: ESTADOS DE MESA-- ========================================
CREATE TABLE tb_estado_mesa (
                                idEstMesa INT AUTO_INCREMENT PRIMARY KEY,
                                descripcion VARCHAR(20) NOT NULL);
-- ========================================-- TABLA: MESAS-- ========================================
CREATE TABLE tb_mesa (
                         idMesa INT AUTO_INCREMENT PRIMARY KEY,
                         numero INT NOT NULL,
                         idEstMesa INT NOT NULL,
                         capacidad INT NOT NULL,
                         ubicacion VARCHAR(100),
                         FOREIGN KEY (idEstMesa) REFERENCES tb_estado_mesa(idEstMesa)
);
-- ========================================-- TABLA: RESERVAS-- ========================================
CREATE TABLE tb_reserva (
                            idReserva INT AUTO_INCREMENT PRIMARY KEY,
                            fecha DATE NOT NULL,
                            hora TIME NOT NULL,
                            numeroPersonas INT NOT NULL,
                            idUsuario INT NOT NULL,
                            idMesa INT NOT NULL,
                            FOREIGN KEY (idUsuario) REFERENCES tb_usuario(idUsuario),
                            FOREIGN KEY (idMesa) REFERENCES tb_mesa(idMesa)
);
-- ========================================-- TABLA: TRANSPORTES-- ========================================
CREATE TABLE tb_transporte (
                               idTransporte INT AUTO_INCREMENT PRIMARY KEY,
                               direccion VARCHAR(255),
                               numeroPasajeros INT,
                               idReserva INT,
                               FOREIGN KEY (idReserva) REFERENCES tb_reserva(idReserva)
);
-- ========================================-- TABLAS OAUTH2-- ========================================
CREATE TABLE oauth2_registered_client (
                                          id VARCHAR(100) NOT NULL,
                                          client_id VARCHAR(100) NOT NULL,
                                          client_id_issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                          client_secret VARCHAR(200) DEFAULT NULL,
                                          client_secret_expires_at TIMESTAMP DEFAULT NULL,
                                          client_name VARCHAR(200) NOT NULL,
                                          client_authentication_methods VARCHAR(1000) NOT NULL,
                                          authorization_grant_types VARCHAR(1000) NOT NULL,
                                          redirect_uris VARCHAR(1000) DEFAULT NULL,
                                          post_logout_redirect_uris VARCHAR(1000) DEFAULT NULL,
                                          scopes VARCHAR(1000) NOT NULL,
                                          client_settings VARCHAR(2000) NOT NULL,
                                          token_settings VARCHAR(2000) NOT NULL,
                                          PRIMARY KEY (id)
);
CREATE TABLE oauth2_authorization (
                                      id VARCHAR(100) NOT NULL,
                                      registered_client_id VARCHAR(100) NOT NULL,
                                      principal_name VARCHAR(200) NOT NULL,
                                      authorization_grant_type VARCHAR(100) NOT NULL,
                                      authorized_scopes VARCHAR(1000) DEFAULT NULL,
                                      attributes BLOB DEFAULT NULL,
                                      state VARCHAR(500) DEFAULT NULL,
                                      authorization_code_value BLOB DEFAULT NULL,
                                      authorization_code_issued_at TIMESTAMP DEFAULT NULL,
                                      authorization_code_expires_at TIMESTAMP DEFAULT NULL,
                                      authorization_code_metadata BLOB DEFAULT NULL,
                                      access_token_value BLOB DEFAULT NULL,
                                      access_token_issued_at TIMESTAMP DEFAULT NULL,
                                      access_token_expires_at TIMESTAMP DEFAULT NULL,
                                      access_token_metadata BLOB DEFAULT NULL,
                                      access_token_type VARCHAR(100) DEFAULT NULL,
                                      access_token_scopes VARCHAR(1000) DEFAULT NULL,
                                      oidc_id_token_value BLOB DEFAULT NULL,
                                      oidc_id_token_issued_at TIMESTAMP DEFAULT NULL,
                                      oidc_id_token_expires_at TIMESTAMP DEFAULT NULL,
                                      oidc_id_token_metadata BLOB DEFAULT NULL,
                                      refresh_token_value BLOB DEFAULT NULL,
                                      refresh_token_issued_at TIMESTAMP DEFAULT NULL,
                                      refresh_token_expires_at TIMESTAMP DEFAULT NULL,
                                      refresh_token_metadata BLOB DEFAULT NULL,
                                      user_code_value BLOB DEFAULT NULL,
                                      user_code_issued_at TIMESTAMP DEFAULT NULL,
                                      user_code_expires_at TIMESTAMP DEFAULT NULL,
                                      user_code_metadata BLOB DEFAULT NULL,
                                      device_code_value BLOB DEFAULT NULL,
                                      device_code_issued_at TIMESTAMP DEFAULT NULL,
                                      device_code_expires_at TIMESTAMP DEFAULT NULL,
                                      device_code_metadata BLOB DEFAULT NULL,
                                      PRIMARY KEY (id)
);
CREATE TABLE oauth2_authorization_consent (
                                              registered_client_id VARCHAR(100) NOT NULL,
                                              principal_name VARCHAR(200) NOT NULL,
                                              authorities VARCHAR(1000) NOT NULL,
                                              PRIMARY KEY (registered_client_id, principal_name)
);
-- ========================================-- DATOS INICIALES: ROLES-- ========================================
INSERT INTO tb_rol (nombre) VALUES
                                ('ADMIN'),
                                ('CLIENTE'),
                                ('GERENTE'),
                                ('EMPLEADO');
-- ========================================-- DATOS INICIALES: ESTADOS DE MESA-- ========================================
INSERT INTO tb_estado_mesa (descripcion) VALUES
                                             ('DISPONIBLE'),
                                             ('OCUPADA'),
                                             ('RESERVADA'),
                                             ('MANTENIMIENTO');
-- ========================================-- DATOS INICIALES: USUARIOS-- ========================================-- Admin (password: admin123)
INSERT INTO tb_usuario (nombre, correo, contrasena, telefono, enabled) VALUES('Administrador', 'admin@restaurante.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '999888777', 1);
-- Cliente (password: cliente123)
INSERT INTO tb_usuario (nombre, correo, contrasena, telefono, enabled) VALUES('Juan Pérez', 'juan@correo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '987654321', 1);
-- ========================================-- ASIGNAR ROLES A USUARIOS-- ========================================-- Admin tiene rol

INSERT INTO tb_usuario_rol (idUsuario, idRol) VALUES (1, 1);
-- Cliente tiene rol

INSERT INTO tb_usuario_rol (idUsuario, idRol) VALUES (2, 2);
-- ========================================-- MESAS DE PRUEBA-- ========================================
INSERT INTO tb_mesa (numero, idEstMesa, capacidad, ubicacion) VALUES(1, 1, 4, 'Terraza'),
                                                                    (2, 1, 2, 'Interior'),
                                                                    (3, 1, 6, 'Salón Principal'),
                                                                    (4, 1, 4, 'Ventana'),
                                                                    (5, 4, 8, 'Salón VIP');

CREATE USER 'appuser'@'%' IDENTIFIED BY 'app_pass';
GRANT ALL PRIVILEGES ON newrestaurante_db.* TO 'appuser'@'%';
FLUSH PRIVILEGES;