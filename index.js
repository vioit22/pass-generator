const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "aăâbcdefghiîjklmnopqrsștțuvwxyz",
    uppercase: "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ",
    numbers: "0123456789",
    symbols: "`~\`í!@#ñ$%^&*()ô_üō-ū+ïѬò=□|ÿûʫ:;ʩ^{}[],.'£€¢©¼½¾",
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += `${staticPassword}`;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;

}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 49 ? "weak" : lengthSlider.value <= 99 ? "medium" : "strong";
};

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "blue";
    setTimeout(() => {
        copyIcon.innerText = "content_copy";
        copyIcon.style.color = "blue";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);