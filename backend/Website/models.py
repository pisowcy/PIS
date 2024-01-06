# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Actor(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    country = models.ForeignKey('Country', models.DO_NOTHING, db_column='country', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'actor'


class ActorProduction(models.Model):
    actor = models.ForeignKey(Actor, models.DO_NOTHING, blank=True, null=True)
    production = models.ForeignKey('Production', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'actor_production'
        unique_together = (('actor', 'production'),)


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
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
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


class Country(models.Model):
    name = models.CharField(primary_key=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'country'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
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


class FavoritesUserProduction(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    production = models.ForeignKey('Production', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'favorites_user_production'
        unique_together = (('user', 'production'),)


class Genre(models.Model):
    name = models.CharField(primary_key=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'genre'


class Production(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    premiere_date = models.DateField(blank=True, null=True)
    country = models.ForeignKey(Country, models.DO_NOTHING, db_column='country', blank=True, null=True)
    genre = models.ForeignKey(Genre, models.DO_NOTHING, db_column='genre', blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)
    seasons_count = models.IntegerField(blank=True, null=True)
    episodes_count = models.IntegerField(blank=True, null=True)
    trailer_url = models.CharField(max_length=255, blank=True, null=True)
    poster_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'production'


class Review(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    production = models.ForeignKey(Production, models.DO_NOTHING, blank=True, null=True)
    review = models.IntegerField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'


class ToWatch(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    production = models.ForeignKey(Production, models.DO_NOTHING, blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'to_watch'
        unique_together = (('user', 'production'),)


class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(unique=True, max_length=255)
    password_hash = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'user'
