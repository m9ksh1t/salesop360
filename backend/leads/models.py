from django.db import models

# Create your models here.
from mongoengine import Document, StringField, DateTimeField
import datetime

class Lead(Document):
    name = StringField(required=True)
    email = StringField(required=True)
    status = StringField(default="new")
    created_at = DateTimeField(default=datetime.datetime.utcnow)