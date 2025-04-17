# Backend Dockerfile for Bored Board Games
FROM python:3.11-slim

WORKDIR /app

COPY ./app ./app
COPY ./tests ./tests
COPY requirements.txt .
COPY .env.example .

RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir pytest

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
