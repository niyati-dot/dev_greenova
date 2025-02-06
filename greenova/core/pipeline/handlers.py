import logging
from typing import Any, Callable, Optional
from dataclasses import dataclass
from datetime import datetime

logger = logging.getLogger('greenova.pipeline')

@dataclass
class PipelineContext:
    started_at: datetime
    data: Any
    metadata: Optional[dict] = None

class PipelineHandler:
    def __init__(self, max_retries: int = 3):
        self.max_retries = max_retries
        self.processors: list[Callable] = []

    def add_processor(self, processor: Callable) -> None:
        self.processors.append(processor)

    def process(self, data: Any) -> Any:
        context = PipelineContext(
            started_at=datetime.now(),
            data=data,
            metadata={}
        )

        for processor in self.processors:
            retry_count = 0
            while retry_count < self.max_retries:
                try:
                    context.data = processor(context.data)
                    break
                except Exception as e:
                    retry_count += 1
                    logger.error(f"Processing failed (attempt {retry_count}): {e}")
                    if retry_count == self.max_retries:
                        raise

        return context.data
