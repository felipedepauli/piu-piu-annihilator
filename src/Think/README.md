

### Para criar os containers FrontalLobe + Memory
```bash
docker compose up -d --build && watch -n0.5 docker logs sentinel_frontal_lobe
```
```bash
docker logs sentinel_frontal_lobe
```
### Para destruí-los
```bash
docker compose down
```
## Para testar o bd
### Adicionar um novo usuário
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "Jaiminho", "email": "jaiminho@oiew.com", "password": "slk"}' http://localhost:8080/memory/add
```
