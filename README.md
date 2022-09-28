# RestaurantList Search List

使用Node.js+Express建構記帳清單，並運用handlebars樣版引擎來帶出記帳內容。

  

**功能介紹**

1. 使用者可以註冊帳號密碼。

2. 使用者註冊之後，可以進行登入/登出，且在首頁瀏覽所有支出的項目。

3. 使用者只可以看到自己建立的記帳項目。

4. 使用者可以在首頁看到所有支出清單的總金額。

5. 使用者可以新增、編輯、刪除記帳的項目。


**下一階段預計更新**

1. 新增卡片與清單顯示模式的切換功能。

2. 新增登入與註冊介面與功能。

  

## Getting Start

  

1. Clone the project

  

```

git clone https://github.com/AllenliIE/expense-tracker

```

  

2. Install the required dependencies

  

```

npm install

```

  

3. Install nodemon

  

```

npm i nodemon

```

  

4. Start the server

  

```

npm run seed
npm run dev

```

  

5. Execute successfully if seeing following message

  

```

Expense-Tracker is running on http://localhost:3000

```

  

## Built With

- bcryptjs @2.4.3
- body-parser @1.20.0
- connect-flash @0.1.1
- dotenv @8.2.0
- express @4.17.1
- express-handlebars @4.0.2
- express-session @1.17.1
- method-override @3.0.0
- mongoose @5.9.7
- passport @0.4.1
- passport-facebook @3.0.0
- passport-local @1.0.0