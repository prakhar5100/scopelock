from datetime import UTC, datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    client_name: str = Field(min_length=1, max_length=120)
    description: str | None = Field(default=None, max_length=2000)


class Project(ProjectCreate):
    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
