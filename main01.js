

const url = "https://api.simkl.com/"
const apiKey = "4045eb25970790c702f00b9d9057f51bd1506852e45b47e8b7eefd5f3e4adb1f"
const queryString = `?client_id=${apiKey}`;
const endpoint = url + queryString
console.log(endpoint)
function waitForJSON(res) {
    return res.json()
}

function handleData(data) {
    debugger
}

// fetch(endpoint).then(waitForJSON).then(handleData)