# Generated by Django 4.2 on 2023-10-04 06:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0027_cardescription_name_of_car_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestedcar',
            name='modification_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cars.modification'),
        ),
    ]
