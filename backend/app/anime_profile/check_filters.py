from backend.app.anime_profile.filters import IS_ADULT, FORMAT, SEASON_YEAR_FROM, SEASON_YEAR_TO, SHOW_PLANNING


def check_if_adult(anime):
    if IS_ADULT == True:
        return True
    elif anime[5] == True:
        return False
    else:
        return True

def check_format(anime):
    if FORMAT[anime[4]] == True:
        return True
    else:
        return False

def check_season_year(anime):
    if anime[3] >= SEASON_YEAR_FROM and anime[3] <= SEASON_YEAR_TO:
        return True
    else:
        return False

def check_show_planning(anime,anime_planning):
    if SHOW_PLANNING == True:
        return True
    elif anime[2] in anime_planning:
        return False
    else:
        return True