# dataStructure-codeBase

# API Endpoints Sample Usage

## 1. ثبت‌نام (Signup)
**POST** `/api/users/signup`

نمونه داده:
```
{
  "username": "sampleuser",
  "email": "sample@example.com",
  "password": "123456"
}
```
پاسخ موفق:
```
{
  "user": { "id": "USER_ID", "username": "sampleuser", "email": "sample@example.com" },
  "token": "JWT_TOKEN"
}
```

---

## 2. ورود (Login)
**POST** `/api/users/login`

نمونه داده:
```
{
  "username": "sampleuser",
  "password": "123456"
}
```
پاسخ موفق:
```
{
  "user": { "id": "USER_ID", "username": "sampleuser", "email": "sample@example.com" },
  "token": "JWT_TOKEN"
}
```

---

## 3. دریافت اطلاعات کاربر فعلی (User Base)
**GET** `/api/users/me`

هدر:
```
Authorization: Bearer JWT_TOKEN
```
پاسخ:
```
{
  "user": {
    "id": "USER_ID",
    "username": "sampleuser",
    "email": "sample@example.com",
    "iat": 1710000000,
    "exp": 1710003600
  }
}
```

---

## 4. لیست کاربران با پروفایل
**GET** `/api/users`

هدر:
```
Authorization: Bearer JWT_TOKEN
```
پاسخ:
```
[{
  "id": "USER_ID",
  "username": "sampleuser",
  "email": "sample@example.com",
  
},
{
  "id": "USER_ID2",
  "username": "sara",
  "email": "sara@example.com",
 
}
]
```

---

## 5. دریافت کاربر با آیدی
**GET** `/api/users/:id`

هدر:
```
Authorization: Bearer JWT_TOKEN
```
پاسخ:
```
{
  "name": "Ali",
  "email": "ali@example.com",
 
}
```

---

## 6. لیست سفارش‌ها با اطلاعات کاربر
**GET** `/api/orders`

هدر:
```
Authorization: Bearer JWT_TOKEN
```
پاسخ:
```
[
  {
    "items": ["item1", "item2"],
    "user": { "name": "Ali", "email": "ali@example.com" },
    "total": 200,
    "createdAt": "2025-06-27T10:00:00.000Z"
  }
]
```

---

## 7. ثبت سفارش جدید
**POST** `/api/orders`

هدر:
```
Authorization: Bearer JWT_TOKEN
```
نمونه داده:
```
{
  "products": ["item1", "item2"],
  "status": "pending"
}
```
پاسخ موفق:
```
{
  "items": ["item1", "item2"],
  "user": "USER_ID",
  "total": 200,
  "createdAt": "2025-06-27T10:00:00.000Z"
}
```

---

## 8. آپلود تصویر تکی
**POST** `/api/upload/single`

فرم دیتا (form-data):
- کلید: `image`
- مقدار: فایل تصویر (jpeg/png)

پاسخ:
```
{
  "message": "Image uploaded",
  "file": { /* اطلاعات فایل */ }
}
```

---

## 9. آپلود چندتصویری (تا ۵ تصویر)
**POST** `/api/upload/multi`

فرم دیتا (form-data):
- کلید: `images`
- مقدار: چند فایل تصویر (jpeg/png)

پاسخ:
```
{
  "message": "Images uploaded",
  "files": [ /* اطلاعات فایل‌ها */ ]
}
```

---

## 10. آپلود چندتصویری (نمونه Postman)
**POST** `/api/upload/multi`

- نوع درخواست: form-data
- کلید: `images` (type: File, allow multiple)
- مقدار: انتخاب چند فایل تصویر (jpeg/png)
- هدر:
```
Authorization: Bearer JWT_TOKEN
```

نمونه پاسخ موفق:
```
{
  "message": "Images uploaded",
  "files": [
    {
      "fieldname": "images",
      "originalname": "sample1.jpg",
      "encoding": "7bit",
      "mimetype": "image/jpeg",
      "destination": "uploads/",
      "filename": "images-1751028351731-264998437.jpg",
      "path": "uploads/images-1751028351731-264998437.jpg",
      "size": 123456
    },
    {
      "fieldname": "images",
      "originalname": "sample2.png",
      "encoding": "7bit",
      "mimetype": "image/png",
      "destination": "uploads/",
      "filename": "images-1751028351733-425107748.png",
      "path": "uploads/images-1751028351733-425107748.png",
      "size": 234567
    }
  ]
}
```

##.env##
JWT_SECRET=your_super_secret_key
