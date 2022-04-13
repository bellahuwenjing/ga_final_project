

function newRequest() {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.simkl.com/", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("simkl-api-key", "4045eb25970790c702f00b9d9057f51bd1506852e45b47e8b7eefd5f3e4adb1f");

    xhr.send();
}
