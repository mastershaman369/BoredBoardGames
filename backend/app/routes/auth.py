from fastapi import APIRouter, HTTPException, status, Depends, Request
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas.auth_schema import RegisterRequest, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest
from passlib.hash import bcrypt
from jose import jwt
import uuid
import secrets
from fastapi.responses import RedirectResponse
# from ..utils.email import send_email  # Assume send_email exists for real deployment

router = APIRouter()

@router.post("/auth/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed = bcrypt.hash(data.password)
    token = secrets.token_urlsafe(32)
    user = User(email=data.email, password=hashed, name=data.name, role="buyer", is_verified=False, email_token=token)
    db.add(user)
    db.commit()
    db.refresh(user)
    # send_email(user.email, f"Verify your email: http://localhost:8000/verify-email?token={token}")
    return {"msg": "Registration successful. Please check your email for verification."}

@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
    user.is_verified = True
    user.email_token = None
    db.commit()
    return {"msg": "Email verified successfully."}

@router.post("/auth/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not bcrypt.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified.")
    # Placeholder for session token
    return {"msg": "Login successful.", "token": str(uuid.uuid4())}

@router.post("/auth/request-reset")
def request_reset(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    db.commit()
    # send_email(user.email, f"Reset your password: http://localhost:8000/reset-password?token={reset_token}")
    return {"msg": "Password reset email sent.", "reset_token": reset_token}

@router.post("/auth/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.reset_token == data.token).first()
    if not user:
        raise HTTPException(status_code=404, detail="Invalid or expired token.")
    user.password = bcrypt.hash(data.new_password)
    user.reset_token = None
    db.commit()
    return {"msg": "Password reset successful."}

# --- OAuth endpoints (stubs, real implementation would use Authlib or similar) ---
@router.get("/auth/oauth/google")
def oauth_google():
    # Redirect to Google OAuth consent screen (stub)
    return RedirectResponse(url="https://accounts.google.com/o/oauth2/auth?client_id=GOOGLE_CLIENT_ID&redirect_uri=http://localhost:8000/auth/oauth/callback&response_type=code&scope=email profile")

@router.get("/auth/oauth/github")
def oauth_github():
    # Redirect to GitHub OAuth consent screen (stub)
    return RedirectResponse(url="https://github.com/login/oauth/authorize?client_id=GITHUB_CLIENT_ID&redirect_uri=http://localhost:8000/auth/oauth/callback&scope=user")

@router.get("/auth/oauth/callback")
def oauth_callback(request: Request, db: Session = Depends(get_db)):
    # Handle OAuth callback (stub)
    # In production: exchange code for token, fetch user info, upsert user, return session
    return {"msg": "OAuth login successful (stub)."}
