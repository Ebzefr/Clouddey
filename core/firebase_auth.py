from firebase_admin import auth
from django.http import JsonResponse
import firebase_admin

def firebase_token_required(get_response):
    def middleware(request):
        id_token = request.META.get('HTTP_AUTHORIZATION')
        if not id_token:
            return JsonResponse({'error': 'Missing Auth Token'}, status=401)

        try:
            decoded_token = auth.verify_id_token(id_token.replace("Bearer ", ""))
            request.user_firebase = decoded_token  # attach user info to request
        except Exception as e:
            return JsonResponse({'error': 'Invalid token', 'details': str(e)}, status=401)

        return get_response(request)

    return middleware
