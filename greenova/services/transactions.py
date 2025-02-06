from typing import Optional
from datetime import datetime
from core.data.models import Transaction
from core.pipeline.handlers import PipelineHandler
from core.security.encryption import EncryptionService
import logging

logger = logging.getLogger('greenova.transactions')

class TransactionService:
    def __init__(self):
        self.pipeline = PipelineHandler()
        self.encryption = EncryptionService()

    def process_transaction(self, transaction: Transaction) -> Optional[Transaction]:
        try:
            # Encrypt sensitive data
            if transaction.data.get('sensitive'):
                transaction.data['sensitive'] = self.encryption.encrypt(
                    transaction.data['sensitive']
                )

            # Process through pipeline
            processed_transaction = self.pipeline.process(transaction)

            # Log success
            logger.info(f"Transaction {transaction.id} processed successfully")

            return processed_transaction

        except Exception as e:
            logger.error(f"Transaction processing failed: {e}")
            return None

    def _enrich_transaction(self, transaction: Transaction) -> Transaction:
        # Enrichment logic here
        return transaction
