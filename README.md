# Software-Para-Empresas-De-Transporte

[![Python](https://img.shields.io/badge/Python-3.9-blue)](#)
[![Django](https://img.shields.io/badge/Django-4.2-green)](#)
[![Angular](https://img.shields.io/badge/Angular-15-red)](#)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](#)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue)](#)
[![Node.js](https://img.shields.io/badge/Node.js-16-green)](#)
[![UPTC](https://img.shields.io/badge/UPTC-Bases%20de%20Datos%20II-red)](#)
[![VSCode](https://img.shields.io/badge/VS%20Code-2024-blue)](#)

Sistema de gestión integral para empresas de transporte que permite administrar vehiculos, conductores, viajes, cargas y facturación, desarrollado para la asignatura de Bases de Datos II de Ingeniería de Sistemas y Computación de la [UPTC](http://www.uptc.edu.co).

## Tecnologías Utilizadas

- **Backend:**
   - Python 3.9
   - Django 4.2 Framework
   - Django REST Framework
   - MySQL 8.0
   - Docker & Docker Compose

- **Frontend:**
   - Angular 15
   - TypeScript
   - Node.js 16
   - HTML5 & CSS3
   - Bootstrap

## Características

- Sistema completo de gestión de transporte:
   - Gestión de empresas transportadoras
   - Administración de usuarios y roles
   - Control de vehículos y conductores
   - Planificación de viajes y rutas
   - Gestión de cargas y destinatarios
   - Sistema de facturación
   - Auditoría y seguimiento de operaciones
- Arquitectura limpia con separation de responsabilidades
- API RESTful para comunicación frontend-backend
- Base de datos robusta con integridad referencial
- Contenedores Docker para fácil despliegue

## Desarrolladores

- Camilo Galindo
- Sebastian Pérez

## Instrucciones de Instalación

### Requisitos Previos
- Docker Desktop
- Git

### Pasos de Instalación

1. Clone el repositorio:
```bash
git clone https://github.com/Cristian13Galindo/SoftwareParaEmpresasDeTransporte.git
```

2. Construya y levante los contenedores:
```bash
docker-compose build --no-cache
docker-compose up -d
```

3. Ejecute las migraciones de la base de datos:
```bash
docker-compose exec backend bash
python manage.py migrate
python manage.py createsuperuser
```

4. Acceda a la aplicación:

-     Backend/API: http://localhost:8000
-     Frontend: http://localhost:4200
-     Admin Panel: http://localhost:8000/admin

## Estructutura del Proyecto

```bash
SoftwareParaEmpresasDeTransporte/
│
├── backend/
│   ├── apps/
│   │   ├── usuarios/
│   │   ├── empresa/
│   │   ├── vehiculo/
│   │   ├── conductor/
│   │   ├── viaje/
│   │   ├── carga/
│   │   ├── factura/
│   │   ├── auditoria/
│   │   ├── estadoviaje/
│   │   ├── destinatariofinal/
│   │   ├── cliente/
│   │   └── auditoria_loginusuarios/
│   ├── transporte/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```