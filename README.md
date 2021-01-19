# game-tracker-api
GraphQL Back End for Game Tracking App

## Models

### gameSession
| Field   | Type     |
| ------- | -------- |
| game    | subdoc   |
| players | [subdoc] |
| date    | date     |
| winner  | user     |
| notes   | string   |

### user
| Field     | Type     |
| --------- | -------- |
| firstName | string   |
| lastName  | string   |
| email     | string   |
| password  | string   |
| friends   | [subdoc] |

### game
| Field      | Type     |
| ---------- | -------- |
| title      | string   |
| minPlayers | number   |
| maxPlayers | number   |