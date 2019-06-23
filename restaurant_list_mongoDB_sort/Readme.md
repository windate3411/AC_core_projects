# 我的餐廳清單 

此專案為先前餐廳專案的重構版本，加入了排序功能並重構了路由的部分。

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
請先利用指令或GUI畫面前往restaurant_list_mongoDB_sort資料夾

```
cd restaurant_list_mongoDB_sort
```
利用pwd確認自己在restaurant_list_mongoDB_sort後，利用以下指令安裝相關npm套件

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
### 此作業以A6為原型修改，以下列出與A6不同之處
+ 調整版面(加入sort的button)
+ 建立routes並依照排序需要新增了排序的路由
+ 為了正確依評分排序，修改model內rating的資料型態


## 作者

* **Danny Wang** 

