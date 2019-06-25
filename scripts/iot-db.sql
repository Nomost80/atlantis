CREATE DATABASE iot;

USE iot;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    CONSTRAINT user_pk PRIMARY KEY (id)
) DEFAULT charset=utf8;

CREATE TABLE device (
    mac_address VARCHAR(30) NOT NULL,
    user_id INT NULL,
    CONSTRAINT device_pk PRIMARY KEY (mac_address),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES user(id)
) DEFAULT charset=utf8;

CREATE TABLE sensor (
    name VARCHAR(50) NOT NULL,
    pin INT NOT NULL,
    type VARCHAR(25) NOT NULL,
    device_mac_address VARCHAR(30) NOT NULL,
    CONSTRAINT sensor_pk PRIMARY KEY (name),
    CONSTRAINT device_fk FOREIGN KEY (device_mac_address) REFERENCES device(mac_address)
) DEFAULT charset=utf8;

CREATE TABLE metric (
    id INTEGER NOT NULL AUTO_INCREMENT,
    date DATETIME NOT NULL,
    value FLOAT NOT NULL,
    sensor_name VARCHAR(50) NOT NULL,
    CONSTRAINT metric_pk PRIMARY KEY (id),
    CONSTRAINT sensor_fk FOREIGN KEY (sensor_name) REFERENCES sensor(name)
) DEFAULT charset=utf8;


