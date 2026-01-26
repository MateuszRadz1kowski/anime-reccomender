from sympy.codegen.ast import continue_

from get_user_data import get_user_data

def user_tag_profile(entry,score_format):
    tag = entry.get('media').get('tags')
    tags_rated = {}
    anime_score = entry.get('score')
    if score_format == 'POINT_100':
        pass
    elif score_format == 'POINT_10_DECIMAL' or score_format == 'POINT_10':
        anime_score  = anime_score *10
    elif score_format == 'POINT_5':
        anime_score = anime_score * 20
    elif score_format == 'POINT_3':
        anime_score = anime_score * 33
    print(anime_score)

def create_user_interests_profile():
    data = get_user_data()
    entries_data = data.get('data').get('MediaListCollection').get('lists')[0].get('entries')
    score_format = data.get('data').get('User').get('mediaListOptions').get('scoreFormat')
    for entry in entries_data:
        user_tag_profile(entry,score_format)



create_user_interests_profile()



