# 幹話產生器 

此專案為職場幹話產生器，可以選擇你希望的對象隨機產生幹話。

## 功能說明

| 功能操作| 說明 |
| ------ | ----------- |
| 選擇對象| 選擇你打算說幹話的對象，若未選擇會有提示訊息 |
| 產生幹話按鈕    | 將在文字框隨機產生一句幹話 |

## 開發環境

+ [Node.js v10.16.0(LTS)](https://nodejs.org/en/)
+ [Express v4.17.1](https://www.npmjs.com/package/express)
+ [Handlebars v4.1.2](https://www.npmjs.com/package/handlebars)

## 如何開始

利用git bash或是cmd在目標資料夾輸入以下指令

```
git clone https://github.com/windate3411/AC_core_projects.git
```

### 安裝套件

由於下載的會是整個AC_core_projects資料夾
請先利用指令或GUI畫面前往trash_talk_generator資料夾

```
cd trash_talk_generator
```
利用pwd確認自己在trash_talk_generator後，利用以下指令安裝相關npm套件

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
+ form的內部使用radio而非checkbox，修改了對應的程式瑪。
+ 為了存取每個選項的value值 用了bodyParser.json()，回傳的資料會變為{radio_name:value值} 
+ 為了讓卡片內容與大小一致，載入靜態style.css檔案


## 作者

* **Danny Wang** 