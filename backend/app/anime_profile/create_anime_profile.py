import math
from backend.app.anime_profile.check_filters import check_if_adult, check_format, check_season_year, check_show_planning
from backend.app.anime_profile.user_anime_status import user_anime_status
from backend.config.reccomender_values_settings import ANIME_PROFILE_GENRE_MODIFIER, mean_score_multiplier


def create_anime_profile(db_response,user_interests_profile):
    anime_profile = {}
    anime_completed = user_anime_status(0)
    anime_planning = user_anime_status(1)
    for anime in db_response:
        anime_name = anime[2]

        if anime_name in anime_completed:
            continue

        if not (check_if_adult(anime) and check_format(anime) and check_season_year(anime) and check_show_planning(anime, anime_planning)):continue

        for tag in anime[7]:
            tag_name = tag["name"]
            tag_rank = tag["rank"]
            if tag_name in user_interests_profile[0]:
                if anime_name not in anime_profile:
                    anime_profile[anime_name] = 0
                else:
                    anime_profile[anime_name] += tag_rank * user_interests_profile[0].get(tag_name)
        for genre in anime[6]:
            if genre in user_interests_profile[1]:
                if anime_name not in anime_profile:
                    anime_profile[anime_name] = 0
                else:
                    anime_profile[anime_name] += ANIME_PROFILE_GENRE_MODIFIER * user_interests_profile[1].get(genre)
            anime_profile[anime_name] = anime_profile[anime_name] * mean_score_multiplier(anime[11]) * math.log1p(anime[10])
        else:
            continue
    normalise_score(anime_profile)

    sorted_anime_profile = sorted(
            anime_profile.items(),
            key=lambda x: x[1],
            reverse=True
        )
    print(sorted_anime_profile)

def normalise_score(anime):
    sum_sq = 0.0

    for value in anime.values():
        sum_sq += value ** 2

    norm = math.sqrt(sum_sq)

    for key in anime:
        anime[key] = anime[key] / norm

    return anime