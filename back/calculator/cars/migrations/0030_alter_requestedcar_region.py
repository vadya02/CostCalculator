# Generated by Django 4.2 on 2023-10-04 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0029_alter_requestedcar_modification_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestedcar',
            name='region',
            field=models.IntegerField(default=0),
        ),
    ]
