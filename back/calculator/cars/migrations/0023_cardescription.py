# Generated by Django 4.2 on 2023-09-25 11:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0022_rename_sum_nalog_requestedcar_sum_of_nalog'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Min_year_of_production', models.IntegerField(default=0)),
                ('Max_year_of_production', models.IntegerField(default=0)),
                ('privod', models.CharField(default='', max_length=255)),
                ('tip_kuzova', models.CharField(default='', max_length=255)),
                ('toplivo', models.CharField(default='', max_length=255)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='car_images/')),
                ('model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cars.model')),
            ],
        ),
    ]