const API = import.meta.env.VITE_API_URL;

export async function signup(user) {

    const response = await fetch(`${API}/signup`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(user)

    });

    return await response.json();

}

export async function login(user) {

    const response = await fetch(`${API}/login`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(user)

    });

    return await response.json();

}