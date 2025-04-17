from beanie import Document
from pydantic import Field

class Settings(Document):
    layaway_enabled: bool = Field(default=True)
    # Add more settings as needed

    class Settings:
        name = "settings"
