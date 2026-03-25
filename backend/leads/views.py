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

from django.contrib.auth.models import User

@api_view(['POST'])
def register_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"})

    user = User.objects.create_user(username=username, password=password)

    return Response({"message": "User created successfully"})

from django.contrib.auth.models import User

@api_view(['POST'])
def reset_password(request):

    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = User.objects.get(username=username)
        user.set_password(password)   # 🔥 IMPORTANT (hashes password)
        user.save()

        return Response({"message": "Password reset successful"})

    except User.DoesNotExist:
        return Response({"error": "User not found"})