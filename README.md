# Women Composers API

This API contains information about 10 different female composers of Western Classical music, ranging from the medieval to post-modern eras.

## Content

Each composer object contains:

```
name: string
life: {
    fullName: string
    lifespan : string
    bio: string
    nationality: string
}
era: {
    name: string
    description: string
}
img: string
works: {
    piece: string
    date: string
    description: string
}[]

```

## References/Tools Used

### NPM Modules

- http
- url
- fs
- express
- body-parser
- morgan
- Mongoose
- Passport

### Other

- Postman
- PostgreSQL (for practice database)
- MongoDB
- MongoDB Atlas
- Render
- CORS
