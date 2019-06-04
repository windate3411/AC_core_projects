# 我的餐廳清單 

此專案收納了我前八名的餐廳，使用者可以在此頁面進行搜尋、查看餐廳細節等操作。

## 功能說明

| 功能操作| 說明 |
| ------ | ----------- |
| 查看細節| 點選餐廳圖示或文字即可 |
| 搜尋    | 輸入餐廳名稱或主題關鍵字即可進行搜尋 |
| 回首頁   | 點選右上角的Restaurant List即可回到首頁 |

## 開發環境

+ [Node.js v10.16.0(LTS)](https://nodejs.org/en/)
+ [Express v4.17.1](https://www.npmjs.com/package/express)
+ [Handlebars v4.1.2](https://www.npmjs.com/package/handlebars)

## 如何開始

利用git bash或是cmd在目標資料夾輸入以下指令

```
git clone https://github.com/windate3411/AC_core_projects.git
```

## 安裝套件

由於下載的會是整個AC_core_projects資料夾
請先利用指令或GUI畫面前往restaurant_list資料夾

```
cd restaurant_list
```
利用pwd確認自己在restaurant_list後，利用以下指令安裝相關npm套件

```
npm install
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
+ 使用動態regrex改寫搜尋功能
+ 建立func.js用來儲存使用的函數(內部僅有search一個功能函式)
+ 微調搜尋框的css

__想達成卻未達成目標__
--- 
+ 原本打算用js語法做出類似auto-complete的效果，不過後來發現無法在sever端操作DOM而放棄
+ 原本打算在show頁面改變banner的背景圖片，但同樣因無法操作DOM而放棄

## 作者

* **Danny Wang** 

