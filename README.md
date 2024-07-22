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

## Running Locally
### Prerequsites
* Docker running
* `$(python3 -m site --user-base)/bin` is in your `$PATH`
* MongoDB running locally or a valid connection URI for a remote database.

#### Install LocalStack
```bash
pip3 install localstack
```

#### Run LocalStack in the background
```bash
SERVICES=s3 localstack start -d
```

### Create the LocalStack bucket if it doesn't exist already
```bash
aws --profile localstack --endpoint-url http://localhost:4566 --region=us-east-1 s3 mb s3://localstack-bucket
```

#### Run the application
```bash
AWS_REGION=us-east-1 S3_ENDPOINT=http://localhost:4566 S3_BUCKET_NAME=localstack-bucket CONNECTION_URI={Replace this with MongoDB connection URI} npm start
```
