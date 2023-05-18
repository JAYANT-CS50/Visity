from rest_framework import serializers
from .models import Visitydata

#creating serializers
class VisitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitydata
        fields = '__all__'
