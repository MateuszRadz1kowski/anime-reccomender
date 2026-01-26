from sympy.codegen.ast import continue_

from get_user_data import get_user_data

def score_multiplier(score_100):
    if score_100 < 15: return 0.3
    if score_100 < 30: return 0.45
    if score_100 < 40: return 0.6
    if score_100 < 50: return 0.75
    if score_100 < 55: return 1.0
    if score_100 < 60: return 1.15
    if score_100 < 65: return 1.3
    if score_100 < 70: return 1.5
    if score_100 < 75: return 1.7
    if score_100 < 80: return 1.8
    if score_100 < 85: return 2.0
    if score_100 < 90: return 2.2
    if score_100 < 95: return 2.45
    if score_100 < 98: return 2.6
    if score_100 < 100: return 2.7
    return 3.0


def user_tag_profile(entry, score_format, user_tags):
    tags = entry['media']['tags']
    anime_score = entry['score']

    if score_format in ('POINT_10', 'POINT_10_DECIMAL'):
        anime_score *= 10
    elif score_format == 'POINT_5':
        anime_score *= 20
    elif score_format == 'POINT_3':
        anime_score *= 33

    multiplier = score_multiplier(anime_score)

    for tag in tags:
        tag_name = tag['name']
        tag_id = tag['id']
        tag_rank = tag['rank']

        tag_score = 1000 * tag_rank * multiplier

        if tag_name not in user_tags:
            user_tags[tag_name] = {
                "id": tag_id,
                "score": 0
            }

        user_tags[tag_name]["score"] += tag_score

            



def create_user_interests_profile():
    data = get_user_data()
    entries = data['data']['MediaListCollection']['lists'][0]['entries']
    score_format = data['data']['User']['mediaListOptions']['scoreFormat']

    user_tags = {}

    for entry in entries:
        user_tag_profile(entry, score_format, user_tags)

    sorted_tags = sorted(
        user_tags.items(),
        key=lambda x: x[1]['score'],
        reverse=True
    )

    print(sorted_tags)


create_user_interests_profile()



