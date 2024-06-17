from django.contrib import admin
from django.utils.html import format_html

from .models import Products, Images


@admin.register(Images)
class ImagesAdmin(admin.ModelAdmin):
    list_display = ["name", "image_tag"]

    def image_tag(self, obj):
        return format_html(f'''<a href="{obj.image.url}" target="_blank"><img src="{obj.image.url}"
         alt="image" width="100 height="100" style="object-fit : cover;"/></a>''')


@admin.register(Products)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "price", "image_tag"]

    def image_tag(self, obj):
        return format_html(f'''<a href="{obj.image.image.url}" target="_blank"><img src="{obj.image.image.url}"
         alt="image" width="100 height="100" style="object-fit : cover;"/></a>''')
