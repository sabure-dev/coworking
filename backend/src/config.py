from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")

SECRET_AUTH = os.environ.get("SECRET_AUTH")
ACCESS_TOKEN_EXPIRE_MINUTES = os.environ.get('ACCESS_TOKEN_EXPIRE_MINUTES')
ALGORITHM = os.environ.get('ALGORITHM')

# DB_HOST = "dpg-cpt92i3v2p9s73b41h80-a.frankfurt-postgres.render.com"
# DB_HOST = "dpg-cpt92i3v2p9s73b41h80-a"
# DB_PORT = 5432
# DB_NAME = "coworking_wmpe"
# DB_USER = "dragon"
# DB_PASS = "JVCrbXqKbiWGeJOr19WgXIJYVPQ72Heg"

# DB_HOST = "localhost"
# DB_PORT = 1337
# DB_NAME = "coworking_db"
# DB_USER = "postgres"
# DB_PASS = "black_dragon164"

TEST_DB_HOST = os.environ.get("TEST_DB_HOST")
TEST_DB_PORT = os.environ.get("TEST_DB_PORT")
TEST_DB_NAME = os.environ.get("TEST_DB_NAME")
TEST_DB_USER = os.environ.get("TEST_DB_USER")
TEST_DB_PASS = os.environ.get("TEST_DB_PASS")

# SECRET_AUTH = "378ca6d896e23b6658d00b267c9cd727e6fb95d93ef035521546a7facbd6dbf6"
# ACCESS_TOKEN_EXPIRE_MINUTES = 180
# ALGORITHM = "HS256"
