# Pulse API - Test Evidence (TEST LOG)

Test date: 2026-09-22 22:40:42
Server: NestJS, http://localhost:3000, prefix /api, in-memory storage

## 1. POST /api/videos - create video (FR-2.5)
> Expected: 201 + video object
**Request:**
```json
{"title":"My first video","description":"Description for the Pulse educational project","category":"Education"}
```
**Response: 201**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video","description":"Description for the Pulse educational project","category":"Education","views":0,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"}
```

> Saved video id: 2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a

## 2. POST /api/videos - create second video
**Response: 201**
```json
{"id":"4114a145-10c2-4724-a388-449541165169","title":"Music clip","description":"Short clip","category":"Music","views":0,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.915Z"}
```

## 3. GET /api/videos - list all videos
**Response: 200**
```json
[{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video","description":"Description for the Pulse educational project","category":"Education","views":0,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"},{"id":"4114a145-10c2-4724-a388-449541165169","title":"Music clip","description":"Short clip","category":"Music","views":0,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.915Z"}]
```

## 4. GET /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a - get video by id (FR-3.4, views++)
**Response: 200**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video","description":"Description for the Pulse educational project","category":"Education","views":1,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"}
```

### 4.1 Second GET of the same id - views should become 2 (FR-3.4)
**Response: 200**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video","description":"Description for the Pulse educational project","category":"Education","views":2,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"}
```

## 5. PATCH /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a - update metadata (FR-2.5)
**Request:**
```json
{"title":"My first video (updated)","category":"Technology"}
```
**Response: 200**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video (updated)","description":"Description for the Pulse educational project","category":"Technology","views":2,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"}
```

## 6. POST /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a/reaction type=like - like (FR-4.1)
**Request:**
```json
{"type":"like"}
```
**Response: 201**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video (updated)","description":"Description for the Pulse educational project","category":"Technology","views":2,"likes":1,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"}
```

### 6.1 Second like - rating cancelled (likes should become 0, FR-4.1)
**Response: 201**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video (updated)","description":"Description for the Pulse educational project","category":"Technology","views":2,"likes":0,"dislikes":0,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"}
```

## 7. POST /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a/reaction type=dislike - dislike (FR-4.1)
**Request:**
```json
{"type":"dislike"}
```
**Response: 201**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","title":"My first video (updated)","description":"Description for the Pulse educational project","category":"Technology","views":2,"likes":0,"dislikes":1,"status":"published","createdAt":"2026-09-22T19:40:42.852Z"}
```

## 8. POST /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a/comments - add comment (FR-4.2)
**Request:**
```json
{"author":"Daniil","text":"Great video, liked it!"}
```
**Response: 201**
```json
{"id":"23272a07-9cfc-453b-9c3d-06b9a1ec91db","videoId":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","author":"Daniil","text":"Great video, liked it!","createdAt":"2026-09-22T19:40:43.084Z"}
```

## 9. GET /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a/comments - list comments (FR-4.2)
**Response: 200**
```json
[{"id":"23272a07-9cfc-453b-9c3d-06b9a1ec91db","videoId":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a","author":"Daniil","text":"Great video, liked it!","createdAt":"2026-09-22T19:40:43.084Z"}]
```

## 10. DELETE /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a - delete video (FR-6.2)
**Response: 200**
```json
{"id":"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a"}
```

## 11. GET /api/videos/2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a - after deletion (expected 404)
**Response: 404**
```json
{"message":"Video with id \"2bbe58b3-dbe8-48a8-83a7-fcbf11c5c78a\" not found","error":"Not Found","statusCode":404}
```

## 12. GET /api/videos/no-such-id - nonexistent video (expected 404)
**Response: 404**
```json
{"message":"Video with id \"no-such-id\" not found","error":"Not Found","statusCode":404}
```

## 13. POST /api/videos - empty title (expected 400, ValidationPipe)
**Request:**
```json
{"title":"","description":"no title","category":"Other"}
```
**Response: 400**
```json
{"message":["title should not be empty"],"error":"Bad Request","statusCode":400}
```

## 14. POST /api/videos - extra field hack (expected 400, forbidNonWhitelisted)
**Request:**
```json
{"title":"ok","description":"ok","category":"Other","hack":true}
```
**Response: 400**
```json
{"message":["property hack should not exist"],"error":"Bad Request","statusCode":400}
```

