from django.db import models

# Create your models here.

class productsModels(models.Model):
    categoryChoices = [
        ('Succulents' , 'Succulents'),
        ('Low-Light','Low-Light'),
        ('Bright-Light','Bright-Light')
    ]
    price = models.IntegerField(null=False, blank=False)
    name = models.CharField(null=False, blank=False, max_length=255)
    height = models.CharField(null=False,blank = False, max_length=255)
    category = models.CharField(max_length=255, blank=True, choices=categoryChoices)
    image = models.ImageField(upload_to='productImage/', null=True, blank=True)

    def __str__(self):
        return self.name
