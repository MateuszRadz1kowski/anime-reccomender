from backend.config.reccomender_values_settings import REPEAT_MULTIPLIER, USER_FAVOURITES_MULTIPLIER, score_multiplier
from backend.scripts.tag_count import get_tag_popularity_weight


def user_tag_profile(entry, user_data, user_tags):
    tags = entry['media']['tags']
    anime_score = entry['score']
    repeat_multiplier = entry["repeat"] + REPEAT_MULTIPLIER
    user_favourites_multiplier = 1
    if anime_score == 0:
        return
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