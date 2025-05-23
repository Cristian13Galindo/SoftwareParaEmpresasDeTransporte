# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Auditoria(models.Model):
    id_auditoria = models.AutoField(primary_key=True)
    accion = models.CharField(max_length=100)
    tabla_afectada = models.CharField(max_length=100)
    registro_id = models.IntegerField()
    valores_anteriores = models.TextField(blank=True, null=True)
    valores_nuevos = models.TextField(blank=True, null=True)
    fecha_hora = models.DateTimeField()
    usuario = models.ForeignKey('Usuarios', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auditoria'


class AuditoriaLoginusuarios(models.Model):
    id_login = models.AutoField(primary_key=True)
    fecha_hora_login = models.DateTimeField()
    fecha_hora_logout = models.DateTimeField(blank=True, null=True)
    direccion_ip = models.CharField(max_length=39)
    navegador = models.CharField(max_length=255)
    sistema_operativo = models.CharField(max_length=100)
    exito_login = models.IntegerField()
    usuario = models.ForeignKey('Usuarios', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auditoria_loginusuarios'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Carga(models.Model):
    id_carga = models.AutoField(primary_key=True)
    descripcion = models.TextField()
    peso_toneladas = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_carga = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    precio_por_tonelada = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'carga'


class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    contacto = models.CharField(max_length=100)
    nit = models.CharField(unique=True, max_length=20)
    nombre_empresa = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'cliente'


class Conductor(models.Model):
    id_conductor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    licencia_conduccion = models.CharField(unique=True, max_length=50)
    telefono = models.CharField(max_length=20)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    apellido = models.CharField(max_length=100)
    cedula = models.CharField(unique=True, max_length=20)
    direccion = models.CharField(max_length=200)
    fecha_vencimiento_licencia = models.DateField()

    class Meta:
        managed = False
        db_table = 'conductor'


class Destinatariofinal(models.Model):
    id_destinatario = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    nombre_empresa = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'destinatariofinal'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Empresa(models.Model):
    id_empresa = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    nit = models.CharField(unique=True, max_length=50)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    correo = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'empresa'


class Estadoviaje(models.Model):
    id_estado = models.AutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    estado = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'estadoviaje'


class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    numero_factura = models.CharField(unique=True, max_length=50)
    fecha_emision = models.DateField()
    fecha_vencimiento = models.DateField()
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    iva = models.DecimalField(max_digits=12, decimal_places=2)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    estado_pago = models.CharField(max_length=50)
    observaciones = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    cliente = models.ForeignKey(Cliente, models.DO_NOTHING)
    viaje = models.ForeignKey('Viaje', models.DO_NOTHING)
    metodo_pago = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'factura'


class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    contrasena = models.CharField(max_length=255)
    rol = models.CharField(max_length=50)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'usuarios'


class Vehiculo(models.Model):
    id_vehiculo = models.AutoField(primary_key=True)
    placa = models.CharField(unique=True, max_length=15)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    capacidad_maxima_toneladas = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=50)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    id_empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='id_empresa')
    id_conductor = models.ForeignKey(Conductor, models.DO_NOTHING, db_column='id_conductor', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vehiculo'


class Viaje(models.Model):
    id_viaje = models.AutoField(primary_key=True)
    origen = models.CharField(max_length=200)
    destino = models.CharField(max_length=200)
    distancia_km = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tiempo_estimado_horas = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    costo_total = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    fecha_llegada = models.DateTimeField()
    fecha_salida = models.DateTimeField()
    id_carga = models.ForeignKey(Carga, models.DO_NOTHING, db_column='id_carga')
    id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='id_cliente')
    id_destinatario = models.ForeignKey(Destinatariofinal, models.DO_NOTHING, db_column='id_destinatario')
    id_estado = models.ForeignKey(Estadoviaje, models.DO_NOTHING, db_column='id_estado')
    id_vehiculo = models.ForeignKey(Vehiculo, models.DO_NOTHING, db_column='id_vehiculo')

    class Meta:
        managed = False
        db_table = 'viaje'
