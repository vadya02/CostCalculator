# Generated by Django 4.2 on 2023-08-12 09:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0005_alter_customuser_options_alter_customuser_managers_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]