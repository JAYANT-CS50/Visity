from rest_framework import viewsets
from assessment.models import Visitydata
from assessment.serializers import VisitySerializer

# Create your views here.
class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Visitydata.objects.all()
    serializer_class = VisitySerializer