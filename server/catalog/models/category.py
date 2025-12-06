import uuid
from django.db import models

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    name = models.CharField(max_length=255, unique=True) 
    
    description = models.CharField(max_length=255) 

    def __str__(self):
        # 3. If you still need a clean string output for debugging/admin:
        # It's generally best practice to return only the most identifying field (e.g., name).
        return self.name