from typing import Any, Callable
from functools import wraps
from datetime import datetime
import asyncio
import logging
import uuid

logger = logging.getLogger('greenova.tasks')

def task_logger(func: Callable) -> Callable:
    @wraps(func)
    async def wrapper(*args, **kwargs) -> Any:
        start_time = datetime.now()
        logger.info(f"Task {func.__name__} started at {start_time}")
        try:
            result = await func(*args, **kwargs)
            end_time = datetime.now()
            duration = (end_time - start_time).total_seconds()
            logger.info(f"Task {func.__name__} completed in {duration}s")
            return result
        except Exception as e:
            logger.error(f"Task {func.__name__} failed: {e}")
            raise
    return wrapper

class TaskScheduler:
    def __init__(self):
        self.tasks = {}
        self.loop = asyncio.get_event_loop()

    async def schedule_task(self, task_func: Callable, *args, **kwargs) -> str:
        task_id = str(uuid.uuid4())
        self.tasks[task_id] = self.loop.create_task(task_func(*args, **kwargs))
        return task_id

    async def cancel_task(self, task_id: str) -> bool:
        if task_id in self.tasks:
            self.tasks[task_id].cancel()
            return True
        return False
