from django.db import models

import uuid

class ClouddeyFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    # Instead of FileField, store the Firebase Storage reference
    firebase_storage_path = models.CharField(max_length=500)
    size = models.BigIntegerField()  # Size in bytes
    mime_type = models.CharField(max_length=100)
    owner_uid = models.CharField(max_length=128)  # Firebase UID
    parent_folder = models.ForeignKey('ClouddeyFolder', on_delete=models.CASCADE, null=True, blank=True, related_name='files')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_starred = models.BooleanField(default=False)
    is_trashed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name

class ClouddeyFolder(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    owner_uid = models.CharField(max_length=128)  # Firebase UID
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subfolders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_starred = models.BooleanField(default=False)
    is_trashed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name

class SharedItem(models.Model):
    PERMISSION_CHOICES = [
        ('view', 'View'),
        ('edit', 'Edit'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.ForeignKey(ClouddeyFile, on_delete=models.CASCADE, null=True, blank=True)
    folder = models.ForeignKey(ClouddeyFolder, on_delete=models.CASCADE, null=True, blank=True)
    shared_with = models.CharField(max_length=128)  # Firebase UID of the user it's shared with
    permission = models.CharField(max_length=10, choices=PERMISSION_CHOICES, default='view')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(file__isnull=False) | models.Q(folder__isnull=False),
                name='share_either_file_or_folder'
            )
        ]
