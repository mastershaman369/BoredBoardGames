from sqlalchemy.orm import Session
from ..models.page import Page
from fastapi import HTTPException, status
from typing import Optional

def get_page_by_slug(db: Session, slug: str) -> Optional[Page]:
    page = db.query(Page).filter(Page.slug == slug, Page.is_published == True).first()
    if not page:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Page not found.")
    return page

def upsert_page(db: Session, page_data: dict) -> Page:
    page = db.query(Page).filter(Page.slug == page_data["slug"]).first()
    if page:
        for k, v in page_data.items():
            setattr(page, k, v)
    else:
        page = Page(**page_data)
        db.add(page)
    db.commit()
    db.refresh(page)
    return page
