# 我的餐廳清單 

此專案為餐廳清單的最終版本，加入了使用者登入與驗證的功能
使用者可以採用多種不同的方式登入或是在本地端註冊帳號
種子資料中已預設了兩個使用者，每個使用者各擁有三筆餐廳的資料
user1@example.com、user2@example.com
密碼皆為12345678

## 登入與註冊頁面預覽

![restaurant](https://media.giphy.com/media/eH3zabT6x9Velouvxz/giphy.gif)

## 開發環境

+ [Node.js v10.16.0(LTS)](https://nodejs.org/en/)
+ [Express v4.17.1](https://www.npmjs.com/package/express)
+ [Handlebars v4.1.2](https://www.npmjs.com/package/handlebars)
+ [Mongoose v5.6.0](https://mongoosejs.com/)
+ [MongoDB v4.0.10](https://www.mongodb.com/)

## 如何開始

利用git bash或是cmd在目標資料夾輸入以下指令

```
git clone https://github.com/windate3411/AC_core_projects.git
```

## 安裝套件

由於下載的會是整個AC_core_projects資料夾
請先利用指令或GUI畫面前往restaurant_list_mongoDB_FullVersion資料夾

```
cd restaurant_list_mongoDB_sort
```
利用pwd確認自己在restaurant_list_mongoDB_FullVersion後，利用以下指令安裝相關npm套件

```
npm install
```
接著建立種子資料

```
cd models/seeds
node restaurantSeeder.js
```
順利執行時，應可看見以下訊息

```
'MongoDB connected!'
'Done!'
```


## 執行程式

在專案資料夾的路徑，輸入以下程式即可運行程式

```
npm run dev
```
順利運作會在cmd視窗看到'you are now listening at port 3000'的訊息
這時候便可以至127.0.0.1:3000查看網站內容囉!

## 給助教的話

__為了方便助教批改，以下列出修改部分__
--- 
### 此作業以A7為原型修改，以下列出與A7不同之處
+ 調整版面與優化
+ 加入了多種不同登入方式(本地、google、Fb & github)
+ 利用express-validator做後端驗證(僅檢視name & email欄位 仍不夠完整)
+ 登入與註冊的部分利用新的方式-bootstrap-validator做前端驗證，並搭配適當的提示訊息，未達成條件不允許表單submit
+ 修改了sort的路由(原先使用req.params，在助教的建議下改為利用query strings，但仍未搞懂如何合併搜尋&排序兩個頁面)
+ 修改了種子資料的生成


## 作者

* **Danny Wang** 

