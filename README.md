# Geoprofs 2026

## Tech Stack

* React + TypeScript
* TailwindCSS
* Django
* SQLite3
* Docker

## Installatie

Clone de repository:

```bash
git clone https://github.com/Riftaricus/Geoprofs-2026.git
cd Geoprofs-2026
```

Start het project met Docker:

```bash
docker compose up --build
```

Daarna zijn de applicatie en backend beschikbaar via de poorten die in de Docker-configuratie zijn ingesteld.

Om de containers op de achtergrond te starten:

```bash
docker compose up -d
```

Stop de containers met:

```bash
docker compose down
```

## Projectstructuur

```text
Geoprofs-2026/
├── frontend/    # React + TypeScript + TailwindCSS
├── backend/     # Django + SQLite3
├── docker-compose.yml
└── README.md
```
