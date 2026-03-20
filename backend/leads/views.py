from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Lead
from .tasks import notify_new_lead

@api_view(['GET'])
def get_leads(request):

    leads = Lead.objects()

    data = []

    for lead in leads:
        data.append({
            "id": str(lead.id),
            "name": lead.name,
            "email": lead.email,
            "status": lead.status
        })

    return Response(data)


@api_view(['POST'])
def create_lead(request):

    lead = Lead(
        name=request.data["name"],
        email=request.data["email"]
    )

    lead.save()

    return Response({"message": "Lead created successfully"})

@api_view(['DELETE'])
def delete_lead(request, id):

    lead = Lead.objects(id=id).first()

    if lead:
        lead.delete()
        return Response({"message": "Lead deleted"})
    
    return Response({"error": "Lead not found"})