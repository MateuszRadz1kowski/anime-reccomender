import psycopg2

from backend.app.anime_profile.create_anime_profile import create_anime_profile
from backend.app.user_profile.create_user_interests_profile import create_user_interests_profile
from backend.app.user_profile.get_user_data import get_user_data
from backend.config.db_settings import HOST,DATABASE,USER,PASSWORD

SQL = """
SELECT * FROM anime_data
"""

def get_anime_data():
    config = {'host': HOST, 'database': DATABASE, 'user': USER, 'password': PASSWORD}
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(SQL)
                response = cur.fetchall()
            conn.commit()
            user_interests_profile = create_user_interests_profile()
            create_anime_profile(response,user_interests_profile)
    except Exception as e:
        print("DB ERROR:", e)


get_anime_data()