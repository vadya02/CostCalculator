# Generated by Django 4.2 on 2023-08-14 13:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0009_remove_requestedcar_modification_requestedcar_power'),
    ]

    operations = [
        migrations.RenameField(
            model_name='requestedcar',
            old_name='power',
            new_name='modification',
        ),
    ]
