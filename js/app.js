// --- 1. SIGNUP LOGIC (Halkan waxaan ku kordhinnay xogtii cusubayd) ---
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Soo qaadashada dhamaaan xogta cusub
        const name = document.getElementById('regName').value;
        const pass = document.getElementById('regPass').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const gender = document.getElementById('regGender').value;
        const user = document.getElementById('regUser').value; // Username-ka

        // Sawirka profile-ka (haddii uu jiro)
        const profileImg = document.getElementById('preview').src;

        // Kaydinta xogta (LocalStorage)
        localStorage.setItem('savedUser', user); // Waxaan u isticmaalaynaa Username-ka Login
        localStorage.setItem('savedPass', pass);
        localStorage.setItem('studentName', name); // Magaca rasmiga ah
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPhone', phone);
        localStorage.setItem('userGender', gender);
        localStorage.setItem('userProfile', profileImg);

        // SweetAlert halkii alert-ga caadiga ah laga isticmaali lahaa
        Swal.fire({
            title: 'Hambalyo!',
            text: 'Akoon waa la abuuray. Hadda gal (Login).',
            icon: 'success',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'index.html';
            }
        });
    });
}

// --- 2. LOGIN LOGIC (Isbarbardhigga Username-ka iyo Password-ka) ---
// --- LOGIN LOGIC ---
// const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Soo qaad xogta uu hadda qofku geliyey (Username iyo Password)
        const userInput = document.getElementById('loginName').value.trim();
        const passInput = document.getElementById('loginPass').value.trim();

        // 2. Soo qaad xogta ku keydsan LocalStorage (Signup-kii)
        const storedUser = localStorage.getItem('savedUser'); // Kani waa Username-ka
        const storedPass = localStorage.getItem('savedPass');

        // Debugging: Console-ka ku arag xogta (waa iska tirtiri kartaa hadhow)
        console.log("Input:", userInput, passInput);
        console.log("Stored:", storedUser, storedPass);

        // 3. Isbarbardhig
        if (userInput === storedUser && passInput === storedPass) {
            // Haddii ay is helaan, magaca rasmiga ah u keydi Dashboard-ka
            const officialName = localStorage.getItem('studentName');
            localStorage.setItem('studentName', officialName);

            Swal.fire({
                title: 'Waad ku guuleysatay!',
                text: 'Hadda waxaad u gudbi doontaa Dashboard-ka.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'dashboard.html';
            });
        } else {
            // Haddii ay khaldan yihiin
            Swal.fire({
                title: 'Cillad!',
                text: 'Username-ka ama Password-ka waa khalad. Fadlan hubi xogtaada.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    });
}

// --- 3. DASHBOARD: Soo bandhigista Magaca & Sawirka ---
document.addEventListener('DOMContentLoaded', function () {
    const nameDisplay = document.getElementById('userNameDisplay');
    const profileDisplay = document.getElementById('userProfileImage'); // Haddii aad haysato ID sawirka ah

    if (nameDisplay) {
        const savedName = localStorage.getItem('studentName');
        nameDisplay.innerText = savedName ? savedName : "Arday";
    }

    // Haddii Dashboard-ka aad ku dartid sawirka profile-ka
    if (profileDisplay) {
        const savedImg = localStorage.getItem('userProfile');
        if (savedImg) { profileDisplay.src = savedImg; }
    }
});

// --- 4. NAVIGATION (PDFs, Exams, Q&A) ---
function showCategory(type) {
    if (type === 'pdfs') {
        window.location.href = 'books.html';
    } else if (type === 'q-a') {
        window.location.href = 'q-a.html';
    } else if (type === 'exams') {
        Swal.fire('Imtixaanka Dowladda', "Qaybtan waa la diyaarinayaa.", 'warning');
    } else {
        Swal.fire('Ogeysiis', "Qaybtan dhawaan ayaan soo kordhinaynaa!", 'info');
    }
}

// --- 5. PDF VIEWER ---
function openBook(fileName, displayName) {
    const file = encodeURIComponent(fileName);
    const name = encodeURIComponent(displayName);
    window.location.href = `view-pdf.html?file=${file}&name=${name}`;
}