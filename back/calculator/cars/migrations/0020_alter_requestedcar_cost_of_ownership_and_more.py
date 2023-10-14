# Generated by Django 4.2 on 2023-09-15 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0019_alter_requestedcar_cost_of_fuel_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestedcar',
            name='cost_of_ownership',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='requestedcar',
            name='modification_capacity',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='requestedcar',
            name='modification_power',
            field=models.FloatField(default=0),
        ),
    ]
