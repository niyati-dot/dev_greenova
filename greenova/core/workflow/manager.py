from typing import Dict, Any, Optional, Callable
from dataclasses import dataclass
from datetime import datetime
import uuid
import logging

logger = logging.getLogger('greenova.workflow')

@dataclass
class WorkflowTask:
    id: str
    name: str
    status: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    error: Optional[str] = None

class WorkflowManager:
    def __init__(self):
        self.tasks: Dict[str, WorkflowTask] = {}

    def create_task(self, name: str) -> WorkflowTask:
        task = WorkflowTask(
            id=str(uuid.uuid4()),
            name=name,
            status="pending",
            started_at=datetime.now()
        )
        self.tasks[task.id] = task
        return task

    def execute_task(self, task_id: str, func: Callable[..., Any], *args, **kwargs) -> Any:
        task = self.tasks.get(task_id)
        if not task:
            raise ValueError(f"Task {task_id} not found")

        task.status = "running"
        try:
            result = func(*args, **kwargs)
            task.status = "completed"
            task.completed_at = datetime.now()
            return result
        except Exception as e:
            task.status = "failed"
            task.error = str(e)
            task.completed_at = datetime.now()
            logger.error(f"Task {task_id} failed: {e}")
            raise
