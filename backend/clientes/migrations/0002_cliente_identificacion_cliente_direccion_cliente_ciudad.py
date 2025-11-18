from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='identificacion',
            field=models.CharField(default='', max_length=20, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cliente',
            name='direccion',
            field=models.CharField(default='', max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cliente',
            name='ciudad',
            field=models.CharField(default='', max_length=80),
            preserve_default=False,
        ),
    ]
