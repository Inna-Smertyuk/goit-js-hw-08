import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('.feedback-form input');
const textareaRef = document.querySelector('.feedback-form textarea');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onInput, 500));

let formData = {
    email: '',
    message: '',
};

function onInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();

    console.log(formData);

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    formData = {
        email: '',
        message: '',
    }
};

function saveFormData() {
    const savedInfo = localStorage.getItem(STORAGE_KEY);
    if (savedInfo) {
        const pasrsedSavedInfo = JSON.parse(savedInfo);

        formData = pasrsedSavedInfo;

        inputRef.value = pasrsedSavedInfo.email;
        textareaRef.value = pasrsedSavedInfo.message;
    }
};
saveFormData();