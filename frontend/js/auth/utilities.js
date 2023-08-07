const token = localStorage.getItem("token")

export async function useFetchPost(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json",token },
        body: JSON.stringify(data)
    })
    const res = await response.json()
    // console.log(res);
    return [res, response.status]

}


export async function useFetchGet(url) {
    const response = await fetch(url, { headers: { "Content-Type": "application/json", token } })
    return await response.json()

}

export async function checkUser(url, token) {
    const res = await fetch(url, {
        method: "post",
        headers: { token }
    })
    return [await res.json(), res.status]

}


export function getCurrentUser() {
    try {
        return JSON.parse(sessionStorage.getItem("currentUser"))

    } catch (error) {
        
        return null
    }

}

export const url = "http://localhost:3000/"