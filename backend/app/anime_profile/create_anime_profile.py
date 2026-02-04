def create_anime_profile(db_response,user_interests_profile):
    anime_profile = {}
    print(user_interests_profile[1])
    for anime in db_response:
        anime_name = anime[2]
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
                    anime_profile[anime_name] += 30 * user_interests_profile[1].get(genre)
    sorted_anime_profile = sorted(
            anime_profile.items(),
            key=lambda x: x[1],
            reverse=True
        )
    print(sorted_anime_profile)