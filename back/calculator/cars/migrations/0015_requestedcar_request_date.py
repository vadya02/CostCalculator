# Generated by Django 4.2 on 2023-09-13 07:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0014_requestedcar_kolichestvo_zaprosov'),
    ]

    operations = [
        migrations.AddField(
            model_name='requestedcar',
            name='request_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]