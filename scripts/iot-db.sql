# Mode Contrainte Projet

CREATE DATABASE iot;

USE iot;

CREATE TABLE user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    CONSTRAINT user_pk PRIMARY KEY (id)
) DEFAULT charset=utf8;

CREATE TABLE device (
    mac_address VARCHAR(30) NOT NULL,
    user_id INT NULL,
    CONSTRAINT device_pk PRIMARY KEY (mac_address),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES user(id)
) DEFAULT charset=utf8;

CREATE TABLE metric (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    metric_date DATETIME NOT NULL,
    metric_value FLOAT NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    mac_address VARCHAR(30) NOT NULL,
    CONSTRAINT metric_pk PRIMARY KEY (id),
    CONSTRAINT device_fk FOREIGN KEY (mac_address) REFERENCES device(mac_address)
) DEFAULT charset=utf8;
