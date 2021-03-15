from rest_framework import serializers
from .models import productsModels

class productsSerializers(serializers.ModelSerializer):
    class Meta:
        model = productsModels
        fields = '__all__'

