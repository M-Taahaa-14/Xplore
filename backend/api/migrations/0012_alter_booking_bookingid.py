# Generated by Django 5.1.3 on 2024-11-16 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_booking_tour'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='BookingId',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
