from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4

@dataclass(frozen=True)
class User:
    id: UUID
    username: str
    email: str
    roles: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)

@dataclass(frozen=True)
class Transaction:
    user_id: UUID
    type: str
    status: str
    data: Dict[str, Any]
    id: UUID = field(default_factory=uuid4)
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
