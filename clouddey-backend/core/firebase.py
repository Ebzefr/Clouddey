import firebase_admin
from firebase_admin import credentials
from django.conf import settings

cred = credentials.Certificate(settings.FIREBASE_KEY_PATH)
firebase_admin.initialize_app(cred)

