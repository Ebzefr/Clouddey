from django.http import JsonResponse
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from core.firebase_auth import firebase_token_required
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from django.db.models import Q
from rest_framework.response import Response
from .models import ClouddeyFile, ClouddeyFolder, SharedItem
from .serializers import ClouddeyFileSerializer, ClouddeyFolderSerializer, SharedItemSerializer

@firebase_token_required  # Ensure the user is authenticated
def upload_file(request):
    firebase_user = request.user_firebase
    uid = firebase_user['uid']
    
    
    return JsonResponse({"message": "File uploaded successfully"})
    
class ClouddeyFileViewSet(viewsets.ModelViewSet):
    serializer_class = ClouddeyFileSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    
    def get_queryset(self):
        # Only return files owned by the current user that aren't in trash
        uid = self.request.user_uid  # From Firebase auth middleware
        queryset = ClouddeyFile.objects.filter(owner_uid=uid, is_trashed=False)
        
        # Filter by parent folder if specified
        parent_folder = self.request.query_params.get('folder', None)
        if parent_folder:
            queryset = queryset.filter(parent_folder=parent_folder)
        return queryset
    
    def create(self, request, *args, **kwargs):
        # The frontend will handle the actual file upload to Firebase Storage
        # and send us the metadata and storage path
        data = request.data.copy()
        data['owner_uid'] = request.user_uid
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    
    @action(detail=True, methods=['post'])
    def star(self, request, pk=None):
        file = self.get_object()
        file.is_starred = not file.is_starred
        file.save()
        return Response({'is_starred': file.is_starred})
    
    @action(detail=True, methods=['post'])
    def trash(self, request, pk=None):
        file = self.get_object()
        file.is_trashed = True
        file.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ClouddeyFolderViewSet(viewsets.ModelViewSet):
    serializer_class = ClouddeyFolderSerializer
    
    def get_queryset(self):
        # Only return folders owned by the current user that aren't in trash
        uid = self.request.user_uid  # From Firebase auth middleware
        queryset = ClouddeyFolder.objects.filter(owner_uid=uid, is_trashed=False)
        
        # Filter by parent folder if specified
        parent_folder = self.request.query_params.get('folder', None)
        if parent_folder:
            queryset = queryset.filter(parent_folder=parent_folder)
        else:
            queryset = queryset.filter(parent_folder__isnull=True)  # Root folders
        
        return queryset
    
    def perform_create(self, serializer):
        # Set the owner to the current Firebase user
        serializer.save(owner_uid=self.request.user_uid)
    
    @action(detail=True, methods=['get'])
    def contents(self, request, pk=None):
        folder = self.get_object()
        files = ClouddeyFile.objects.filter(parent_folder=folder, is_trashed=False)
        subfolders = ClouddeyFolder.objects.filter(parent_folder=folder, is_trashed=False)
        
        file_serializer = ClouddeyFileSerializer(files, many=True)
        folder_serializer = ClouddeyFolderSerializer(subfolders, many=True)
        
        return Response({
            'files': file_serializer.data,
            'folders': folder_serializer.data
        })

class SharedItemViewSet(viewsets.ModelViewSet):
    serializer_class = SharedItemSerializer
    
    def get_queryset(self):
        # Return items shared by the user or with the user
        uid = self.request.user_uid
        return SharedItem.objects.filter(
            Q(file__owner_uid=uid) | 
            Q(folder__owner_uid=uid) |
            Q(shared_with=uid)
        )