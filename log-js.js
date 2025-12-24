const toggleLink = document.getElementById('toggleLink');
        const loginHeader = document.getElementById('loginHeader');
        const signupHeader = document.getElementById('signupHeader');
        const usernameField = document.getElementById('usernameField');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnSpinner = document.getElementById('btnSpinner');
        const switchText = document.getElementById('switchText');
        const togglePass = document.getElementById('togglePass');
        const passInput = document.getElementById('passInput');
        const validationBox = document.getElementById('validationBox');
        
        const ruleLength = document.getElementById('rule-length');
        const ruleUpper = document.getElementById('rule-upper');
        const ruleSpecial = document.getElementById('rule-special');

        let isLogin = true;

        toggleLink.onclick = () => {
            isLogin = !isLogin;
            validationBox.style.display = 'none';
            
            if (isLogin) {
                loginHeader.classList.remove('hidden');
                signupHeader.classList.add('hidden');
                usernameField.classList.add('hidden');
                btnText.innerText = "ورود به حساب";
                switchText.innerText = "هنوز عضو نشده‌اید؟";
                toggleLink.innerText = "ایجاد حساب رایگان";
            } else {
                loginHeader.classList.add('hidden');
                signupHeader.classList.remove('hidden');
                usernameField.classList.remove('hidden');
                btnText.innerText = "ثبت‌نام در سیستم";
                switchText.innerText = "قبلاً ثبت‌نام کرده‌اید؟";
                toggleLink.innerText = "وارد شوید";
            }
        };

        togglePass.onclick = () => {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);
            togglePass.classList.toggle('fa-eye');
            togglePass.classList.toggle('fa-eye-slash');
        };

        passInput.oninput = () => {
            if (isLogin) return;
            const val = passInput.value;
            validationBox.style.display = val.length > 0 ? 'block' : 'none';
            updateRule(ruleLength, val.length >= 8);
            updateRule(ruleUpper, /[a-z]/.test(val) && /[A-Z]/.test(val));
            updateRule(ruleSpecial, /[!@#$%^&*(),.?":{}|<>]/.test(val));
        };

        function updateRule(element, isValid) {
            if (isValid) {
                element.classList.add('checked');
                element.querySelector('i').className = 'fa fa-check-circle';
            } else {
                element.classList.remove('checked');
                element.querySelector('i').className = 'fa fa-circle';
            }
        }

        document.getElementById('authForm').onsubmit = (e) => {
            e.preventDefault();
            
            if (!isLogin) {
                const val = passInput.value;
                const isValid = val.length >= 8 && /[a-z]/.test(val) && /[A-Z]/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val);
                if (!isValid) {
                    alert("لطفاً تمامی شرایط رمز عبور را رعایت کنید.");
                    return;
                }
            }

            submitBtn.disabled = true;
            btnSpinner.style.display = 'block';
            btnText.innerText = isLogin ? "در حال تایید..." : "در حال ایجاد حساب...";

            setTimeout(() => {
                window.location.href = "todo-list.html"; 
            }, 2000);
        };