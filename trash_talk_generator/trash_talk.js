const task = {
  engineer: ['加個按鈕', '加新功能', '切個版', '改一點 code'],
  designer: ['畫一張圖', '改個 logo', '順便幫忙設計一下', '隨便換個設計'],
  entrepreneur: ['週末加班', '要能賺錢', '想個business model', '找 VC 募錢']
}
const phrase = ['很簡單', '很容易', '很快', '很正常']

function getTheSentence(taskArray, position) {
  const index1 = Math.floor(Math.random() * taskArray.length)
  const index2 = Math.floor(Math.random() * taskArray.length)
  // 建立一個物件做職稱的轉換
  const jobTitle = {
    engineer: '工程師',
    designer: '設計師',
    entrepreneur: '創業家'
  }
  return `身為一個${jobTitle[position]}，${taskArray[index1]}應該${phrase[index2]}吧!`
}

function talkTrashy(choice) {

  switch (choice.jobTitle) {
    case 'designer':
      return getTheSentence(task.designer, choice.jobTitle);
      break;
    case 'engineer':
      return getTheSentence(task.engineer, choice.jobTitle)
      break;
    case 'entrepreneur':
      return getTheSentence(task.entrepreneur, choice.jobTitle)
      break;
  }
}

module.exports = {
  talkTrashy
}