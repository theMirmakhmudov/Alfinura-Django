from django.views.generic import ListView, TemplateView
from .models import Products


class Index(ListView):
    template_name = "index.html"
    model = Products
    context_object_name = "products"
