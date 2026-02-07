import psycopg2

from backend.config.db_settings import HOST,DATABASE,USER,PASSWORD

def get_recommended_animes_data(anime_list):
    placeholders = ','.join(['%s'] * len(anime_list))

    SQL = f"""
    SELECT id,id_mal,title_english,season_year,format,is_adult,mean_score,description,episode_number,cover_image,trailer_id,trailer_site,season FROM anime_data
    WHERE title_english IN ({placeholders})
    """

    config = {'host': HOST, 'database': DATABASE, 'user': USER, 'password': PASSWORD}

    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(SQL, anime_list)
                return cur.fetchall()
    except Exception as e:
        print("DB ERROR:", e)
