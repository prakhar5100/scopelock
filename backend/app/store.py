from uuid import UUID

from app.models.change_request import ChangeRequest
from app.models.project import Project

projects: dict[UUID, Project] = {}
change_requests: dict[UUID, ChangeRequest] = {}
