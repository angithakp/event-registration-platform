from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from events.models import Event
from .models import Registration


class EventRegisterView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        event = Event.objects.get(id=pk)

        registration, created = Registration.objects.get_or_create(
            user=request.user,
            event=event
        )

        if created:
            return Response({"message": "Registered successfully"})

        return Response({"message": "Already registered"})


class MyRegistrationsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        registrations = Registration.objects.filter(
            user=request.user
        )

        data = []

        for reg in registrations:
            data.append({
                "event_id": reg.event.id,
                "title": reg.event.title,
                "description": reg.event.description,
                "date": reg.event.date,
                "location": reg.event.location
            })

        return Response(data)