from backend.config.reccomender_values_settings import REPEAT_MULTIPLIER, USER_FAVOURITES_MULTIPLIER, score_multiplier


def user_genre_profile(entry,user_data,user_genres):
    genres = entry['media']['genres']
    anime_score = entry['score']
    repeat_multiplier = entry["repeat"] + REPEAT_MULTIPLIER
    user_favourites_multiplier = 1
    if user_data['mediaListOptions']['scoreFormat'] in ('POINT_10', 'POINT_10_DECIMAL'):
        anime_score *= 10
    elif user_data['mediaListOptions']['scoreFormat'] == 'POINT_5':
        anime_score *= 20
    elif user_data['mediaListOptions']['scoreFormat'] == 'POINT_3':
        anime_score *= 33
    for favourite in user_data["favourites"]["anime"]["nodes"]:
        if entry["media"]["id"] == favourite["id"]:
            user_favourites_multiplier = USER_FAVOURITES_MULTIPLIER
    multiplier = score_multiplier(anime_score)
    for genre in genres:
        if genre not in user_genres:
            user_genres[genre] = {
                "score": 0
            }
        user_genres[genre]["score"] += 1 * multiplier * repeat_multiplier * user_favourites_multiplier