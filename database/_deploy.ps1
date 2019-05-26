heroku pg:reset DATABASE_URL --confirm _APP_NAME
heroku pg:push postgres://_USERNAME:_PASSWORD@_HOST:_PORT/_DATABASE DATABASE_URL
