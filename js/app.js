// 1. Shaqada Login-ka (index.html)
// 1. Shaqada Login-ka & Signup-ka
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

// --- SIGNUP LOGIC ---
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const pass = document.getElementById('regPass').value;

        localStorage.setItem('savedUser', name);
        localStorage.setItem('savedPass', pass);

        alert("Hambalyo! Akoon waa la abuuray. Hadda gal (Login).");
        window.location.href = 'index.html';
    });
}

// --- LOGIN LOGIC (HALKAN AYAA CILADU JIRTAA) ---
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Soo qaad xogta uu hadda qofku geliyey Form-ka
        const nameInput = document.getElementById('loginName').value.trim();
        const passInput = document.getElementById('loginPass').value.trim();

        // 2. Soo qaad xogta hore ugu kaydsanayd computer-ka (Signup-kii)
        const storedUser = localStorage.getItem('savedUser');
        const storedPass = localStorage.getItem('savedPass');

        // 3. Isbarbardhig
        if (nameInput === storedUser && passInput === storedPass) {
            localStorage.setItem('studentName', nameInput); // Dashboard-ka inuu magaca tuso
            window.location.href = 'dashboard.html';
        } else {
            alert("Cillad: Magaca ama Password-ka waa khalad!");
            console.log("Input:", nameInput, passInput);
            console.log("Stored:", storedUser, storedPass);
        }
    });
}
// 2. Shaqada Dashboard-ka & Soo bandhigista Magaca
// Waxaan isticmaalaynaa "DOMContentLoaded" si uu koodhku u shaqeeyo isla marka boggu load-gareeyo
document.addEventListener('DOMContentLoaded', function () {
    const nameDisplay = document.getElementById('userNameDisplay');
    if (nameDisplay) {
        const savedName = localStorage.getItem('studentName');
        nameDisplay.innerText = savedName ? savedName : "Arday";
    }
});

// 3. Maareynta Qaybaha Dashboard-ka (Navigation)
function showCategory(type) {
    if (type === 'pdfs') {
        window.location.href = 'books.html';
    } else if (type === 'q-a') {
        alert("Qaybta Su'aalaha iyo Jawaabaha (Dhawaan!)");
    } else if (type === 'exams') {
        alert("Qaybta Imtixaanka Dowladda (Dhawaan!)");
    } else {
        alert("Qaybtan dhawaan ayaan soo kordhinaynaa!");
    }
}

// 4. Furista Buugaagta (view-pdf.html)
function openBook(fileName, displayName) {
    // encodeURIComponent waxay ka hortagtaa error-yada haddii magaca buugu leeyahay boos (space)
    const file = encodeURIComponent(fileName);
    const name = encodeURIComponent(displayName);

    // U dir bogga view-pdf.html
    window.location.href = `view-pdf.html?file=${file}&name=${name}`;
}