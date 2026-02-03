import requests
import json
import time

def anilist_export_data(page_number):
    query = '''
    query MostPopularAnime($page: Int) {
  Page(page: $page) {
    media(
      type: ANIME
      sort: POPULARITY_DESC
    ) {
      id
                idMal
                title { english }
                tags { name rank }
                seasonYear
                format
                isAdult
                genres
                popularity
                favourites
                meanScore
                recommendations {
                    nodes { mediaRecommendation { title {
                      english
                    } } }
                }
    }
    pageInfo {
      hasNextPage
      total
    }
  }
}

    '''
    variables = {'page': page_number}
    url = 'https://graphql.anilist.co'

    api_response = requests.post(url, json={'query': query, 'variables': variables})
    if api_response.status_code == 429:
        print(f"Rate limit hit on page {page_number}, sleeping 10s...")
        time.sleep(10)
        return anilist_export_data(page_number)
    res = api_response.json()
    return res
def anilist_pack_data_to_db(res):
    if not res or "data" not in res:
        return []

    media_list = res.get('data', {}).get('Page', {}).get('media', [])
    result = []

    for media in media_list:
        media_id = media.get('id')
        if media_id is None:
            continue

        id_mal = media.get('idMal')
        title = media.get('title', {}).get('english')
        season_year = media.get('seasonYear')
        media_format = media.get('format')
        is_adult = media.get('isAdult')
        genres = json.dumps(media.get('genres', []))
        tags = json.dumps(media.get('tags', []))
        rec_nodes = media.get('recommendations', {}).get('nodes', [])
        recommendations = json.dumps([
            rec.get('mediaRecommendation', {})
               .get('title', {})
               .get('english')
            for rec in rec_nodes
            if rec.get('mediaRecommendation')
        ])

        popularity = media.get('popularity')
        favourites = media.get('favourites')
        mean_score = media.get('meanScore')

        result.append((
            media_id,
            id_mal,
            title,
            season_year,
            media_format,
            is_adult,
            genres,
            tags,
            recommendations,
            popularity,
            favourites,
            mean_score
        ))

    return result
