let proceed_function = false;
let vowels = 'aeiou';
let encryptedVowels = ['ai','enter','imes','ober','ufat']

function check_inputBox () {
    //Check if there is text in the input box
    let userText = document.getElementById("input_box").value;

    if (userText == '') {
        show_text_display_none()
        return false;
    } else {
        return true;
    }
}


function get_userText () {
    // Save text on input box into a variable 
    let userText = document.getElementById("input_box").value;
    // Return the text
    return userText;
}


function clear_inputBox () {
    // Clear the input box 
    let inputBox = document.getElementById("input_box");
    inputBox.value = '';
}

function show_text_display_none() {
    // Set the diplay_text_none display to 'block'
    // Set the diplay_text_encrypted_decrypted display to 'none'
    // Set copy_button to 'none'

    let displayBox_none = document.getElementById('text_display_none');
    let displayBox_encrypted_decrypted = document.getElementById('text_display_encrypted_decrypted');
    let copy_button = document.getElementById('copy_button');
    
    displayBox_none.style.display = 'block';
    displayBox_encrypted_decrypted.style.display = 'none';
    copy_button.style.display = 'none';
}


function show_text_display_encrypted_decrypted() {
    // Set the diplay_text_encrypted_decrypted display to 'block'
    // Set copy_button to 'block'
    // Set the diplay_text_none display to 'none'

    let displayBox_none = document.getElementById('text_display_none');
    let displayBox_encrypted_decrypted = document.getElementById('text_display_encrypted_decrypted');
    let copy_button = document.getElementById('copy_button');

    displayBox_encrypted_decrypted.style.display = 'block';
    copy_button.style.display = 'block';
    displayBox_none.style.display = 'none';
}


function encrypt_text (userText) { 
    //Extract all vowels only in lower case
    let textVowels = [];
    for (let i = 0; i < userText.length; i++) {
        let letter = userText[i];
        if (vowels.includes(letter)) {
            textVowels.push(letter);
        }
    }
    
    //Get indexes for the vowels and save them in a list (function saved in 'HTML,CSS' folder in Brave)
    let vowelIndexes = [];
    for (let i = 0; i < userText.length; i++) {
        if (vowels.indexOf(userText[i]) > -1) {
            vowelIndexes.push(i);
        }
    }
    
    //Transform vowels according to the encryption key 
    /*
    La letra "a" es convertida para "ai"
    La letra "e" es convertida para "enter"
    La letra "i" es convertida para "imes"
    La letra "o" es convertida para "ober"
    La letra "u" es convertida para "ufat"
    */

    let encryptedVowels = [];
    for (let i = 0; i < textVowels.length; i++) {
        let vowel = textVowels[i];

        if (vowel === 'a') {
            vowel = 'ai';
            encryptedVowels.push(vowel);
        } else if (vowel === 'e') {
            vowel = 'enter';
            encryptedVowels.push(vowel);
        } else if (vowel === 'i') {
            vowel = 'imes';
            encryptedVowels.push(vowel);
        } else if (vowel === 'o') {
            vowel = 'ober';
            encryptedVowels.push(vowel);
        } else if (vowel === 'u') {
            vowel = 'ufat';
            encryptedVowels.push(vowel);
        }
    }

    //Put encrypted vowels back in place according to the indexes saved in the previous list

    let encrypted_userText = '';
    for (let i = 0; i < userText.length; i++) {
        // If the current index is a vowel, replace it with the encrypted vowel
        if (vowelIndexes.includes(i)) {
            encrypted_userText += encryptedVowels[vowelIndexes.indexOf(i)];
        } else {
            encrypted_userText += userText[i];
        }
    }
    
    return encrypted_userText;
}

function encrypt_text_main () {
    //Check if input box is not empty
    proceed_function = check_inputBox();

    //If box is not empty proceed, if not, show display_none
    if (proceed_function === true) {
        // Get text from input box and clear the box
        let userText = get_userText();
        clear_inputBox();

        // Encrypt text with the text from the box
        let encryptedText = encrypt_text(userText);

        // Show display_text_encrypted for the encrypted text
        let element = document.getElementById('encrypted_decrypted_text');
        element.innerHTML = encryptedText;
        show_text_display_encrypted_decrypted();

        // Display on textbox
    } else {
        show_text_display_none();
    }
}



function decrypt_key(encryptedVowels_index) {
    if (encryptedVowels_index === 0) {
        return 'a';
    } else if (encryptedVowels_index === 1) {
        return 'e';
    } else if (encryptedVowels_index === 2) {
        return 'i';
    } else if (encryptedVowels_index === 3) {
        return 'o';
    } else if (encryptedVowels_index === 4) {
        return 'u';
    }
}

function decrypt_text(userText) {

    let decryptVowelIndex = [];
    let foundIndexes = [];
    let decrypted_key = String;
    let result = Boolean;
    
    // Go through every index of encrypted vowels list
    for (let i = 0; i < encryptedVowels.length; i++) {
        // Check if there are encrypted vowels
        result = userText.includes(encryptedVowels[i]);
        // Get the replacement for the encryption vowel according to the key index
        decrypted_key = decrypt_key(i);
        
        // If there are encryptes vowels, keep doing this process for the same 
        // index until there are no more encrypted vowels of this index
        while (result != false) {
            // Check once more for encrypted vowels
            result = userText.includes(encryptedVowels[i]);

            if (result === true) {
                // Find the first index of encrypted vowel
                let firstIndex = userText.search(encryptedVowels[i]);
                foundIndexes.push(firstIndex);
                
                // Save the first index of where it started on unique list for this
                decryptVowelIndex.push(firstIndex);

                // Find the last index of the encrypted vowel
                let lastIndex = firstIndex + encryptedVowels[i].length-1;
                foundIndexes.push(lastIndex);

                // Delete the encrypted vowel and leave only the last letter of the encryption
                userText = userText.substr(0, firstIndex) + userText.substr(lastIndex);

                // Replace the remaining letter of encryption with the correct vowel
                userText = userText.substr(0, firstIndex) + decrypted_key + userText.substr(firstIndex + 'a'.length);
            }
        }
        // Set result false as a double fail safe to avoid starting another loop 
        result = false;
    }
    return userText;
}

function decrypt_text_main () {
    //Check if input box is not empty
    proceed_function = check_inputBox();

    //If box is not empty proceed, if not, show display_none
    if (proceed_function === true) {
        // Get text from input box and clear the box
        let userText = get_userText();
        clear_inputBox();

        // Decrypt text with the text from the box
        let decryptedText = decrypt_text(userText);
        
        // Show display_text_encrypted for the decrypted text
        let element = document.getElementById('encrypted_decrypted_text');
        element.innerHTML = decryptedText;
        show_text_display_encrypted_decrypted();

        // Display on textbox
    } else {
        show_text_display_none();
    }
}

function copyToClipboard() {
    let element = document.getElementById('encrypted_decrypted_text');
    let text = element.innerHTML;
    navigator.clipboard.writeText(text);
}










