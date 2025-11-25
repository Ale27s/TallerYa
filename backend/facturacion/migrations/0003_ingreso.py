from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('facturacion', '0002_factura_metodo_pago'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingreso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(default=django.utils.timezone.localdate)),
                ('cliente', models.CharField(blank=True, max_length=100)),
                ('contacto', models.CharField(blank=True, max_length=80)),
                ('vehiculo', models.CharField(blank=True, max_length=120)),
                ('placa', models.CharField(max_length=10)),
                ('trabajo', models.TextField()),
                ('costo', models.DecimalField(decimal_places=2, max_digits=12)),
                ('estado', models.CharField(choices=[('COBRADO', 'Cobrado'), ('PENDIENTE', 'Pendiente'), ('SENIADO', 'Señado')], default='COBRADO', max_length=10)),
                ('notas', models.TextField(blank=True)),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-fecha', '-creado_en'],
            },
        ),
    ]
