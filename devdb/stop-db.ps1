
# TODO: validate current path

echo "shutting down dev database..."

# stop dev database
docker-compose -f docker-compose-devdb.yml down

echo "dev database is off."
