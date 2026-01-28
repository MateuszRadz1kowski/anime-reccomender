import math
from backend.scripts.tag_count import export_tag_count, get_tag_popularity_weight
from get_user_data import get_user_data
from backend.config.reccomender_values_settings import (REPEAT_MULTIPLIER, USER_FAVOURITES_MULTIPLIER, score_multiplier)

def user_tag_profile(entry, user_data, user_tags):
    tags = entry['media']['tags']
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
    for tag in tags:
        tag_name = tag['name']
        tag_id = tag['id']
        tag_rank = tag['rank']

        tag_score = 10 * tag_rank * multiplier

        if tag_name not in user_tags:
            user_tags[tag_name] = {
                "id": tag_id,
                "score": 0
            }
        user_tags[tag_name]["score"] += tag_score * get_tag_popularity_weight(tag) * repeat_multiplier * user_favourites_multiplier

def create_user_interests_profile():
    data = get_user_data()
    entries = data['data']['MediaListCollection']['lists'][0]['entries']
    user_data = data['data']['User']

    user_tags = {}

    for entry in entries:
        user_tag_profile(entry, user_data, user_tags)

    normalise_tag_score(user_tags)

    sorted_tags = sorted(
        user_tags.items(),
        key=lambda x: x[1]['score'],
        reverse=True
    )

    return sorted_tags


def normalise_tag_score(user_tags):
    sum_sq = 0.0
    for tag in user_tags.values():
        sum_sq += tag["score"] ** 2

    norm = math.sqrt(sum_sq)

    for tag in user_tags.values():
        tag["score"] /= norm

    return user_tags

print(create_user_interests_profile())



