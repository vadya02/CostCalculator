# Generated by Django 4.2 on 2023-09-11 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0013_remove_statistic_average_ownership_cost_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='requestedcar',
            name='kolichestvo_zaprosov',
            field=models.IntegerField(default=0),
        ),
    ]