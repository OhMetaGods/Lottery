// 數字列表的按鈕
const numberButtons = document.querySelectorAll(".number-btn");

// 自動選號按鈕
const autoButton = document.getElementById("auto-btn");

// 5 個方框
const boxes = document.querySelectorAll(".box");

// 用 Set 紀錄已經選擇的數字
const selectedNumbers = new Set();

// 初始化方框，讓方框點擊時自動輸入數字
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        const number = prompt("輸入 1 ~ 50 的數字", "");
        if (number === null || number === "") return;
        const num = parseInt(number, 10);
        if (isNaN(num) || num < 1 || num > 50) {
            alert("輸入錯誤");
            return;
        }
        selectedNumbers.delete(num); // 先移除已經選擇的數字
        box.textContent = num;
        selectedNumbers.add(num);
    });
});

// 數字列表的按鈕點擊時，自動填入對應的數字
numberButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const number = index + 1;
        // 如果已經選擇過這個數字，則不進行任何操作
        if (selectedNumbers.has(number)) return;
        // 尋找還未填滿的方框，填入這個數字
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].textContent === "") {
                boxes[i].textContent = number;
                selectedNumbers.add(number);
                break;
            }
        }
    });
});

// 自動選號按鈕點擊時，自動填入 5 個不重複的數字
autoButton.addEventListener("click", () => {
    // 先清空所有的方框
    boxes.forEach((box) => {
        box.textContent = "";
    });
    // 清空已經選擇的數字
    selectedNumbers.clear();
    // 隨機選取 5 個不重複的數字
    while (selectedNumbers.size < 5) {
        const number = Math.floor(Math.random() * 50) + 1;
        if (!selectedNumbers.has(number)) {
            selectedNumbers.add(number);
        }
    }
    // 將這 5 個數字填入方框
    let i = 0;
    selectedNumbers.forEach((number) => {
        boxes[i].textContent = number;
        i++;
    });
});

// 方框按鍵按下時，如果是 delete 鍵，則清空方框
boxes.forEach((box) => {
    box.addEventListener("keydown", (event) => {
        if (event.key === "Delete") {
            selectedNumbers.delete(parseInt(box.textContent, 10));
            box.textContent = "";
        }
    });
});