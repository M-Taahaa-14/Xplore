# Generated by Django 5.1.3 on 2024-11-27 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0040_alter_wishlist_unique_together'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='BookingDate',
            new_name='booking_date',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='BookingId',
            new_name='booking_id',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='Departure',
            new_name='departure',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='DestinationId',
            new_name='destination_id',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='Price',
            new_name='price',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='Status',
            new_name='status',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='Tickets',
            new_name='tickets',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='TravelDate',
            new_name='travel_date',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Days',
            new_name='days',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='DestinationId',
            new_name='destination_id',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='EndDate',
            new_name='end_date',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='GoogleMapsLink',
            new_name='google_maps_link',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Image',
            new_name='image',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Latitude',
            new_name='latitude',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Location',
            new_name='location',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Longitude',
            new_name='longitude',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='MaxTravellers',
            new_name='max_travelers',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Nights',
            new_name='nights',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Price',
            new_name='price',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='Region',
            new_name='region',
        ),
        migrations.RenameField(
            model_name='destination',
            old_name='StartDate',
            new_name='start_date',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='Days',
            new_name='days',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='Destination',
            new_name='destination',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='EndDate',
            new_name='end_date',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='MaxTravellers',
            new_name='max_travelers',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='Nights',
            new_name='nights',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='Price',
            new_name='price',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='StartDate',
            new_name='start_date',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='TourId',
            new_name='tour_id',
        ),
        migrations.RenameField(
            model_name='tour',
            old_name='TourName',
            new_name='tour_name',
        ),
        migrations.RenameField(
            model_name='wishlist',
            old_name='des',
            new_name='destination_id',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='UserEmail',
        ),
        migrations.AlterUniqueTogether(
            name='wishlist',
            unique_together={('user_email', 'destination_id')},
        ),
        migrations.AddField(
            model_name='booking',
            name='user_email',
            field=models.EmailField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wishlist',
            name='user_email',
            field=models.EmailField(default='example@example.com', max_length=1000),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='wishlist',
            name='user',
        ),
    ]
