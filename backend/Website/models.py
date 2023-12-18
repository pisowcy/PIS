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
    actor = models.OneToOneField(Actor, models.DO_NOTHING, primary_key=True)  # The composite primary key (actor_id, production_id) found, that is not supported. The first column is selected.
    production = models.ForeignKey('Production', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'actor_production'
        unique_together = (('actor', 'production'),)


class Country(models.Model):
    name = models.CharField(primary_key=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'country'


class FavoritesUserProduction(models.Model):
    user = models.OneToOneField('User', models.DO_NOTHING, primary_key=True)  # The composite primary key (user_id, production_id) found, that is not supported. The first column is selected.
    production = models.ForeignKey('Production', models.DO_NOTHING)

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
    user = models.OneToOneField('User', models.DO_NOTHING, primary_key=True)  # The composite primary key (user_id, production_id) found, that is not supported. The first column is selected.
    production = models.ForeignKey(Production, models.DO_NOTHING)
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
