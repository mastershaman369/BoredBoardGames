from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.page_schema import PageCreate, PageOut
from ..services.page_service import get_page_by_slug, upsert_page
from ..dependencies.rbac import admin_required

router = APIRouter()

@router.get("/pages/{slug}", response_model=PageOut)
def get_page(slug: str, db: Session = Depends(get_db)):
    return get_page_by_slug(db, slug)

@router.post("/admin/pages", response_model=PageOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(admin_required)])
def create_or_update_page(page: PageCreate, db: Session = Depends(get_db)):
    return upsert_page(db, page.dict())
