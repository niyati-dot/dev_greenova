from cryptography.fernet import Fernet
from django.conf import settings
import base64

class EncryptionService:
    def __init__(self):
        self.key = self._get_or_generate_key()
        self.cipher_suite = Fernet(self.key)

    def _get_or_generate_key(self) -> bytes:
        key = getattr(settings, 'ENCRYPTION_KEY', None)
        if not key:
            key = Fernet.generate_key()
            settings.ENCRYPTION_KEY = key
        return key if isinstance(key, bytes) else str(key).encode()

    def encrypt(self, data: str) -> str:
        return self.cipher_suite.encrypt(data.encode()).decode()

    def decrypt(self, encrypted_data: str) -> str:
        return self.cipher_suite.decrypt(encrypted_data.encode()).decode()

    def rotate_key(self) -> None:
        new_key = Fernet.generate_key()
        new_cipher = Fernet(new_key)
        # Implement key rotation logic here
