# Generated by Django 4.2 on 2023-08-11 07:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0002_tax'),
    ]

    operations = [
        migrations.AlterField(
            model_name='model',
            name='Nazvanie_marki',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cars.brand'),
        ),
    ]
