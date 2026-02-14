from fastapi import FastAPI

from backend.app.anime_profile.final_reccomendations_dict import prepare_dictionary

app = FastAPI()

@app.get("/recommendations_data")
def read_root():
    data = prepare_dictionary()
    return data


# by uruchomic w folderze anime-recommender: python -m uvicorn backend.app.api.main:app --reload
#dane sa w: http://127.0.0.1:8000/recommendations_data