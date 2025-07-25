from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Auto Explainer API")

class CompanyIntake(BaseModel):
    company_name: str
    website_url: str | None = None
    description: str
    goal: str

class StoryRequest(BaseModel):
    intake_id: int

class KeyframeRequest(BaseModel):
    story_id: int

class VideoRequest(BaseModel):
    keyframes_id: int


@app.post("/api/intake")
def intake(data: CompanyIntake):
    """Mock company intake processing."""
    return {
        "intake_id": 1,
        "message": f"Received info for {data.company_name} - Пельменная в Берлине"
    }


@app.post("/api/storygen")
def storygen(req: StoryRequest):
    return {
        "story_id": 1,
        "concepts": [
            "AIDA based concept",
            "Problem-solution approach",
            "Feature highlight"
        ]
    }


@app.post("/api/keyframes")
def keyframes(req: KeyframeRequest):
    return {
        "keyframes_id": 1,
        "frames": ["frame1.png", "frame2.png"]
    }


@app.post("/api/video")
def video(req: VideoRequest):
    return {
        "video_url": "https://example.com/video.mp4"
    }
