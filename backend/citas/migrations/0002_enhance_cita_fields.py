# Generated manually due to offline environment
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("vehiculos", "0001_initial"),
        ("citas", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="cita",
            name="cliente_nombre",
            field=models.CharField(default="", max_length=120),
        ),
        migrations.AddField(
            model_name="cita",
            name="vehiculo",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="citas",
                to="vehiculos.vehiculo",
            ),
        ),
        migrations.AddField(
            model_name="cita",
            name="gravedad",
            field=models.CharField(
                choices=[("LEVE", "Leve"), ("MEDIA", "Media"), ("ALTA", "Alta")],
                default="MEDIA",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="cita",
            name="prioridad",
            field=models.CharField(
                choices=[
                    ("NORMAL", "Normal"),
                    ("PRIORITARIA", "Prioritaria"),
                    ("URGENTE", "Urgente"),
                ],
                default="NORMAL",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="cita",
            name="tiempo_estimado",
            field=models.PositiveIntegerField(default=1, help_text="Horas estimadas"),
        ),
        migrations.AddField(
            model_name="cita",
            name="creado_en",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name="cita",
            name="cliente",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="citas",
                to="clientes.cliente",
            ),
        ),
        migrations.AlterField(
            model_name="cita",
            name="estado",
            field=models.CharField(
                choices=[
                    ("PENDIENTE", "Pendiente"),
                    ("EN_PROCESO", "En proceso"),
                    ("COMPLETADA", "Completada"),
                    ("CONFIRMADA", "Confirmada"),
                    ("CANCELADA", "Cancelada"),
                ],
                default="PENDIENTE",
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="cita",
            name="hora",
            field=models.TimeField(blank=True, null=True),
        ),
    ]
