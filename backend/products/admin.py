from django.contrib import admin
from .models import productsModels
# Register your models here.

class productsAdmin(admin.ModelAdmin):
    list_display = ['name','price','height']
    search_fields = ('name','price','height')

admin.site.register(productsModels, productsAdmin)
