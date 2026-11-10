from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.models.change_request import ChangeRequest, ChangeRequestCreate
from app.models.project import Project, ProjectCreate
from app.store import change_requests, projects

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(project_data: ProjectCreate) -> Project:
    project = Project(**project_data.model_dump())
    projects[project.id] = project
    return project


@router.get("", response_model=list[Project])
async def list_projects() -> list[Project]:
    return list(projects.values())


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: UUID) -> Project:
    project = projects.get(project_id)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    return project


@router.post(
    "/{project_id}/change-requests",
    response_model=ChangeRequest,
    status_code=status.HTTP_201_CREATED,
)
async def create_change_request(
    project_id: UUID,
    request_data: ChangeRequestCreate,
) -> ChangeRequest:
    if project_id not in projects:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    change_request = ChangeRequest(
        **request_data.model_dump(),
        project_id=project_id,
    )
    change_requests[change_request.id] = change_request
    return change_request


@router.get(
    "/{project_id}/change-requests",
    response_model=list[ChangeRequest],
)
async def list_change_requests(project_id: UUID) -> list[ChangeRequest]:
    if project_id not in projects:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    return [
        request
        for request in change_requests.values()
        if request.project_id == project_id
    ]
