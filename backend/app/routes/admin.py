from fastapi import APIRouter, Depends
from ..dependencies.rbac import admin_required

router = APIRouter()

@router.get("/admin/dashboard", dependencies=[Depends(admin_required)])
def admin_dashboard():
    return {"msg": "Welcome, admin!"}
