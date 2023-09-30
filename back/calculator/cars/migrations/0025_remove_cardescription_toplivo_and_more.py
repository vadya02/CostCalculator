# Generated by Django 4.2 on 2023-09-25 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0024_alter_cardescription_privod'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cardescription',
            name='toplivo',
        ),
        migrations.AlterField(
            model_name='cardescription',
            name='privod',
            field=models.CharField(choices=[('option1', 'Полный'), ('option2', 'Передний'), ('option3', 'Задний')], default=1),
        ),
        migrations.AlterField(
            model_name='cardescription',
            name='tip_kuzova',
            field=models.CharField(choices=[('option1', 'Седан'), ('option2', 'Внедорожник'), ('option3', 'Кроссовер')], default=1),
        ),
    ]