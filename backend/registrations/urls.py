from django.urls import path
from .views import EventRegisterView, MyRegistrationsView

urlpatterns = [
    path('events/<int:pk>/register/', EventRegisterView.as_view()),
    path('my-registrations/', MyRegistrationsView.as_view()),
]