from django.shortcuts import render
from .models import productsModels
from .serializers import productsSerializers
from rest_framework import serializers
from rest_framework import generics
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# Create your views here.

class productsView(generics.ListAPIView):
    queryset = productsModels.objects.order_by("-pk")
    serializer_class = productsSerializers
    
    @staticmethod
    def post(request):
        serializer = productsSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Product Added"}, status=200)
        return Response(serializer.errors, status=400)
