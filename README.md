# PTUDW-CNTN2016-Nhom07

## Thông tin thành viên

Trần Hoài Nam - 1612403

Hồ Minh Huấn - 1612224

Nguyễn Trần Hậu - 1612180

## Cấu trúc tổ chức app

```
app.js
routes
    ...js
models
    ...js
views
    ...html
public
    css
    img
```

Thư mục ```routes``` chứa endpoint định tuyến

Thư mục ```models``` chứa models ORM

Thư mục ```views``` chứa html

Thư mục ```publc``` chứa static file (img, css, ...)

File ```app.js``` là file chạy chính

## Hướng dẫn

Chạy local
```
npm install
npm start
```

Reset heroku database
```
heroku pg:reset DATABASE_URL
```
