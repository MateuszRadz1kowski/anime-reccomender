import math

from backend.app.user_profile.create_user_tag_profile import user_tag_profile
from backend.app.user_profile.user_genre_profile import user_genre_profile
from backend.scripts.tag_count import export_tag_count, get_tag_popularity_weight
from get_user_data import get_user_data
from backend.config.reccomender_values_settings import (REPEAT_MULTIPLIER, USER_FAVOURITES_MULTIPLIER, score_multiplier)

def create_user_interests_profile():
    data = get_user_data()
    entries = data['data']['MediaListCollection']['lists'][0]['entries']
    user_data = data['data']['User']

    user_tags = {}
    user_genres = {}

    for entry in entries:
        user_tag_profile(entry, user_data, user_tags)
        user_genre_profile(entry,user_data,user_genres)

    normalise_score(user_tags)
    normalise_score(user_genres)
    sorted_tags = sorted(
        user_tags.items(),
        key=lambda x: x[1]['score'],
        reverse=True
    )

    sorted_genres = sorted(
        user_genres.items(),
        key=lambda x: x[1]['score'],
        reverse=True
    )

    print(sorted_tags)
    print(sorted_genres)


def normalise_score(user_interests):
    sum_sq = 0.0
    for i in user_interests.values():
        sum_sq += i["score"] ** 2

    norm = math.sqrt(sum_sq)

    for i in user_interests.values():
        i["score"] /= norm

    return user_interests

create_user_interests_profile()


