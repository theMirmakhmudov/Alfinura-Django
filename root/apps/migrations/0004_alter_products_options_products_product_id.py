# Generated by Django 5.0.6 on 2024-06-17 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0003_products_created_at'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='products',
            options={'verbose_name_plural': 'Products'},
        ),
        migrations.AddField(
            model_name='products',
            name='product_id',
            field=models.IntegerField(null=True),
        ),
    ]