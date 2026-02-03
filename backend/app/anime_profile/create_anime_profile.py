def create_anime_profile(db_response,user_interests_profile):
    anime_profile = {}
    for anime in db_response:
        print(anime)