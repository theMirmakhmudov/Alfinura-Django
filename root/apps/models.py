from django.db import models


class Images(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Images"


class Products(models.Model):
    product_id = models.IntegerField(null=True)
    image = models.ForeignKey('apps.Images', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.name} {self.category} {self.price}"

    class Meta:
        verbose_name_plural = "Products"
