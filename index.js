const readline = require("readline");
const regedit = require("regedit");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Insert text: ", (text) => {
  const utf8Text = Buffer.from(text, "utf8");

  // Преобразование Buffer в массив чисел
  const valueArray = [];
  for (let i = 0; i < utf8Text.length; i++) {
    valueArray.push(utf8Text[i]);
  }

  // Установка значения в реестре
  regedit.putValue(
    {
      "HKCU\\SOFTWARE\\Landfall Games\\Content Warning": {
        FaceText_h3883740665: {
          value: valueArray,
          type: "REG_BINARY",
        },
      },
    },
    function (err) {
      if (err) {
        console.error("Error while editing regedit:", err, valueArray);
      } else {
        console.log("Face has been set successesfully. UTF8-text:", utf8Text);
      }
    }
  );

  rl.close();
});
