from django.urls import path, include
from rest_framework import routers
from assessment.views import AssessmentViewSet 

router = routers.DefaultRouter()
router.register(r'visity', AssessmentViewSet, basename='visity')

urlpatterns = [
  path('', include(router.urls))

]