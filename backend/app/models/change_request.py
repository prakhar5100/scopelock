from datetime import UTC, datetime
from enum import StrEnum
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class ChangeRequestStatus(StrEnum):
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    REJECTED = "rejected"


class ChangeRequestCreate(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    description: str = Field(min_length=1, max_length=5000)


class ChangeRequest(ChangeRequestCreate):
    id: UUID = Field(default_factory=uuid4)
    project_id: UUID
    status: ChangeRequestStatus = ChangeRequestStatus.SUBMITTED
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
