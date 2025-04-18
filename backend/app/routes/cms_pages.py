from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.page_service import get_page_by_slug
from ..schemas.page_schema import PageOut

router = APIRouter()

@router.get("/")
def homepage(db: Session = Depends(get_db)):
    page = get_page_by_slug(db, "homepage")
    return {"slug": page.slug, "title": page.title, "content": page.content}

@router.get("/about")
def about_page(db: Session = Depends(get_db)):
    page = get_page_by_slug(db, "about")
    return {"slug": page.slug, "title": page.title, "content": page.content}

@router.get("/terms")
def terms_page(db: Session = Depends(get_db)):
    page = get_page_by_slug(db, "terms")
    return {"slug": page.slug, "title": page.title, "content": page.content}
