from rest_framework import serializers
from .models import ClouddeyFile, ClouddeyFolder, SharedItem

class ClouddeyFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClouddeyFile
        fields = ['id', 'name', 'file', 'size', 'mime_type', 'parent_folder', 
                  'created_at', 'updated_at', 'is_starred', 'is_trashed']
        read_only_fields = ['id', 'size', 'mime_type', 'created_at', 'updated_at']

class ClouddeyFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClouddeyFolder
        fields = ['id', 'name', 'parent_folder', 'created_at', 
                  'updated_at', 'is_starred', 'is_trashed']
        read_only_fields = ['id', 'created_at', 'updated_at']

class SharedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedItem
        fields = ['id', 'file', 'folder', 'shared_with', 'permission', 'created_at']
        read_only_fields = ['id', 'created_at']