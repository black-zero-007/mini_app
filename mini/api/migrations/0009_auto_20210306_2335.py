# Generated by Django 3.1.4 on 2021-03-06 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210306_2312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='avatar',
            field=models.CharField(max_length=256, null=True, verbose_name='头像'),
        ),
    ]