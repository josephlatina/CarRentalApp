

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_customer_unit_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='unit_number',
            field=models.CharField(blank=True, max_length=5),
        ),
        migrations.AlterField(
            model_name='car',
            name='status',

        ),
        migrations.AlterField(
            model_name='employee',
            name='unit_number',
            field=models.CharField(blank=True, max_length=5),
        ),
        migrations.AlterField(
            model_name='rental',
            name='came_from',
            field=models.ForeignKey(default='', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_came_from', to='api.branch'),
        ),
        migrations.AlterField(
            model_name='rental',
            name='goes_to',
            field=models.ForeignKey(default='', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_goes_to', to='api.branch'),
        ),
    ]
