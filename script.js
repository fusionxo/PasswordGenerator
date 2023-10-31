document.addEventListener('DOMContentLoaded', function () {
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');
  const includeSymbols = document.getElementById('includeSymbols');
  const includeNumbers = document.getElementById('includeNumbers');
  const includeLowercase = document.getElementById('includeLowercase');
  const includeUppercase = document.getElementById('includeUppercase');
  const excludeSimilar = document.getElementById('excludeSimilar');
  const excludeAmbiguous = document.getElementById('excludeAmbiguous');
  const generateButton = document.getElementById('generate');
  const copyButton = document.getElementById('copy');
  const generatedPassword = document.getElementById('generatedPassword');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  lengthSlider.addEventListener('input', function () {
    lengthValue.textContent = lengthSlider.value;
  });

  darkModeToggle.addEventListener('change', function () {
    if (darkModeToggle.checked) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  });

  generateButton.addEventListener('click', function () {
    const options = {
      length: parseInt(lengthSlider.value),
      symbols: includeSymbols.checked,
      numbers: includeNumbers.checked,
      lowercase: includeLowercase.checked,
      uppercase: includeUppercase.checked,
      similar: !excludeSimilar.checked,
      ambiguous: !excludeAmbiguous.checked,
    };

    if (!options.symbols && !options.numbers && !options.lowercase && !options.uppercase) {
      alert('Please select at least one checkbox to generate a password.');
      return;
    }

    const password = generatePassword(options);
    generatedPassword.value = password;
  });

  copyButton.addEventListener('click', function () {
    if (generatedPassword.value) {
      generatedPassword.select();
      document.execCommand('copy');
    }
  });

  function generatePassword(options) {
    // Define character sets
    const symbolSet = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    const numberSet = '0123456789';
    const lowercaseSet = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const similarSet = 'iIlLoO01';
    const ambiguousSet = '{}[]()/\'"`~,;:.<>';

    let validChars = '';
    if (options.symbols) validChars += symbolSet;
    if (options.numbers) validChars += numberSet;
    if (options.lowercase) validChars += lowercaseSet;
    if (options.uppercase) validChars += uppercaseSet;

    if (options.similar) {
      for (const char of similarSet) {
        validChars = validChars.replace(char, '');
      }
    }

    if (options.ambiguous) {
      for (const char of ambiguousSet) {
        validChars = validChars.replace(char, '');
      }
    }

    let password = '';
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }

    return password;
  }
});
