DC = docker compose

up:
	$(DC) up

build:
	$(DC) up --build

down:
	$(DC) down

logs:
	$(DC) logs -f api

shell:
	$(DC) exec api python manage.py shell

migrate:
	$(DC) exec api python manage.py migrate

makemigrations:
	$(DC) exec api python manage.py makemigrations

superuser:
	$(DC) exec api python manage.py createsuperuser

test:
	$(DC) exec api python manage.py test apps --verbosity=2

seed:
	$(DC) exec api python manage.py shell < seed.py

resetdb:
	$(DC) down -v
	rm -f db.sqlite3
	$(DC) up -d db
	sleep 3
	$(DC) exec api python manage.py migrate

.PHONY: up build down logs shell migrate makemigrations superuser test seed resetdb
